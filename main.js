// Getting started with Facebook Messaging Platform
// https://developers.facebook.com/docs/messenger-platform/quickstart

var express = require('express');
var request = require('superagent');
var bodyParser = require('body-parser');

var pageToken = process.env.APP_PAGE_TOKEN;
var verifyToken = process.env.APP_VERIFY_TOKEN;

var app = express();
app.use(bodyParser.json());

app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'token') {
        return res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});
app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      console.log(text);
	  sendTextMessage(sender, "Lexperts: "+ text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});
var token = "EAADwIPsxeakBAO8e9vxFpLvZBdoLiQihjBDXnx9JwMey5dXbjq0TxWZAf20wHUZC9NosgLo6bqG0NpVWDLSx4RPdc8peBVZBRtukh7fE7ti9Ss90Y8xLqoLf6yJo6ffI8U8zNCF62oxh04OeiZA8IKjjkQW52QqK2abJTD4hzvgZDZD";

function sendMessage (sender, message) {
    request
        .post('https://graph.facebook.com/v2.6/me/messages')
        .query({access_token: token})
        .send({
            recipient: {
                id: sender
            },
            message: message
        })
        .end(function(err, res) {
            if (err) {
                console.log('Error sending message: ', err);
            } else if (res.body.error) {
                console.log('Error: ', res.body.error);
            }
        });
}

function sendTextMessage (sender, text) {
    sendMessage(sender, {
        text: text
    });
}
app.listen(8081);