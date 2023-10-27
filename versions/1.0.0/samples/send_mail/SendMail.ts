import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class SendMail
{
    public static async sendMail(recordId: bigint, moduleAPIName: string) {
        let sendMailOperations: ZOHOCRMSDK.MailSend.SendMailOperations = new ZOHOCRMSDK.MailSend.SendMailOperations(recordId, moduleAPIName);
        let mail: ZOHOCRMSDK.MailSend.Data = new ZOHOCRMSDK.MailSend.Data();
        let from: ZOHOCRMSDK.MailSend.From = new ZOHOCRMSDK.MailSend.From();
        from.setUserName("UserName");
        from.setEmail("abc@gmail.com");
        await mail.setFrom(from);
        let to : ZOHOCRMSDK.MailSend.To = new ZOHOCRMSDK.MailSend.To();
        to.setUserName("UserName1");
        to.setEmail("abc1@gmail.com");
        mail.setTo([to]);
        let cc : ZOHOCRMSDK.MailSend.To = new ZOHOCRMSDK.MailSend.To();
        cc.setUserName("username");
        cc.setEmail("abc@gmail.com");
        mail.setCc([cc]);
        let bcc : ZOHOCRMSDK.MailSend.To = new ZOHOCRMSDK.MailSend.To();
        bcc.setUserName("username1");
        bcc.setEmail("abc1@gmail.com");
        mail.setBcc([bcc]);
        mail.setOrgEmail(false);
        mail.setInReplyTo("2423rdsdreferfwd4e234qtfer65erwqxdfdesdef");
        mail.setScheduledTime(new Date(2023,11, 11, 10, 22, 23));
        let attachments : ZOHOCRMSDK.MailSend.Attachment[] = [];
        let attachment : ZOHOCRMSDK.MailSend.Attachment = new ZOHOCRMSDK.MailSend.Attachment();
        attachment.setId("23242354dedfrfrer43413232423434sdfrecrfedxwdzws");
        attachments.push(attachment);
        mail.setAttachments(attachments);
        mail.setSubject("Mail subject");
        mail.setContent("<br><a href=\"{ConsentForm.en_US}\" id=\"ConsentForm\" class=\"en_US\" target=\"_blank\">Consent form link</a><br><br><br><br><br><h3><span style=\"background-color: rgb(254, 255, 102)\">REGARDS,</span></h3><div><span style=\"background-color: rgb(254, 255, 102)\">AZ</span></div><div><span style=\"background-color: rgb(254, 255, 102)\">ADMIN</span></div> <div></div>");
        mail.setConsentEmail(true);
        mail.setMailFormat(new ZOHOCRMSDK.Choice("html"));
        let template : ZOHOCRMSDK.MailSend.InventoryTemplate = new ZOHOCRMSDK.MailSend.InventoryTemplate();
        template.setId(BigInt("440280258279"));
        await mail.setTemplate(template);
        // To send an Email for inventory modules - include inventory details
        let inventoryDetails = new ZOHOCRMSDK.MailSend.InventoryDetails();
        inventoryDetails.setInventoryTemplate(template);
        mail.setInventoryDetails(inventoryDetails);
        //
        let wrapper : ZOHOCRMSDK.MailSend.BodyWrapper = new ZOHOCRMSDK.MailSend.BodyWrapper();
        wrapper.setData([mail]);
        //Call sendMail method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.MailSend.ActionHandler.MasterModel> = await sendMailOperations.sendMail(wrapper);
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(
                    response.getStatusCode() == 204 ? "No Content" : "Not Modified"
                );
                return;
            }
            let responseObject: ZOHOCRMSDK.MailSend.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.MailSend.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.MailSend.ActionResponse.MasterModel[] =
                        responseObject.getData();
                    actionResponses.forEach((actionResponse) => {
                        if (actionResponse instanceof ZOHOCRMSDK.MailSend.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach((key) => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                        else if (
                            actionResponse instanceof ZOHOCRMSDK.MailSend.APIException
                        ) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach((key) => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.MailSend.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any> = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach((key) => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage());
                }
            }
        }
    }
    static async initializeAndCall()
    {
        let environment: ZOHOCRMSDK.Environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
        let token : ZOHOCRMSDK.OAuthToken = new ZOHOCRMSDK.OAuthBuilder()
            .clientId("client_id")
            .clientSecret("client_secret")
            .grantToken("grant_token")
            .build();
        await (await new ZOHOCRMSDK.InitializeBuilder())
            .environment(environment)
            .token(token)
            .initialize();
        await SendMail.sendMail(BigInt("44028575053"), "Quotes");
    }
}
SendMail.initializeAndCall();
