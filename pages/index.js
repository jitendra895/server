import Head from "next/head";
import React, { useState, useEffect } from "react";
import { ProgressBar, RotatingLines } from "react-loader-spinner";
import MyAlert from "../components/alert";
import Navbar from "../components/navbar"

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteing, setDeleteing] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [refresh, setRefresh] = useState(1);
  // const [id, setId] = useState("1");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([
    { id: "1", text: "", correct: false },
    { id: "2", text: "", correct: false },
    { id: "3", text: "", correct: false },
    { id: "4", text: "", correct: false },
  ]);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event, index) => {
    const newAnswers = [...answers];
    newAnswers[index].text = event.target.value;
    setAnswers(newAnswers);
  };

  // const handleIdChange = (event) => {
  //   setId(event.target.value);
  // };

  const handleCorrectAnswerChange = (event, index) => {
    const newAnswers = [...answers];
    newAnswers.forEach((ans, i) => {
      ans.correct = i === index;
    });
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    setUploading(true);
    e.preventDefault();
    const selectedAnswer = answers.find((answer) => answer.correct === true);
    const answerText = answers.find((answer) => answer.text !== "");
    if ( !question || !answers || !selectedAnswer || !answerText) {
      alert("Please fill all fields");
      setUploading(false);
      return;
    }
    const result = { question, answers };
    let res = await fetch(
      "https://kbw.vercel.app/api/addQuestions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      }
    );
    let response = await res.json();
    if (response.success) {
      setRefresh(refresh + 1)
      setSuccess(true);
      setUploading(false);
      // setId("1");
      setQuestion("");
      setAnswers([
        { id: "1", text: "", correct: false },
        { id: "2", text: "", correct: false },
        { id: "3", text: "", correct: false },
        { id: "4", text: "", correct: false },
      ]);
    } else {
      setError(true);
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleteing(true);
      const res = await fetch(`/api/deleteQuestion/${id}`);
      if (res.ok) {
        setRefresh(refresh + 1)
        setDeleteSuccess(true);
        setDeleteing(false);
        console.log(res.ok);
      } else {
        setRefresh(refresh + 1)
        setDeleteing(false);
        setDeleteError(true);
      }
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      setRefresh(refresh + 1)
      setDeleteing(false);
      setDeleteError(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://kbw.vercel.app/api/getQuestions?page=${page}`
      );
      const json = await res.json();
      setData(json.question);
      setTotalPages(json.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [page,refresh]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <Head>
        <title>KBC backend</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <h1>Questions</h1>
      <MyAlert
        success={success}
        setSuccess={setSuccess}
        error={error}
        setError={setError}
      />
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
      <form onSubmit={handleSubmit}>
        <div className="questionContainer">
          {/* <label>
            Id:
            <select value={id} onChange={handleIdChange} className="id">
              {[...Array(15)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label> */}
          <label>
            Question:
            <input
              className="question"
              type="text"
              value={question}
              onChange={handleQuestionChange}
            />
          </label>
        </div>
        <br />
        {answers.map((answer, index) => (
          <div key={answer.id} className="answerContainer">
            <label>
              Answer {index + 1}:
              <input
                className="answer"
                type="text"
                value={answer.text}
                onChange={(event) => handleAnswerChange(event, index)}
              />
            </label>
            <input
              type="radio"
              checked={answer.correct}
              onChange={(event) => handleCorrectAnswerChange(event, index)}
            />
            Correct Answer
          </div>
        ))}
        <br />
        <button className="button" type="submit">
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
        deleteSuccess={deleteSuccess}
        setDeleteSuccess={setDeleteSuccess}
        deleteError={deleteError}
        setDeleteError={setDeleteError}
      />
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const correctAnswer = item.answers.find(
                (ans) => ans.correct === true
              );
              return (
                <tr key={item._id}>
                  <td>{item.id}</td>
                  <td>{item.question}</td>
                  <td>{correctAnswer.text}</td>
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
      </div>
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
      <div className="pagination">
        <button
          className="paginationButton"
          onClick={handlePrevious}
          disabled={loading || page === 1}
        >
          Previous
        </button>
        <p>
          Page {page} of {totalPages}
        </p>
        <button
          className="paginationButton"
          onClick={handleNext}
          disabled={loading || page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
