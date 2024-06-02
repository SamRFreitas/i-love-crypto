![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Playwright](https://img.shields.io/static/v1?style=for-the-badge&message=Playwright&color=2EAD33&logo=Playwright&logoColor=FFFFFF&label=)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

# i-love-crypto

A Vue 3 application for displaying real-time cryptocurrency prices. This project utilizes the CoinGecko API to fetch and display the latest prices.

## Installation

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
     
## External Libraries

1. [Headless UI](https://headlessui.com/v1/vue/disclosure)
2. [Heroicons](https://vue-hero-icons.netlify.app/) 
3. [Axios](https://axios-http.com/)
4. [Vue Datepicker](https://vue3datepicker.com/)

## Architecture Decisions

1. Vue 3 was chosen for its simplicity and new features, enabling us to use the most recent technologies for learning and exploring new solutions.
2. The project structure is simple and intuitive, with a clear separation of concerns. The architecture of services, located in the src/services directory, aggregates all external services that the application consumes, making it easy to implement and use additional APIs.
3. An important decision was the use of Vuex and localStorage due to CoinGecko's limited public API, which provides very few requests per minute. This created a major development challenge, and one solution was to use the store in conjunction with browser localStorage. For example, at the beginning of the application, it checks if it has the necessary coins before making requests, reducing the consumption of the CoinGecko API.
4. Jest was chosen for unit tests because it is a very rich and complete library with a strong community.
5. Playwright was chosen for end-to-end tests.

## Unit Tests

**To run unit tests, simply execute the following command:**

* ```sh
     npm run test

The unit tests are simple and focus on the two main and unique composables of the application: useCurrency.js, responsible for formatting prices into fiat format, and useDate, used for handling certain date conversions to display a common date string and convert values to a specific format required by CoinGecko.

## E2E Tests

**It's important to have the application running locally because the tests need to access the application's URL. If your local application is not running, the tests will not be executed.**

* ```sh
     npm run serve

**To run the tests, use the following command:**

* ```sh
     npx playwright test

One important aspect of these tests is that due to the aforementioned limitation of CoinGecko, the CoinGecko calls were mocked. Although I prefer not to mock E2E tests, since I have no control over the API and there was no way to run the tests, and there are many requests and only 1 test, it was necessary to implement mocks in these calls. These mocks simulate all possibilities of errors and successes, making the E2E test very comprehensive and assertive.

## Deployment 

**The last thing to mention is that GitHub Actions was implemented for CI/CD. Every time a push is made to the main branch, it triggers the actions, including unit tests, E2E tests, and if they pass, it deploys to Vercel. This way, I only have to promote that deploy to production, ensuring a deployment with reliable updates and guaranteeing the quality of the project. You can view the configuration of the jobs in the deploy.yml file inside the .github/workflows/deploy.yml directory.**
