import { useState, useEffect } from "react";

const TransferData = () => {
  const [data, setData] = useState(null);
  const [transfer, setTransfer] = useState([]);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([
    { id: "", text: "", correct: "" },
    { id: "", text: "", correct: "" },
    { id: "", text: "", correct: "" },
    { id: "", text: "", correct: "" },
  ]);

  useEffect(() => {
    const fetchQuestions = async () => {
      // const response = await fetch("/api/getQuestions");
      // const data = await response.json();
      // console.log(data.fullQuestions);
      const response1 = await fetch("/api/getQuestions");
      const data1 = await response1.json();
      console.log(data1);
      const selectedData = data1.fullQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, 1);
      const questionsToSend = selectedData.map(({ question, answers }) => ({
        question,
        answers: answers.map(({ id, text, correct }) => ({
          id,
          text,
          correct,
        })),
      }));
      console.log(questionsToSend);
      setTransfer(questionsToSend);
    };

    fetchQuestions();
  }, []);

  const handleClick = async () => {
    try {
      // const response1 = await fetch("/api/getQuestions");
      // const data1 = await response1.json();
      // console.log(data1);
      // const selectedData = data1.fullQuestions
      //   .sort(() => 0.5 - Math.random())
      //   .slice(0, 1);
      // const questionsToSend = selectedData.map(({ question, answers }) => ({
      //   question,
      //   answers: answers.map(({ id, text, correct }) => ({
      //     id,
      //     text,
      //     correct,
      //   })),
      // }));
      // console.log(questionsToSend);

      const response2 = await fetch("/api/addBackupQuestions", {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Get response from second API
      const data2 = await response2.json();

      // Set transferred data in state
      setData(data2);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        {/* <button onClick={handleClick}>Transfer Data</button> */}
        {data && (
          <div>
            <h2>Transferred Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
      <form onSubmit={handleClick}>
        {transfer.map((item, i) => {
          return <input type="text" value={item.question} readOnly></input>;
        })}
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default TransferData;
