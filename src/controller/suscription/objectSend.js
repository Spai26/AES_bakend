const { CreateEmailCampaign } = require("../../config/sendinblue");

module.exports = {
  newCampaign: async ({ templateId, title, params, listId }) => {
    let emailCampaigns = await CreateEmailCampaign;
    emailCampaigns = {
      //tag: 'myTag',
      sender: { name: "AES", email: process.env.SMS_EMAIL },
      name: title,
      templateId: templateId,
      subject: title,
      replyTo: process.env.SMS_EMAIL,
      // toField: '{{contact.FIRSTNAME}} {{contact.LASTNAME}}',
      recipients: { listIds: [listId] },
      mirrorActive: false,
      recurring: false,
      type: "classic",
      header: "If you are not able to see this mail, click {here}",
      footer: "If you wish to unsubscribe from our newsletter, click {here}",
      params,
    };
    return emailCampaigns;
  },
};
