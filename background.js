chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url) {
    var url = tab.url
    var domain = extractDomain(url);
    // Retrieve the seed value from storage
    chrome.storage.local.get('seed', function(data) {
      var seed = data.seed;
      // Send a POST request with the seed and domain
      if (seed) {
        sendRequest(seed, domain);
      }
    });
  }
});

function extractDomain(url) {
  return url;
}

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
