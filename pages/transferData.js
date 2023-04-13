import Head from "next/head";
import React, { useState, useEffect } from "react";
import { ProgressBar, RotatingLines } from "react-loader-spinner";
import MyAlert from "../components/alert";
import Navbar from "../components/navbar";

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
  const [transferData, setTransferData] = useState([]);
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
    if (!question || !answers || !selectedAnswer || !answerText) {
      alert("Please fill all fields");
      setUploading(false);
      return;
    }
    const result = { question, answers };
    let res = await fetch("/api/addBackupQuestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });
    let response = await res.json();
    if (response.success) {
      setRefresh(refresh + 1);
      setSuccess(true);
      setUploading(false);
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
      const res = await fetch(`/api/deleteBackupQuestions/${id}`);
      if (res.ok) {
        setRefresh(refresh + 1);
        setDeleteSuccess(true);
        setDeleteing(false);
        console.log(res.ok);
      } else {
        setRefresh(refresh + 1);
        setDeleteing(false);
        setDeleteError(true);
      }
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      setRefresh(refresh + 1);
      setDeleteing(false);
      setDeleteError(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/getBackupQuestions?page=${page}`);
      const data = await res.json();
      setData(data.question);
      setTotalPages(data.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [page, refresh]);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/getBackupQuestions");
    const data = await res.json();
    const selectedData = data.fullQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, 15);
    const transformedData = selectedData.map(({ question, answers }) => ({
      question,
      answers: answers.map(({ id, text, correct }) => ({
        id,
        text,
        correct,
      })),
    }));
    console.log(transformedData);
    setLoading(false);
    setTransferData(transformedData);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    let res = await fetch("/api/addQuestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transferData),
    });
    let response = await res.json();
    console.log(response);
  };

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
      <Navbar />
      <h1>Backup-Questions</h1>
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
      
      <div className="transfer-data-container">
        <div className="transfer-button-container">
        <button onClick={() => fetchData()} className="get-button ">GetQuestions</button>
        <button onClick={handleTransfer} className="transfer-button">TransferQuestions</button>
        </div>
        {loading && (
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      )}
      <h2>Questions for transfer </h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {transferData.map((item, index) => {
              const correctAnswer = item.answers.find(
                (ans) => ans.correct === true
              );
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.question}</td>
                  <td>{correctAnswer.text}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
            {data.map((item, index) => {
              const correctAnswer = item.answers.find(
                (ans) => ans.correct === true
              );
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
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
