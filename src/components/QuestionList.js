import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions ] = useState([]);
  let url = "http://localhost:4000/questions"

  useEffect(()=> {
    fetch(url)
    .then(res => res.json())
    .then(data => setQuestions(data))
    .catch(err => console.log(err))
  },[url])

  function deleteQuestion(id){
    let deleteUrl = `http://localhost:4000/questions/${id}`

    fetch(deleteUrl,{
      method  : "DELETE",
      headers : {
        'Content-Type' : "application/json"
      }
    })
    .then(res => res.json())
    .then(() => {
      const newQuestions = questions.filter((question) => question.id !== id)
      setQuestions(...questions,newQuestions);
    })
   .catch(err => console.log(err));
  }

  function updateAnswer(id,correctIndex){
    let indexedUrl = `http://localhost:4000/questions/${id}`

    fetch(indexedUrl,{
      method : "PATCH",
      headers : { "Content-Type": "application/json" },
      body : JSON.stringify( { "correctIndex" : correctIndex })
    })
   .then(res => res.json()
   .then(data => {
    const newQuestions = questions.map((question) => {
      if(question.id === data.id){
        return data;
      }
      return question
    })
    
    setQuestions(newQuestions);
   }))
   .catch(err => console.log(err))
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
          return (
            <QuestionItem
               question={question} 
               key={question.id} 
               deleteRequest={deleteQuestion}
               updateAnswer={updateAnswer}
               />
          )
        })}
        </ul>
    </section>
  );
}

export default QuestionList;