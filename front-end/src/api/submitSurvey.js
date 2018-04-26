// Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
function postData(url, data) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
  .catch(error => console.error('Error: ', error))
  .then(response => console.log('Success: ', response));
}

// Inserts a student's survey answers into the draft table in the database so
//  they can be drafted later on by a professor or admin
export default function(answers, username) {
  return postData(`http://localhost:8080/submitSurvey/${username}`, answers);
}
