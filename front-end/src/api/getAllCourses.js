export default function() {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/getAllCourses/`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      })
  });
}
