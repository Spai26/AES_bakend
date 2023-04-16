const Sib = require('sib-api-v3-sdk');
const { SENDINBLUE_KEY } = require("./variable.env");

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = SENDINBLUE_KEY;

const CreateEmailCampaign = new Sib.CreateEmailCampaign()
const ContactsApi = new Sib.ContactsApi()
const EmailCampaignsApi = new Sib.EmailCampaignsApi();
const TransactionalEmailsApi = new Sib.TransactionalEmailsApi();
const CreateContact = new Sib.CreateContact()

module.exports = {ContactsApi, CreateContact, EmailCampaignsApi, TransactionalEmailsApi, CreateEmailCampaign};