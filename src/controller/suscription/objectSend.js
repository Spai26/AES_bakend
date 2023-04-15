module.exports = {
    newContact: async () => {
        const CreateContact = await new Sib.CreateContact();
        //const attributtes = new Properties()

        createContact.email = email
        createContact.listIds = [listId]
        createContact.attributes = {
            "NOMBRE": first_name,
            "APELLIDOS": last_name
        }
        return CreateContact
    },

    newCampaign: async ({ templateId, title, params, listId = 6, Sib }) => {
        let emailCampaigns = await new Sib.CreateEmailCampaign();
        emailCampaigns = {
            //tag: 'myTag',
            sender: { name: 'AES', email: 'manguelexonh@gmail.com' },
            name: title,
            templateId: templateId,
            subject: title,
            replyTo: 'manguelexonh@gmail.com',
            toField: '{{contact.FIRSTNAME}} {{contact.LASTNAME}}',
            recipients: { listIds: [listId] },
            mirrorActive: false,
            recurring: false,
            type: 'classic',
            header: 'If you are not able to see this mail, click {here}',
            footer: 'If you wish to unsubscribe from our newsletter, click {here}',
            params
        }
        return emailCampaigns
    }

}