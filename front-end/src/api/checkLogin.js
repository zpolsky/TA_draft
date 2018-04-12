// // Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// function postData(url, info) {
//   alert('info = ', info);
//   return fetch(url, {
//     method: 'GET',
//     body: JSON.stringify(info),
//     headers: new Headers({
//       'Content-Type': 'application/json'
//     })
//   }).then(res => res.json())
//   .catch(error => console.error('Error: ', error))
//   .then(response => console.log('Success: ', response));
// }
//
// export default function(username, password) {
//   const info = { username, password };
//   return postData(`http://localhost:8080/checkLogin/`, info);
// }

export default function(username, password) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/checkLogin/u=${username}_p=${password}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      })
  });
}
