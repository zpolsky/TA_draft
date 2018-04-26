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
