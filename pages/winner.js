import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { ProgressBar, RotatingLines } from "react-loader-spinner";
import MyAlert from "../components/alert";

const Winner = () => {
  const [date, setDate] = useState("");
  const [userName, setUserName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteing, setDeleteing] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [deletedError,setDeletedError]= useState(false);
  const [refresh, setRefresh] = useState(1);


  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleSubmit = async (e) => {
    setUploading(true);
    e.preventDefault();
    const data = { date, userName };
    if (!date || !userName) {
      alert("Please fill all fields");
      setUploading(false);
      return;
    }
    let res = await fetch(
      "https://kbw.vercel.app/api/addWinner",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await res.json();
    if (response.success) {
      console.log(response);
      setRefresh(refresh + 1)
      setUploading(false);
      setUploaded(true)
    } else {
      setUploading(false);
      setUploadError(true)
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch(
        "https://kbw.vercel.app/api/getWinner"
      );
      const json = await res.json();
      setData(json.winner);
      console.log(json.winner);
      if (res) {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      setDeleteing(true);
      const res = await fetch(`/api/deleteWinner/${id}`);
      if (res.ok) {
        setRefresh(refresh + 1)
        setDeleted(true)
        setDeleteing(false);
        console.log(res.ok);
      } else {
        setRefresh(refresh + 1)
        setDeleteing(false);
        setDeletedError(true);
      }
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      setRefresh(refresh + 1)
      setDeleteing(false);
      setDeletedError(true);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      {uploading && (
        <div className="uploading">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
      <h1>winners</h1>
      <MyAlert
        uploaded={uploaded}
        setUploaded={setUploaded}
        uploadError={uploadError}
        setUploadError={setUploadError}
      />
      <form className="countdownTimeForm" onSubmit={handleSubmit}>
        <label htmlFor="date" className="timeLabel">
          Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleDateChange}
          className="timeInput"
        />
        <label className="timeLabel">userName:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={userName}
          onChange={handleUserNameChange}
          className="timeInput"
        />
        <button className="timeButton" type="submit">
          Submit
        </button>
      </form>
      {deleteing && (
        <div className="deleting">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
<MyAlert
        deleted={deleted}
        setDeleted={setDeleted}
        deletedError={deletedError}
        setDeletedError={setDeletedError}
      />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const date = new Date(item.date);
            return (
              <tr key={item._id}>
                <td>
                  {date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>{item.userName}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loading && (
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{ marginLeft: "40%" }}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      )}
    </>
  );
};

export default Winner;
