import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetEmailTemplateById
{
    static async getEmailTemplateById(Id: bigint) {
        let emailTemplatesOperations: ZOHOCRMSDK.EmailTemplates.EmailTemplatesOperations = new ZOHOCRMSDK.EmailTemplates.EmailTemplatesOperations();
        //Call getEmailTemplateById method that takes Id as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.EmailTemplates.ResponseHandler.MasterModel> = await emailTemplatesOperations.getEmailTemplate(Id);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler: ZOHOCRMSDK.EmailTemplates.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.EmailTemplates.ResponseWrapper) {
                let responseWrapper : ZOHOCRMSDK.EmailTemplates.ResponseWrapper = responseHandler;
                let emailTemplates: ZOHOCRMSDK.EmailTemplates.EmailTemplate[] = responseWrapper.getEmailTemplates();
                emailTemplates.forEach(emailTemplate => {
                    console.log("EmailTemplate CreatedTime: " + emailTemplate.getCreatedTime());
                    let attachments: ZOHOCRMSDK.EmailTemplates.Attachment[] = emailTemplate.getAttachments();
                    if (attachments != null) {
                        attachments.forEach(attachment => {
                            console.log("Attachment Size: " + attachment.getSize());
                            console.log("Attachment FileId: " + attachment.getFileId());
                            console.log("Attachment FileName: " + attachment.getFileName());
                            console.log("Attachment ID: " + attachment.getId());
                        });
                    }
                    console.log("EmailTemplate Subject: " + emailTemplate.getSubject());
                    let module: ZOHOCRMSDK.Modules.MinifiedModule = emailTemplate.getModule();
                    if (module != null) {
                        console.log("EmailTemplate Module Name : " + module.getAPIName());
                        console.log("EmailTemplate Module Id : " + module.getId());
                    }
                    console.log("EmailTemplate Type: " + emailTemplate.getType());
                    let createdBy: ZOHOCRMSDK.Users.MinifiedUser = emailTemplate.getCreatedBy();
                    if (createdBy != null) {
                        console.log("EmailTemplate Created By User-ID: " + createdBy.getId());
                        console.log("EmailTemplate Created By User-Name: " + createdBy.getName());
                        console.log("EmailTemplate Created By User-Email: " + createdBy.getEmail());
                    }
                    console.log("EmailTemplate ModifiedTime: " + emailTemplate.getModifiedTime());
                    let folder: ZOHOCRMSDK.InventoryTemplates.Folder = emailTemplate.getFolder();
                    if (folder != null) {
                        console.log("EmailTemplate Folder Id: " + folder.getId());
                        console.log("EmailTemplate Folder Name: " + folder.getName());
                    }
                    console.log("EmailTemplate LastUsageTime: " + emailTemplate.getLastUsageTime());
                    console.log("EmailTemplate Associated: " + emailTemplate.getAssociated());
                    console.log("EmailTemplate Name: " + emailTemplate.getName());
                    console.log("EmailTemplate ConsentLinked: " + emailTemplate.getConsentLinked());
                    let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = emailTemplate.getModifiedBy();
                    if (modifiedBy != null) {
                        console.log("EmailTemplate Modified By User-ID: " + modifiedBy.getId());
                        console.log("EmailTemplate Modified By user-Name: " + modifiedBy.getName());
                        console.log("EmailTemplate Modified By User-Email: " + modifiedBy.getEmail());
                    }
                    console.log("EmailTemplate ID: " + emailTemplate.getId());
                    console.log("EmailTemplate Content: " + emailTemplate.getContent());
                    console.log("EmailTemplate Description: " + emailTemplate.getDescription());
                    console.log("EmailTemplate EditorMode: " + emailTemplate.getEditorMode());
                    console.log("EmailTemplate Favorite: " + emailTemplate.getFavorite());
                    console.log("EmailTemplate Subject: " + emailTemplate.getSubject());
                });
            }
            else if (responseHandler instanceof ZOHOCRMSDK.EmailTemplates.APIException) {
                console.log("Status: " + responseHandler.getStatus().getValue());
                console.log("Code: " + responseHandler.getCode().getValue());
                console.log("Details");
                let details = responseHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseHandler.getMessage());
            }
        }
    }
    static async initializeAndCall(){
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
        await GetEmailTemplateById.getEmailTemplateById(BigInt("440280627040"));
    }
}
GetEmailTemplateById.initializeAndCall()