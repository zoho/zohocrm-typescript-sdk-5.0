import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class Cancel
{
    static async cancel(id:bigint)
    {
        let backupOperations : ZOHOCRMSDK.Backup.BackupOperations= new ZOHOCRMSDK.Backup.BackupOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Backup.ActionHandler.MasterModel> = await backupOperations.cancel(id);
        if (response != null)
        {
            console.log("Status code : " + response.getStatusCode() + "\n");
            let actionHandler = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.Backup.ActionWrapper)
            {
                let actionWrapper = actionHandler;
                let actionResponse = actionWrapper.getBackup();
                if (actionResponse instanceof ZOHOCRMSDK.Backup.SuccessResponse)
                {
                    let successResponse = actionResponse;
                    console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                    console.log("Code: " + successResponse.getCode().getValue() + "\n");
                    console.log("Details: ");
                    let details : Map<string, any>  = actionResponse.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key) + "\n");
                        });
                    }
                    console.log("Message: " + successResponse.getMessage());
                }
                if (actionResponse instanceof ZOHOCRMSDK.Backup.APIException)
                {
                    let exception = actionResponse;
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
                let exception = actionHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any> = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " +  exception.getMessage());
            }
        }
    }
    public static async initializeAndCall()
    {
        let environment: ZOHOCRMSDK.Environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
        let token : ZOHOCRMSDK.OAuthToken = new ZOHOCRMSDK.OAuthBuilder()
            .clientId("client_id")
            .clientSecret("client_sercet")
            .grantToken("grant_token")
            .build();
        await (await new ZOHOCRMSDK.InitializeBuilder())
            .environment(environment)
            .token(token)
            .initialize();
        await Cancel.cancel(BigInt("324234234"));
    }
}
Cancel.initializeAndCall()