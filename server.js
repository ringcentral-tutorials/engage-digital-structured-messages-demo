const http = require('http');
const express = require('express');
const axios = require('axios');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
server.listen(process.env.PORT);

app.use(express.json());

app.get('/webhook', (req, res) => {
  console.log(JSON.stringify(req.query, null, 2));
  console.log(JSON.stringify(req.body, null, 2));
  if (req.query['hub.mode'] === 'subscribe') {
    res.send(req.query['hub.challenge']); // For validate webhook
  }
  res.status(200);
  res.end();
});

app.post('/webhook', async (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  console.log(JSON.stringify(req.query, null, 2));
  if (req.body.events && req.body.events[0] && req.body.events[0].resource.id) {
    let structuredMessage;
    const replyToId = req.body.events[0].resource.id;
    if (req.body.events[0].resource.metadata.body.indexOf('select') > -1) {
      structuredMessage = {
        in_reply_to_id: replyToId,
        body: "Hi, what do you want to buy?",
        structured_content: {
            center_items: false,
            disable_text_input: false,
            type: "select",
            items: [
                { "title": "Laptop" }, { "title": "Desktop PC" }, { "title": "Mobile phone" }, { "title": "Webcamera" }, { "title": "Notebook" }, { "title": "Pocket PC" }, { "title": "iWatch" }, { "title": "Other watch" }
            ]
        }
      };
    } else if (req.body.events[0].resource.metadata.body.indexOf('link') > -1) {
      structuredMessage = {
        "in_reply_to_id": replyToId,
        "structured_content": {
          "type": "rich_link",
          "title": "Ringcentral, Inc.",
          "subtitle": "Cloud Business Communications",
          "url": "github://github.com/ringcentral",
          "url_fallback": "https://github.com/ringcentral",
          "url_text": "Github"
        }
      }
    } else {
      structuredMessage = {
        in_reply_to_id: req.body.events[0].resource.id,
        body: `Hi~, you can type "select" and "link" to get structured message`,
      };
    }
    try {
      await axios.post(`${process.env.ENGAGE_DIGITAL_SERVER}/1.0/contents`, structuredMessage, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ENGAGE_DIGITAL_ACCESS_TOKEN}`,
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
  res.status(200);
  res.end();
});
