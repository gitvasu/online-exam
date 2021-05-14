import { AnswerStatus } from "../constantValues";

const json = require("./questionBank.json");

//--------------------------------------------------------------------------------
/* getAllQuestions function's purpose is to "Filter()" from the json object i.e.,
   "questions"(imported from ./questionBank.json file using require() func.) in 
   order to "find()" the questions whose "level" is 1 in the questions object.*/ 
export function getAllQuestions(level) {
  if (!level) 
  return json["questions"];

  var ques = json["questions"].filter((ques) =>
    ques.level.find((l) => l === parseInt(level))
  );

  return ques;
}

//---------------------------------------------------------------------------------
//Function to check whether the question has been answered or not
function isQuestionAnswered(ques) {
  let ansCount = 0;

  ques.choices.forEach((choice) => {
    if (choice.selected) 
    ansCount++;
  });

  return ansCount;
}

//--------------------------------------------------------------------------------
//Counter to know that the ques has been Attempted by checking the above func.
export function getAttemptCount(quesList) {
  let quesAttempt = 0;
  quesList.forEach(
    (q) => {
    if (isQuestionAnswered(q)) 
    quesAttempt++;
           });

  return quesAttempt;
}





//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
/*Function for finally getting and storing the answer choices in the array yourAns,
 answered by the user and by matching them with the realAns array with the actual real answers*/
export function getAnsweredChoices(answeredQues) {
  let realAns = [];
  let yourAns = [];
  let isAnswered = false; //by default the value "false"
  let correctAnsCount = 0; //by default value is 0, as after matching will be 1
  const answers = answeredQues.answer;
  answeredQues.choices.forEach((choice, index) => {
    if (answers.includes(index)) 
      {
        realAns.push(choice.value);
          if (choice.selected) 
            correctAnsCount++;
      }

    if (choice.selected) 
      {
        yourAns.push(choice.value);
        isAnswered = true;
      }
  });

  let status = AnswerStatus.INCORRECT;

  if (correctAnsCount === answers.length) {
    status = AnswerStatus.CORRRECT;
  } else if (correctAnsCount > 0 && correctAnsCount < answers.length) {
    status = AnswerStatus.PARTIALLY_CORRECT;
  } else {
    status = AnswerStatus.INCORRECT;
  }

  let score = correctAnsCount / answers.length;

  return {
    realAns,
    yourAns,
    isAnswered,
    status,
    score,
  };
}
