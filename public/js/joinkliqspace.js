const joinForm = document.getElementById("join-kliqspace-form");
joinForm.addEventListener("submit", (e) => {
  const displayName = document.getElementById("join-kliqspace-display").value;
  const joinSpaceID = document.getElementById("join-kliqspace-id").value;

  const joinDoneMessage = document.getElementById("form-join-done");
  const joinErrorMessage = document.getElementById("form-join-error");
  e.preventDefault();

  // import the database
  const db = firebase.firestore();
  const user = firebase.auth().currentUser.uid;

  db.collection("kliqspaces")
    .where("spaceID", "==", joinSpaceID)
    .get()
    .then(function (querySnapshot) {
      console.log(querySnapshot);
      let nodoc = true;
      let document;
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        nodoc = false;
        documentID = doc.id;
        console.log(doc.id, " => ", doc.data());
      });
      if (!nodoc) {
        // add user to kliqspace
        db.collection("cities")
          .doc(documentID)
          .update({
            users: firebase.firestore.FieldValue.arrayUnion(user.id),
          });

        // add kliqspace to user
        user
          .updateProfile({
            displayName: displayName ? displayName : "Undefined",
            kliqspaces: firebase.firestore.FieldValue.arrayUnion(doc.id),
          })
          .then(function () {
            displayMessage(joinDoneMessage);
            console.log(joinDoneMessage);
          })
          .catch(function (error) {
            // An error happened.
          });
      } else {
        displayMessage(joinErrorMessage);
        console.log(joinErrorMessage);
      }
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  // db.collection("kliqspaces")
  //   .get()
  //   .then(function (querySnapshot) {
  //     querySnapshot.forEach(function (doc) {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   });

  // const data = db.collection("kliqspaces").where("spaceID", "==", joinSpaceID);
  // console.log(joinSpaceID);

  // data
  //   .get()
  //   .then(function (doc) {
  //     if (doc.exists) {
  //       console.log("Document data:", doc.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log("Error getting document:", error);
  //   });
  // db.collection("kliqspaces")
  //   .where("spaceID", "==", joinSpaceID)
  //   .get()
  //   .then(function (querySnapshot) {
  //   console.log(joinDoneMessage);
  //   querySnapshot.forEach(function (doc) {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());

  //     // add user to kliqspace
  //     doc.update({
  //       users: firebase.firestore.FieldValue.arrayUnion(user),
  //     });

  //     // add kliqspace to user
  //     user
  //       .updateProfile({
  //         displayName,
  //         kliqspaces: firebase.firestore.FieldValue.arrayUnion(doc.id),
  //       })
  //       .then(function () {
  //         displayMessage(joinDoneMessage);
  //         console.log(joinDoneMessage);
  //       })
  //       .catch(function (error) {
  //         // An error happened.
  //       });
  //   });
  // })
  // .catch(function (error) {
  //   displayMessage(joinErrorMessage);
  //   console.log(joinErrorMessage);
  // });
});
