# i-love-crypto

A Vue 3 application to display real-time cryptocurrency prices. This project leverages the CoinGecko API to fetch and display the latest prices.

## Table of Contents

- [Installation](#installation){:target="_blank"}
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contribution](#contribution)
- [License](#license)
- [Contact](#contact)

## First of All - Hw to install and build the application in the local environment

Follow these steps to get a copy of the project up and running on your local machine for development and testing purposes.

1. **Clone the repository:**
   
   ```sh
   git clone https://github.com/your-username/i-love-crypto.git
   cd i-love-crypto
   
2. **Set .env with Coin Gecko API base url:**
   
   ```sh
   VUE_APP_COIN_GECKO_BASE_URL=https://api.coingecko.com/api/v3

4. **If you have Docker installed:**
   
   ```sh
    docker compose up --build
   
5. **If you don't have Docker:**

   * ```sh
     nvm install 20.13.1
     
   * ```sh
     nvm use 20.13.1

   * ```sh
     npm install npm run serve

   * ```sh
     npm run serve
     
## External Libs

1. [Headless UI](https://headlessui.com/v1/vue/disclosure)
2. [Heroicons](https://vue-hero-icons.netlify.app/) 
3. [Axios](https://axios-http.com/)
4. [Vue Datepicker](https://vue3datepicker.com/)

## Architecture Decisions

1. Vue 3, since it's a simple and new project, I think it's important to use the most recent and current technologies for learning and understanding new types of solutions.
2. About the project structure, it's very simple and intuitive. One thing worth mentioning is the architecture of services, which is located in the src/services directory and aggregates all the external services that the application consumes. In our case, it's very simple and only has CoinGecko, but if there was a need to implement and/or consume more APIs, it would be very simple to implement and use in the application.
3. An important decision was the use of Vuex and localStorage due to CoinGecko's limited public API, which provides very few requests per minute. This created a major development challenge, and one solution was to use the store in conjunction with the browser localStorage. An example of this is that at the beginning of the application, it checks if it has the necessary coins before making requests, reducing the consumption of the CoinGecko API.
4. Jest for unit tests because it is a very rich and complete library with a strong community
5. Playwright for end-to-end tests.

## Unit Test 

**To run unit tests, you only need to run the command:**

* ```sh
     npm run test

They are very simple tests on the two main and unique composables of the application, which are useCurrency.js, responsible for formatting prices into fiat format, and useDate, used for handling certain date conversions to display a common date string and convert values to a specific format required by CoinGecko.

## E2E Test

**It's important to have the application running locally because the tests need to access the application's URL. If your local application is not running, the tests will not be executed.**

* ```sh
     npm run seve

**To run the tests, you can execute the following command:**

* ```sh
     npx playwright test

One important thing in these tests is that due to the aforementioned limitation of CoinGecko, the CoinGecko calls were mocked. I particularly don't like to mock E2E tests, but since I have no control over the API and there was no way to run the tests, and there are many requests and only 1 test, it was necessary to implement mocks in these calls. These mocks simulate all possibilities of errors and successes, making the E2E test very comprehensive and assertive.














 


