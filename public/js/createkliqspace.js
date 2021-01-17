const form = document.getElementById("create-kliqspace-form");
const spaceName = document.getElementById("new-kliqspace-name").value;
const min = document.getElementById("new-kliqspace-min").value;
const max = document.getElementById("new-kliqspace-max").value;
const spaceID = document.getElementById("space-id");

const doneMessage = document.getElementById("form-create-done");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // import the database
  const db = firebase.firestore();
  const owner = firebase.auth().currentUser.uid;

  db.collection("kliquespaces")
    .add({
      spaceName,
      min,
      max,
      owner,
      spaceID: spaceID.value,
    })
    .then(function (docRef) {
      displayMessage();
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});

function displayMessage() {
  doneMessage.classList.remove("hidden");
  setTimeout(function () {
    doneMessage.classList.add("hidden");
  }, 5000);
}

function copyID() {
  /* Get the text field */
  var copyText = spaceID;

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");
}
