import { useState, useEffect } from "react";
import Navbar from "../components/navbar"; 
import { ProgressBar,RotatingLines} from "react-loader-spinner";

function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
setSearching(true)
    if (searchQuery) {
      const res = await fetch(`/api/login?name=${searchQuery}`);
      const data = await res.json();
      setData(data.users)
      setSearching(false)
      console.log(data);
      setShowAlert(data.users.length === 0);
    } else {
      setShowAlert(true);
      setSearching(false)
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch("/api/login");
      const json = await res.json();
      setData(json.users);
      console.log(json);
      if (res) {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery]);

  return (
    <>
    <Navbar/>
    <h1>users</h1>
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
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {showAlert && (
        <div className="alert">
          No users found for "{searchQuery}"
        </div>
      )}
        <div className="search-results">
          <h2>Search Results:</h2>
        </div>
       <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>UpiId</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  {item.name}
                </td>
                <td>{item.upi}</td>
                {/* <td>
                  <button
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td> */}
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
