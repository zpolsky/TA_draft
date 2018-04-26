// Checks the username and password and if successful, returns a user object
//  containing the username, uid, an isActive boolean, a boolean indicating
//  whether or not they completed the survey, and role (TA, professor, or admin)
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
