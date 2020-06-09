# Frontend Interview Setup Instructions

Complete the following on your local machine the day prior to the interview:

1. Clone this repository

1. `checkout` this branch (`interview-build`) 

1. Install `yarn` on your local machine (if not installed already)

1. Install the [metamask](https://metamask.io/) browser extension if you haven't already, and set up an account.
    - If you already have a MetaMask account, best to use a "dummy" address (with no real funds, etc) for this exercise, just to be safe. (Note that you won't need to use metamask directly for this exercise, but it needs to be installed in the browser)

1. Create a `.env.local` file and set the following environmental variables:
    ```
    REACT_APP_L1_NETWORK_ID="3"
    REACT_APP_NETWORK_ID="123456789"
    REACT_APP_ARB_VALIDATOR_URL="http://64.225.27.132:1235"
    REACT_APP_BASE_URL_NAME="new"
    REACT_APP_ARBISWAP_ADDRESS="0x716f0d674efeeca329f141d0ca0d97a98057bdbf"
    ```
1. Install the dependencies

1. Start the dev server

If the user interface builds and launches, you're set; console errors `network does not support ENS` and `contract not deployed` can be ignored. If you run into obstacles, let us know!


You're welcome to take a look at the codebase, but this isn't necessary. Don't worry if you've never seen react hooks before; knowledge of react hooks won't be necessary to complete the exercise. 