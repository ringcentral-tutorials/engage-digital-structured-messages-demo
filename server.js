const http = require('http');
const express = require('express');
const axios = require('axios');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
server.listen(process.env.PORT || 3000);

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
        body: ">this is the primary message that will be send to the cliend. E.g. Hi, what do you want to buy?<",
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
          "url": "https://github.com/ringcentral",
          "url_text": "GitHub",
          "title": "RingCentral, Inc.",
          "subtitle": "Cloud Business Communications. RingCentral, Inc. has 84 repositories available. Follow their code on GitHub.",
          "attachment_id": "6021087444172c000b93e69a", // get attachment id from https://developers.ringcentral.com/engage/digital/guide/basics/uploads
        }
      }
    } else if (req.body.events[0].resource.metadata.body.indexOf('carousel') > -1) {
      structuredMessage = { 
        "in_reply_to_id": replyToId,
        "structured_content": { 
          "type": "carousel",
          "items": [
            { 
              "url": "https://www.yandex.ru",
              "url_text": "Yandex search",
              "title": "YANDEX | Top rus search engine",
              "attachment_id":"6021078144172c000b93e68c",
              "items": [
                { "type": "url", "title": "Go to yandex page", "url": "https://www.yandex.ru" },
                { "type": "reply", "title": "Next show", "payload": "next" }
              ]
            },
            { 
              "url": "https://www.google.com/",
              "url_text": "Google search",
              "title": "GOOGLE | The best search engine",
              "attachment_id": "6021079444172c000b93e68d",
              "items": [
                { "type": "url", "title": "Go to google website", "url": "https://www.google.com/" }, { "type": "reply", "title": "Next show", "payload": "next" }
              ]
            },
            {
              "url": "https://www.netflix.com/fr-en/title/80057281",
              "url_text": "Bing search",
              "title": "BING | Microsoft search",
              "attachment_id": "602107a2d6d785000c9b762f",
              "items": [
                { "type": "url", "title": "Go to bing website", "url": "https://www.bing.com/" }, { "type": "reply", "title": "Next show", "payload": "next" }
              ] 
            }
          ]	
        }
      }
    } else if (req.body.events[0].resource.metadata.body.indexOf('template') > -1) {
      structuredMessage = { 
        "in_reply_to_id": replyToId,
        "structured_content": {
          "type": "template",
          "attachment_id": "60203f27aaf715000b9e4c15",
          "url": "https://developers.ringcentral.com/",
          "url_text": "RingCentral Developers", "title": "RingCentral | Developers",
          "items": [
            { 
                "type": "url", 
                "title": "Office Guide", 
                "url": "https://developers.ringcentral.com/guide" 
            }, 
            { 
                "type": "url", 
                "title": "Engage Digital Guide",
                "url": "https://developers.ringcentral.com/engage/digital/guide" 
            }
          ] 
        } 
      }
    } else {
      structuredMessage = {
        in_reply_to_id: req.body.events[0].resource.id,
        body: `Hi~, you can type "select", "link", "template" or "carousel" to get structured message`,
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
