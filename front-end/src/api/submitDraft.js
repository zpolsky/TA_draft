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

// Inserts a professor's TA selections into the database to map those students
//  to the appropriate courses
export default function(answers, username) {
  return postData(`http://localhost:8080/submitDraft/${username}`, answers);
}
