// Function to extract the domain from the URL
function extractDomain(url) {
  return url;
}

// Function to send the request
function sendRequest(seed, domain) {
  // Implement your logic to send a POST request to the API endpoint here
  // Example implementation:
  var apiUrl = "http://localhost:8080/api/v1/create-domain-visit";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ seed: seed, domain: domain })
  })
    .then(response => {
      if (response.ok) {
        // Request successful
        console.log("Request successful");
      } else {
        // Request failed
        console.error("Failed to send request:", response.status, response.statusText);
      }
    })
    .catch(error => {
      console.error("Error sending request:", error);
    });
}

// Function to handle tab updates
function handleTabUpdate(tabId, changeInfo, tab) {
  // Check if the URL is updated
  if (changeInfo.url) {
    // Retrieve the seed value from storage
    chrome.storage.local.get('seed', function(data) {
      var seed = data.seed;

      // Send a POST request with the seed and domain
      if (seed) {
        sendRequest(seed, extractDomain(changeInfo.url));
      }
    });
  }
}

// Function to handle tab activation
function handleTabActivated(activeInfo) {
  // Retrieve the seed value from storage
  chrome.storage.local.get('seed', function(data) {
    var seed = data.seed;

    // Get the current active tab
    chrome.tabs.get(activeInfo.tabId, function(tab) {
      // Check if a valid tab object is present
      if (tab && tab.url) {
        var url = tab.url;
        var domain = extractDomain(url);
        console.log(domain);

        // Send a POST request with the seed and domain
        if (seed) {
          sendRequest(seed, domain);
        }
      }
    });
  });
}

// Start checking the URL every few seconds if a seed is found
chrome.storage.local.get('seed', function(data) {
  var seed = data.seed;
  if (seed) {
    setInterval(function() {
      // Get the current active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var tab = tabs[0];

        // Check if a valid tab object is present
        if (tab && tab.url) {
          var url = tab.url;
          var domain = extractDomain(url);
          console.log(domain);

          // Send a POST request with the seed and domain
          sendRequest(seed, domain);
        }
      });
    }, 3000); // Change the interval (in milliseconds) as needed
  }
});

// Register event listener for tab updates
chrome.tabs.onUpdated.addListener(handleTabUpdate);

// Register event listener for tab activation
chrome.tabs.onActivated.addListener(handleTabActivated);
