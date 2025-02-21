# Nimful Extension

## Overview

The Nimful Extension is a browser extension designed to interact with Nimful's word cloud feature. It helps users connect to their Nimful account and track domain visits seamlessly.

## Features

- Connect to Nimful account using a seed.
- Automatically send domain visit data to Nimful's API.
- Manage connection status within the extension.

## Technologies Used

- **HTML/CSS**: For structuring and styling the popup interface.
- **JavaScript**: For handling logic in the extension, including event listeners and API requests.
- **Chrome Extensions API**: To interact with browser tabs and local storage.

## File Structure

- **popup.html**: Defines the UI of the extension's popup.
- **popup.css**: Contains styling for the popup UI.
- **popup.js**: Provides logic for handling user interactions and connecting to Nimful.
- **background.js**: Manages background activities such as tab updates and domain visit tracking.
- **manifest.json**: Configures the extension's metadata and permissions.

## How It Works

1. **Connecting to Nimful**: Users can enter their Nimful seed in the popup to establish a connection. The seed is stored locally.
2. **Tracking Domain Visits**: Once connected, the extension sends domain visit data to Nimful every time a tab is updated or activated.
3. **UI Management**: The popup UI updates based on the connection status, hiding or showing relevant buttons and inputs.

## Development

### Prerequisites

- Google Chrome
- Node.js (for potential future development tasks)

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/nimful-extension.git
    cd nimful-extension
    ```

2. Load the extension in Chrome:
    - Open Chrome and navigate to `chrome://extensions/`.
    - Enable "Developer mode" by toggling the switch in the top-right corner.
    - Click "Load unpacked" and select the cloned repository folder.

### Key JavaScript Functions

- **sendRequest**: Sends an API request to the Nimful server with the user's seed and domain information.
- **intervalFunction**: Periodically checks the current tab's URL and sends domain data if connected.
- **handleTabUpdate** and **handleTabActivated**: Event listeners that trigger domain data submission on tab changes.

## Deployment

Currently, the Nimful Extension is intended for development use only. To deploy it more widely:

1. Ensure all code is production-ready and free of console logs or test functions.
2. Package the extension for distribution via the Chrome Web Store by following [Google's guide](https://developer.chrome.com/docs/webstore/publish/).

## Contribution

Contributions to the Nimful Extension are welcome. Please fork the repository and submit a pull request with your changes.
