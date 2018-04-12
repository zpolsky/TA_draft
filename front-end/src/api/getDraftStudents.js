export default function(username) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/getDraftStudents/${username}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
