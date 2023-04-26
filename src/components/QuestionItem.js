import React from "react";

function QuestionItem({ question, deleteRequest, updateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index} onChange={() => updateAnswer(id,correctIndex)}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={() => deleteRequest(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;