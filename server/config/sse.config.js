const SSE = require('express-sse');
const sse = new SSE();

function initialize() {
  return sse.init;
}

function sendEvent(payload, type = null) {
  return sse.send(payload, type);
}

function updateInit(data) {
  return sse.updateInit(data);
}

module.exports = { initialize, sendEvent, updateInit };
