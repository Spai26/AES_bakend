const Sib = require('sib-api-v3-sdk');
const {
    SENDINBLUE_KEY
} = require("./variable.env");
const client = Sib.ApiClient.instance


let apiKey = client.authentications['api-key']
apiKey.apiKey = SENDINBLUE_KEY;

module.exports = Sib