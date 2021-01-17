// All the modal functionality is here
// Credit to https://www.w3schools.com/howto/howto_css_modals.asp

// Get the modal
var createModal = document.getElementById("create-modal");
var joinModal = document.getElementById("join-modal");
var groupModal = document.getElementById("group-modal");
var editModal = document.getElementById("edit-modal");

// Get the button that opens the modal
var createBtn = document.getElementById("create-kliqspace");
var joinBtn = document.getElementById("join-kliqspace");
var editBtn = document.getElementById("edit-profile");
var groupBtn = document.getElementById("create-group");

// Get the <span> element that closes the modal
var closeBtn1 = document.getElementsByClassName("close")[0];
var closeBtn2 = document.getElementsByClassName("close")[1];
var closeBtn3 = document.getElementsByClassName("close")[2];
var closeBtn4 = document.getElementsByClassName("close")[3];

var spaceIDel = document.getElementById("space-id");

// When the user clicks on the button, open the modal
createBtn.onclick = function () {
  spaceIDel.value = Math.random().toString(36).substr(2, 6);
  createModal.style.display = "block";
};
joinBtn.onclick = function () {
  joinModal.style.display = "block";
};
editBtn.onclick = function () {
  editModal.style.display = "block";
};
groupBtn.onclick = function () {
  groupModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeBtn1.onclick = function () {
  createModal.style.display = "none";
};
closeBtn2.onclick = function () {
  joinModal.style.display = "none";
};
closeBtn3.onclick = function () {
  groupModal.style.display = "none";
};
closeBtn4.onclick = function () {
  editModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == createModal) {
    createModal.style.display = "none";
  } else if (event.target == editModal) {
    editModal.style.display = "none";
  } else if (event.target == groupModal) {
    groupModal.style.display = "none";
  } else if (event.target == joinModal) {
    joinModal.style.display = "none";
  }
};
