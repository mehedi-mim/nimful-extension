document.addEventListener("DOMContentLoaded", function () {
  var submitButton = document.getElementById("submitButton");
  var generateSeedButton = document.getElementById("generateSeedButton");
  var refreshButton = document.getElementById("refreshButton");
  var nameInput = document.getElementById("nameInput");
  var output = document.getElementById("output");
  var enterText = document.getElementById("enterText");

  // Load the seed from local storage if it exists
  var seed = localStorage.getItem("seed");
  if (seed) {
    output.textContent = "Connected..!";
    submitButton.style.display = "none";
    generateSeedButton.style.display = "none";
    refreshButton.style.display = "inline";
    nameInput.style.display = "none";
    enterText.style.display = "none";
  }

  submitButton.addEventListener("click", function () {
    var name = nameInput.value;
    output.textContent = "Connecting...";

    sendRequest(name);
  });

  generateSeedButton.addEventListener("click", function () {
    var newTabUrl = "http://localhost:3000";
    chrome.tabs.create({ url: newTabUrl });
  });

  refreshButton.addEventListener("click", function () {
    localStorage.removeItem("seed");
    chrome.storage.local.remove("seed", function() {
      console.log("Seed cleared from Chrome local storage.");
    });
    chrome.storage.local.get('seed', function(data) {
      var seed = data.seed;
      console.log(seed)
    });
    
    // Reset the UI
    output.textContent = "";
    submitButton.style.display = "inline";
    generateSeedButton.style.display = "inline";
    refreshButton.style.display = "none";
    nameInput.value = "";
    nameInput.style.display = "inline";
    enterText.style.display = "inline";
  });

  function sendRequest(seed) {
    var apiUrl =
      "http://localhost:8080/api/v1/verify-seed?seed=" +
      encodeURIComponent(seed);

    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Failed to send request: " +
              response.status +
              " " +
              response.statusText
          );
        }
      })
      .then((data) => {
        output.textContent = "Connected..!";
        submitButton.style.display = "none";
        generateSeedButton.style.display = "none";
        refreshButton.style.display = "inline";
        nameInput.style.display = "none";
        enterText.style.display = "none";

        localStorage.setItem("seed", seed);
        chrome.storage.local.set({ seed: seed }, function () {});
      })
      .catch((error) => {
        output.textContent = "Connection failed";
      });
  }
});
