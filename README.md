# Demo of Engage Digital Structured Message

A demo of Engage Digital Structured Message by following [Quick Start here](https://engage-digital-api-docs.readthedocs.io/en/latest/interactions/structured-messages/quick-start/)

[Online Demo](https://embbnux.github.io/engage-digital-structured-messages-demo/index.html)

[![Deploy To Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Requirements:

  * Node.js >= 8 (https://nodejs.org/en/download/)
  * Yarn (If not already installed, go to https://yarnpkg.com/lang/en/docs/install/ to install yarn)

### Run in Local:

1. Clone this repo

```
$ git clone https://github.com/embbnux/engage-digital-structured-messages-demo.git
$ cd engage-digital-structured-messages-demo
```

2. Install dependencies

```
$ yarn
```

3. Start `Ngrok` to create to domain for webhook

```
$ yarn ngrok
```

4. Create `.env` file as `.env.default`

Using `.env.default` as a template, create the `.env` file with your own access token and server.

```
ENGAGE_DIGITAL_ACCESS_TOKEN=your_engage_digital_API_access_token
ENGAGE_DIGITAL_SERVER=your_engage_digital_api_server # eg: https://[YOUR DOMAIN].api.digital.ringcentral.com
```

5. Start test server


```
yarn start
```

6. Create Webhook in Engage Digital Admin web

Webhook Uri:

```
https://xxxxxxx.ap.ngrok.io/webhook
```

Create a new Webhook in Engage Digital Admin web. Make sure to add the `/webhook` to your ngrok URI, And ngrok domain from step 3


7. Test by chatting in your Messaging Channel

* Type 'select' in the customer's chat window to see an example of a quick reply
* type 'link' in the customer's chat window to see an example of a rich link

### Run with Heroku

1. Click `Deploy to Heroku` to have a quick deploy to heroku.

In setup page, setup `ENGAGE_DIGITAL_ACCESS_TOKEN` and `ENGAGE_DIGITAL_SERVER` environment variables.

2. After deployment, create Webhook in Engage Digital Admin web

Webhook Uri:

```
https://xxxxxxxxxx.herokuapp.com/webhook
```

Create a new Webhook in Engage Digital Admin web. Make sure to add the `/webhook` to your ngrok URI, And hero domain from step 1


3. Test by chatting in your Messaging Channel

* Type 'select' in the customer's chat window to see an example of a quick reply
* type 'link' in the customer's chat window to see an example of a rich link
