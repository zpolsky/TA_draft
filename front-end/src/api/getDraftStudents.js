// Returns an array of students that completed the draft and have signed up
//  to TA courses associated with the supplied username (ex: a professor supplies
//  their username and will receive an array of students that offered to TA any
//  of their courses)
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
