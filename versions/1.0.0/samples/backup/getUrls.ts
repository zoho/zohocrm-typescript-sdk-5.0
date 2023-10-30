import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetUrls
{
    static async getUrls()
    {
        let backupOperations : ZOHOCRMSDK.Backup.BackupOperations = new ZOHOCRMSDK.Backup.BackupOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Backup.ResponseHandler.MasterModel>  = await backupOperations.getUrls();
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if (response.getStatusCode() == 204 || response.getStatusCode() == 304)
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.Backup.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.Backup.UrlsWrapper)
            {
                let responseWrapper: ZOHOCRMSDK.Backup.UrlsWrapper = responseHandler;
                let urls : ZOHOCRMSDK.Backup.Urls = responseWrapper.getUrls();
                if (urls != null)
                {
                    let dataLinks : string[] = urls.getDataLinks();
                    if (dataLinks != null)
                    {
                        console.log("Urls DataLinks: " + "\n");
                        dataLinks.forEach(dataLink => {
                            console.log(dataLink + "\n");
                        });
                    }
                    let attachmentLinks : string[] = urls.getAttachmentLinks();
                    if (attachmentLinks != null)
                    {
                        console.log("Urls attachmeents: " + "\n");
                        attachmentLinks.forEach(attachmentLink => {
                            console.log(attachmentLink + "\n");
                        });
                    }
                    console.log("Urls ExpiryDate: " + urls.getExpiryDate().toDateString());
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.Backup.APIException)
            {
                let exception : ZOHOCRMSDK.Backup.APIException= responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string,any>= exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " + exception.getMessage());
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
        await GetUrls.getUrls();
    }
}
GetUrls.initializeAndCall();
