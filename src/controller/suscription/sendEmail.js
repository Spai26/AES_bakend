const handlerHttpError = require("../../utils/handlerHttpError");
const { newCampaign } = require("./objectSend")
const Sib = require("../../config/sendinblue")
const listId = 6


const addSuscriptiontoList = async ({ first_name, last_name, email }) => {

    try {
        console.log(email)
        let apiInstance = await new Sib.ContactsApi();
        let createContact = await new Sib.CreateContact();
        //const attributtes = new Properties()

        createContact.email = email
        createContact.listIds = [listId]
        createContact.attributes = {
            "NOMBRE": first_name,
            "APELLIDOS": last_name
        }
        await apiInstance.createContact(createContact)
        console.log('API called successfully. Returned data: ' + JSON.stringify());

    } catch (error) {
        console.error(error)
        throw error;
    }

}

//se agrega un tag de a los contactos de tal forma que se dispare un evento automatizado
const sendPostNewInfo = async (type, info) => {
    try {
        const id = await createCampaign(type, info)
        let apiInstance = await new Sib.EmailCampaignsApi();
        //const campaigns = await apiInstance.getEmailCampaigns()
        // apiInstance.sendEmailCampaignNow(campaigns.campaigns[0].id).then(function () {
        await apiInstance.sendEmailCampaignNow(id)
        console.log('API called successfully.');
    } catch (error) {
        console.error(error)
    }
}



const createCampaign = async (type, info) => {
    // console.log(info)
    const { title } = info

    let params
    if (type == "event") {
        params = {
            event: title,
            event_image: info.frontpage
        }
    } else if (type == "blog") {
        params = {
            title,
            description: info.description,
            blog_image: info.image
        }
    }

    try {
        let apiInstance = await new Sib.EmailCampaignsApi();
        let templateId = await getTemplate(type)
        let emailCampaigns = await newCampaign({ title, params, listId, templateId, Sib });
        const campaign = await apiInstance.createEmailCampaign(emailCampaigns)
        return campaign.id
    } catch (error) {
        console.error(error)
    }
}

const getTemplate = async (type) => {
    let apiInstance = new Sib.TransactionalEmailsApi();
    const templates = await apiInstance.getSmtpTemplates()
    const id = templates.templates.find(t => t.name.toLowerCase().includes(type.toLowerCase())).id
    return id

}

module.exports = {
    addSuscriptiontoList,
    sendPostNewInfo
}