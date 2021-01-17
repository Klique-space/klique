const joinForm = document.getElementById("join-kliqspace-form");
const displayName = document.getElementById("join-kliqspace-display").value;
const joinSpaceID = document.getElementById("join-kliqspace-id").value;

const joinDoneMessage = document.getElementById("form-join-done");
const joinErrorMessage = document.getElementById("form-join-error");

joinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // import the database
  const db = firebase.firestore();
  const user = firebase.auth().currentUser.uid;

  db.collection("kliqspaces")
    .where("spaceID", "==", joinSpaceID)
    .get()
    .then(function (querySnapshot) {
      console.log(joinDoneMessage);
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        // add user to kliqspace
        doc.update({
          users: firebase.firestore.FieldValue.arrayUnion(user),
        });

        // add kliqspace to user
        user
          .updateProfile({
            displayName,
            kliqspaces: firebase.firestore.FieldValue.arrayUnion(doc.id),
          })
          .then(function () {
            displayMessage(joinDoneMessage);
            console.log(joinDoneMessage);
          })
          .catch(function (error) {
            // An error happened.
          });
      });
    })
    .catch(function (error) {
      displayMessage(joinErrorMessage);
      console.log(joinErrorMessage);
    });
});
