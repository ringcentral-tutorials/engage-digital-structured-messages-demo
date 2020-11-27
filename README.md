# Demo of Engage Digital Structured Message

A demo of Engage Digital Structured Message by following [Quick Start here](https://engage-digital-api-docs.readthedocs.io/en/latest/interactions/structured-messages/quick-start/)

### Requirements:

  Node.js >= 8

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

3. Start Ngrok to create to domain for webhook

```
$ yarn ngrok
```

4. Create `.env` file as `.env.default`

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

Ngrok domain from step 3


7. Test by chatting in your Messaging Channel
