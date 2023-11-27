import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";

export class GetDetails
{
    static async getDetails()
    {
        let backupOperations : ZOHOCRMSDK.Backup.BackupOperations = new ZOHOCRMSDK.Backup.BackupOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Backup.ResponseHandler.MasterModel> = await backupOperations.getDetails();
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if (response.getStatusCode() == 204 || response.getStatusCode() == 304)
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responsehandler : ZOHOCRMSDK.Backup.ResponseHandler.MasterModel= response.getObject();
            if (responsehandler instanceof ZOHOCRMSDK.Backup.BodyWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.Backup.BodyWrapper = responsehandler;
                let backup : ZOHOCRMSDK.Backup.Backup = responseWrapper.getBackup();
                if (backup != null)
                {
                    console.log("Backup Rrule: " + backup.getRrule() + "\n");
                    console.log("Backup Id: " + backup.getId() + "\n");
                    console.log("Backup StartDate: " + backup.getStartDate().toDateString() + "\n");
                    console.log("Backup ScheduledDate: " + backup.getScheduledDate().toDateString() + "\n");
                    console.log("Backup Status: " + backup.getStatus() + "\n");
                    let requester = backup.getRequester();
                    if (requester != null)
                    {
                        console.log("Backup Requester Id: " + requester.getId() + "\n");
                        console.log("Backup Requester Name: " + requester.getName() + "\n");
                        console.log("Backup Requester Zuid: " + requester.getZuid() + "\n");

                    }
                }
            }
            else if (responsehandler instanceof ZOHOCRMSDK.Backup.APIException)
            {
                let exception : ZOHOCRMSDK.Backup.APIException = responsehandler;
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
        }
    }
    static async initializeAndCall(){
        let environment : ZOHOCRMSDK.Environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
        let token: ZOHOCRMSDK.OAuthToken =(new ZOHOCRMSDK.OAuthBuilder())
            .clientId("client_id")
            .clientSecret("client_secret")
            .refreshToken("refreshToken")
            .build();
        await (await new ZOHOCRMSDK.InitializeBuilder())
            .environment(environment)
            .token(token)
            .initialize();
        await GetDetails.getDetails();
    }
}
GetDetails.initializeAndCall();
