const connect = require("camo").connect;

async function initialize(uri = 'nedb://memory') {
  return await connect(uri);
}

module.exports = { initialize };
