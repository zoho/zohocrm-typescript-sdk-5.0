import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class History
{
    static async history()
    {
        let backupOperations :ZOHOCRMSDK.Backup.BackupOperations= new ZOHOCRMSDK.Backup.BackupOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Backup.ResponseHandler.MasterModel> = await backupOperations.history(paramInstance);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode());
            if (response.getStatusCode() == 204 || response.getStatusCode() == 304)
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.Backup.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.Backup.HistoryWrapper)
            {
                let historyWrapper : ZOHOCRMSDK.Backup.HistoryWrapper = responseHandler;
                let history : ZOHOCRMSDK.Backup.History[] = historyWrapper.getHistory();
                history.forEach(history1 => {
                    if (history1 instanceof ZOHOCRMSDK.Backup.History)
                    {
                        console.log("HistoryId: " + history1.getId() + "\n");
                        let doneby : ZOHOCRMSDK.Backup.Requester = history1.getDoneBy();
                        if (doneby != null)
                        {
                            console.log("History DoneBy Id : " + doneby.getId() + "\n");
                            console.log("History DoneBy Name : " + doneby.getName() + "\n");
                            console.log("History DoneBy Zuid : " + doneby.getZuid() + "\n");
                        }
                        console.log("History LogTime: " + history1.getLogTime().toString() + "\n");
                        console.log("History State: " + history1.getState() + "\n");
                        console.log("History Action: " + history1.getAction() + "\n");
                        console.log("History RepeatType: " + history1.getRepeatType() + "\n");
                        console.log("History FileName: " + history1.getFileName() + "\n");
                        console.log("History Count: " + history1.getCount() + "\n" );
                    }
                    let info : ZOHOCRMSDK.Backup.Info = historyWrapper.getInfo();
                    if (info != null)
                    {
                        if (info.getPerPage() != null) {
                            console.log("History Info PerPage: " + info.getPerPage().toString());
                        }
                        if (info.getCount() != null) {
                            console.log("History Info Count: " + info.getCount().toString());
                        }
                        if (info.getPage() != null) {
                            console.log("History Info Page: " + info.getPage().toString());
                        }
                        if (info.getMoreRecords() != null) {
                            console.log("History Info MoreRecords: " + info.getMoreRecords().toString());
                        }
                    }
                });
            }
            else if (responseHandler instanceof ZOHOCRMSDK.Backup.APIException)
            {
                let exception : ZOHOCRMSDK.Backup.APIException = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any>= exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " +  exception.getMessage());
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
        await History.history();
    }
}
History.initializeAndCall();
