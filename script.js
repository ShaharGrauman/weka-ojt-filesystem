const temp = document.querySelector(".btn");

temp.addEventListener("click", function() {
  document.querySelector("#sidebar").classList.toggle("expand");
});

// Function to display the message after a short delay
function displayMessage() {
  var message = document.getElementById("downloadMessage");
  message.style.display = "block";
}

// Add an event listener to the download link
document
  .getElementById("downloadLink")
  .addEventListener("click", function(event) {
    setTimeout(displayMessage, 1000);
  });
