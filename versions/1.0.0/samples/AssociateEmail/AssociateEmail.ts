import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";

export class AssociateEmail
{
    public static async associate(recordId : bigint, module : string)
    {
        let associateEmailOperations : ZOHOCRMSDK.AssociateEmail.AssociateEmailOperations = new ZOHOCRMSDK.AssociateEmail.AssociateEmailOperations();
        let request : ZOHOCRMSDK.AssociateEmail.BodyWrapper= new ZOHOCRMSDK.AssociateEmail.BodyWrapper();
        let emails : ZOHOCRMSDK.AssociateEmail.AssociateEmail[] = [];
        for (let i = 0; i<1; i++)
        {
            let associateEmail : ZOHOCRMSDK.AssociateEmail.AssociateEmail = new ZOHOCRMSDK.AssociateEmail.AssociateEmail();
            let from : ZOHOCRMSDK.AssociateEmail.From = new ZOHOCRMSDK.AssociateEmail.From();
            from.setEmail("abc@gmail.com");
            from.setUserName("username");
            await associateEmail.setFrom(from);
            let tos : ZOHOCRMSDK.AssociateEmail.To[] = [];
            let to : ZOHOCRMSDK.AssociateEmail.To= new ZOHOCRMSDK.AssociateEmail.To();
            to.setEmail("abc1@gmail.com");
            to.setUserName("username1");
            tos.push(to);
            let tos1 : ZOHOCRMSDK.AssociateEmail.To[] = [];
            let to1 : ZOHOCRMSDK.AssociateEmail.To= new ZOHOCRMSDK.AssociateEmail.To();
            to1.setEmail('abc2@gmail.com');
            to1.setUserName('username2');
            tos1.push(to1);
            let tos2 : ZOHOCRMSDK.AssociateEmail.To[]= [];
            let to2 : ZOHOCRMSDK.AssociateEmail.To= new ZOHOCRMSDK.AssociateEmail.To();
            to2.setEmail('abc3@gmail.com');
            to2.setUserName('username3');
            tos2.push(to2);
            associateEmail.setTo(tos);
            associateEmail.setCc(tos1);
            associateEmail.setBcc(tos2);
            associateEmail.setSubject("subject");
            associateEmail.setOriginalMessageId("c6085fae06cbd7b75001d80ffefab46b3c1f5417b2f4325d903d13a5e63af6ce");
            associateEmail.setDateTime(new Date());
            associateEmail.setSent(true);
            associateEmail.setContent('<h3><span style=\\\\\\"background - color:rgb(254, 255, 102)\\\\\\">Mail is of rich text format</span></h3><h3><span style=\\\\\\"background - color:rgb(254, 255, 102)\\\\\\">REGARDS,</span></h3><div><span style=\\\\\\"background - color:rgb(254, 255, 102)\\\\\\">AZ</span></div><div><span style=\\\\\\"background - color:rgb(254, 255, 102)\\\\\\">ADMIN</span></div> <div></div>')
            associateEmail.setMailFormat(new ZOHOCRMSDK.Choice("text"));
            let attachments : ZOHOCRMSDK.AssociateEmail.Attachments[] = [];
            let attachment : ZOHOCRMSDK.AssociateEmail.Attachments = new ZOHOCRMSDK.AssociateEmail.Attachments();
            attachment.setId("csdsfrfjebjhsdehjdvbsbhhsvdvebdedeferfdjwb");
            attachments.push(attachment);
            associateEmail.setAttachments(attachments)
            emails.push(associateEmail);
        }
        request.setEmails(emails);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.AssociateEmail.ActionHandler.MasterModel> = await associateEmailOperations.associate(recordId, module, request);
        if (response != null)
        {
            console.log("Status code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.AssociateEmail.ActionHandler.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.AssociateEmail.ActionWrapper)
            {
                let actionWrapper : ZOHOCRMSDK.AssociateEmail.ActionWrapper= actionHandler;
                let actionsResponses = actionWrapper.getEmails();
                actionsResponses.forEach(actionResponse =>
                {
                    if (actionResponse instanceof ZOHOCRMSDK.AssociateEmail.SuccessResponse)
                    {
                        let successResponse: ZOHOCRMSDK.AssociateEmail.SuccessResponse = actionResponse;
                        console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                        console.log("Code: " + successResponse.getCode().getValue() + "\n");
                        console.log("Details: ");
                        let details : Map<string, any>= successResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key) + "\n");
                            });
                        }
                        console.log("Message: " + successResponse.getMessage());
                    }
                    if (actionResponse instanceof ZOHOCRMSDK.AssociateEmail.APIException)
                    {
                        let exception : ZOHOCRMSDK.AssociateEmail.APIException= actionResponse;
                        console.log("Status: " + exception.getStatus().getValue() + "\n");
                        console.log("Code: " + exception.getCode().getValue() + "\n");
                        console.log("Details: ");
                        let details : Map<string, any>= exception.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key) + "\n");
                            });
                        }
                        console.log("Message: " + exception.getMessage());
                    }
                });
            }
            else if (actionHandler instanceof ZOHOCRMSDK.AssociateEmail.APIException)
            {
                let exception : ZOHOCRMSDK.AssociateEmail.APIException= actionHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " + exception.getMessage());
            }
        }
    }
    public static async initializeAndCall()
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
        await AssociateEmail.associate(BigInt("44028001661043"), "Leads")
    }
}
AssociateEmail.initializeAndCall()