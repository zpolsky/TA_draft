// Returns an array of courses with each each
//  Note: if a course has multiple sections, it will appear in the array
//  multiple times with differing sections
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
