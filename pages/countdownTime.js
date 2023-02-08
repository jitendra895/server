import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { ProgressBar, RotatingLines } from "react-loader-spinner";
import MyAlert from "../components/alert";

const CountdownTime = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteing, setDeleteing] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [deletedError,setDeletedError]= useState(false);
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = async (e) => {
    setUploading(true);
    e.preventDefault();
    const dateTime = `${date}T${time}`;
    const timestamp = new Date(dateTime).getTime();
    if (!time || !date || !timestamp) {
      alert("Please fill all fields");
      setUploading(false);
      return;
    }
    let res = await fetch(
      "https://server-ue6g-nbwu9zm3t-jitendra895.vercel.app/api/addCountdownTime",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ time: timestamp }),
      }
    );
    let response = await res.json();
    if (response.success) {
      console.log(response);
      setUploading(false);
      setUploaded(true);
    } else {
      setUploading(false);
      setUploadError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch(
        "https://server-ue6g-nbwu9zm3t-jitendra895.vercel.app/api/getCountdownTime"
      );
      const json = await res.json();
      setData(json.time);
      console.log(json.time);
      if (res) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      setDeleteing(true);
      const res = await fetch(`/api/deleteTime/${id}`);
      if (res.ok) {
        setDeleted(true)
        setDeleteing(false);
        console.log(res.ok);
      } else {
        setDeleteing(false);
        setDeletedError(true);
      }
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
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
      <h1>CountdownTime</h1>
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

        <label htmlFor="time" className="timeLabel">
          Time:
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={time}
          onChange={handleTimeChange}
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
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const time = new Date(item.time);
            return (
              <tr key={item._id}>
                <td>{time.toLocaleDateString()}</td>
                <td>{time.toLocaleTimeString()}</td>
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

export default CountdownTime;
