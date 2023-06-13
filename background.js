function extractDomain(url) {
  var domain = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/im);
  return domain ? domain[1] : null;
}

// Function to send the request
function sendRequest(seed, domain) {
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
        console.log("Request successful");
      } else {
        console.error("Failed to send request:", response.status, response.statusText);
      }
    })
    .catch(error => {
      console.error("Error sending request:", error);
    });
}

function handleTabUpdate(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    chrome.storage.local.get('seed', function(data) {
      var seed = data.seed;
      var domain = extractDomain(changeInfo.url)
      if (seed && domain) {
        console.log(domain + ":" +"From handleTabUpdate." )
        sendRequest(seed, domain);
      }
    });
  }
}

function handleTabActivated(activeInfo) {
  chrome.storage.local.get('seed', function(data) {
    var seed = data.seed;
    chrome.tabs.get(activeInfo.tabId, function(tab) {
      if (tab && tab.url) {
        var url = tab.url;
        var domain = extractDomain(url);
        if (seed && domain) {
          console.log(domain + ":" +"From handleTabActivated." )
          sendRequest(seed, domain);
        }
      }
    });
  });
}

// Start checking the URL every few seconds if a seed is found
function intervalFunction() {
  chrome.storage.local.get('seed', function(data) {
    var seed = data.seed;
    if (seed) {
      // Get the current active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var tab = tabs[0];

        // Check if a valid tab object is present
        if (tab && tab.url) {
          var url = tab.url;
          var domain = extractDomain(url)
          if (seed && domain) {
            console.log(domain + ":" +"From intervalFunction." )
            sendRequest(seed, domain);
          }}
      });
    }
  });
}

setInterval(intervalFunction, 60000); // Call the interval function every 3 seconds

// Register event listener for tab updates
chrome.tabs.onUpdated.addListener(handleTabUpdate);

// Register event listener for tab activation
chrome.tabs.onActivated.addListener(handleTabActivated);
