import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { ProgressBar,RotatingLines } from "react-loader-spinner";
import MyAlert from "../components/alert";

function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteing, setDeleteing] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const [deletedError, setDeletedError] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    setSearching(true)
    if (searchQuery) {
      const res = await fetch(`/api/getScore?score=${searchQuery}`);
      const data = await res.json();
      setData(data.scoreCard);
      setSearching(false)
      console.log(data);
      setShowAlert(data.scoreCard.length === 0);
    } else {
      setSearching(false)
      setShowAlert(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch("/api/getScore");
      const json = await res.json();
      setData(json.scoreCard);
      console.log(json);
      if (res) {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      setDeleteing(true);
      const res = await fetch(`/api/deleteScore/${id}`);
      if (res.ok) {
        setRefresh(refresh + 1);
        setDeleted(true);
        setDeleteing(false);
        console.log(res.ok);
      } else {
        setRefresh(refresh + 1);
        setDeleteing(false);
        setDeletedError(true);
      }
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      setRefresh(refresh + 1);
      setDeleteing(false);
      setDeletedError(true);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      {searching && (
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
      <h1>scoreCard</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by score"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {showAlert && (
        <div className="alert">No results found for "{searchQuery}"</div>
      )}
      <div className="search-results">
        <h2>Search Results:</h2>
      </div>
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
            <th>Score</th>
            <th>Date & Time</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const date = new Date(item.createdAt);
            return (
              <tr key={item._id}>
                <td>{item.score}</td>
                <td>
                  {date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}{" "}
                  & <b>{date.toLocaleTimeString()}</b>
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
          wrapperStyle={{ marginLeft: "50%" }}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      )}
    </>
  );
}

export default Users;
