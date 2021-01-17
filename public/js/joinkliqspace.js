const joinForm = document.getElementById("join-kliqspace-form");
joinForm.addEventListener("submit", (e) => {
  const displayName = document.getElementById("join-kliqspace-display").value;
  const joinSpaceID = document.getElementById("join-kliqspace-id").value;

  const joinDoneMessage = document.getElementById("form-join-done");
  const joinErrorMessage = document.getElementById("form-join-error");
  e.preventDefault();

  // import the database
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  db.collection("kliqspaces")
    .where("spaceID", "==", joinSpaceID)
    .get()
    .then(function (querySnapshot) {
      console.log(querySnapshot);
      let nodoc = true;
      let documentID;
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        nodoc = false;
        documentID = doc.id;
        console.log(doc.id, " => ", doc.data());
      });
      if (!nodoc) {
        console.log(user.uid);
        // add user to kliqspace
        db.collection("kliqspaces")
          .doc(documentID)
          .update({
            users: firebase.firestore.FieldValue.arrayUnion(user.uid),
          });

        // add kliqspace to user
        db.collection("users")
          .add({
            userid: user.uid,
            kliqspaces: [],
            kliqers: [],
            kliqing: [],
            mutuals: [],
          })
          .then(function (docRef) {})
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
        user
          .updateProfile({
            displayName: displayName ? displayName : "Undefined",
            // kliqspaces: kliqspaces ? firebase.firestore.FieldValue.arrayUnion(documentID) : [],
          })
          .then(function () {
            displayMessage(joinDoneMessage);
          })
          .catch(function (error) {
            // An error happened.
          });
      } else {
        displayMessage(joinErrorMessage);
      }
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
});
