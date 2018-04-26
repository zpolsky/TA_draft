// Returns an array containing which courses/sections the user with the supplied
//  uid offered to TA (used to get old answers to the survey so that the table
//  can be repopulated automatically when updating answers)
export default function(uid) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/getSurveyAnswers/${uid}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      })
  });
}
