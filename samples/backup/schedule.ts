import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class Schedule
{

    static async schedule()
    {
        let backupOperations  : ZOHOCRMSDK.Backup.BackupOperations= new ZOHOCRMSDK.Backup.BackupOperations();
        let bodyWrapper :ZOHOCRMSDK.Backup.BodyWrapper = new ZOHOCRMSDK.Backup.BodyWrapper();
        let backup : ZOHOCRMSDK.Backup.Backup= new ZOHOCRMSDK.Backup.Backup();
        backup.setRrule("RRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=1TH");
        await bodyWrapper.setBackup(backup);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Backup.ActionHandler.MasterModel> = await backupOperations.schedule(bodyWrapper);
        if (response != null)
        {
            console.log("Status code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.Backup.ActionHandler.MasterModel= response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.Backup.ActionWrapper)
            {
                let actionWrapper : ZOHOCRMSDK.Backup.ActionWrapper = actionHandler;
                let actionResponse : ZOHOCRMSDK.Backup.ActionResponse.MasterModel = actionWrapper.getBackup();
                if (actionResponse instanceof ZOHOCRMSDK.Backup.SuccessResponse)
                {
                    let successResponse : ZOHOCRMSDK.Backup.SuccessResponse= actionResponse;
                    console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                    console.log("Code: " + successResponse.getCode().getValue() + "\n");
                    console.log("Details: ");
                    let details : Map<string, any> = actionResponse.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key) + "\n");
                        });
                    }
                    console.log("Message: " + successResponse.getMessage());
                }
                if (actionResponse instanceof ZOHOCRMSDK.Backup.APIException)
                {
                    let exception : ZOHOCRMSDK.Backup.APIException = actionResponse;
                    console.log("Status: " + exception.getStatus().getValue() + "\n");
                    console.log("Code: " + exception.getCode().getValue() + "\n");
                    console.log("Details: ");
                    let details : Map<string, any> = exception.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key) + "\n");
                        });
                    }
                    console.log("Message: " + exception.getMessage());
                }
            }
            else if (actionHandler instanceof ZOHOCRMSDK.Backup.APIException)
            {
                let exception : ZOHOCRMSDK.Backup.APIException = actionHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any> = exception.getDetails();
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
        await Schedule.schedule();
    }
}
Schedule.initializeAndCall();
