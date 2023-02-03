import Head from "next/head";
import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-loader-spinner";

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("1");
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

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleCorrectAnswerChange = (event, index) => {
    const newAnswers = [...answers];
    newAnswers.forEach((ans, i) => {
      ans.correct = i === index;
    });
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = { id, question, answers };
    let res = await fetch(
      "https://server-ue6g-nbwu9zm3t-jitendra895.vercel.app/api/addQuestions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      }
    );
    let response = await res.json();
    console.log(response);
  };
  const handleDelete = async (id) => {
    try {
      // setDeleteLoading(true);
      const res = await fetch(
        `/api/deleteQuestion/${id}`
      );
      console.log(res);
      // console.log(res.data);
      // if (res) {
      //   setDeleteLoading(false);
      //   setDeleteAlert(true);
      // } else {
      //   setDeleteLoading(false);
      //   setDeleteError(true);
      // }
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      // setDeleteError(true);
      // setDeleteLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://server-ue6g-nbwu9zm3t-jitendra895.vercel.app/api/getQuestions?page=${page}`
      );
      const json = await res.json();
      setData(json.question);
      setTotalPages(json.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [page]);

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
      <form onSubmit={handleSubmit}>
        <div className="questionContainer">
          <label>
            Id:
            <select value={id} onChange={handleIdChange} className="id">
              {[...Array(15)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
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
                    <button className="delete-button"  onClick={() => handleDelete(item._id)}>Delete</button>
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
