// main.js

function handleLogin(event) {
  event.preventDefault();
  alert("Login successful!");
  window.location.href = "dashboard.html";
}

function submitGatePass(event) {
  event.preventDefault();
  alert("Gate pass request submitted!");
}

function submitComplaint(event) {
  event.preventDefault();
  alert("Complaint submitted. We'll resolve it soon!");
}

function bookStudyRoom(event) {
  event.preventDefault();
  alert("Study room booking submitted!");
}

function submitCleaningRequest(event) {
  event.preventDefault();
  alert("Cleaning request submitted!");
}

function submitMessRating(event) {
  event.preventDefault();
  const rating = document.querySelector('input[name="rating"]:checked');
  if (rating) {
    alert("Thank you for rating mess as: " + rating.value + "/5");
  } else {
    alert("Please select a rating.");
  }
}

function submitPollVote(event) {
  event.preventDefault();
  const choice = document.querySelector('input[name="poll"]:checked');
  if (choice) {
    alert("Thank you for voting for: " + choice.value);
  } else {
    alert("Please select an option to vote.");
  }
}

// Optional: Add event listeners here if forms don't use onsubmit inline
