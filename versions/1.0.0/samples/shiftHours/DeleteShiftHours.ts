import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class DeleteShiftHours
{
    static async deleteShiftHours(id: bigint){
        let shiftHoursOperations : ZOHOCRMSDK.HoursShift.ShiftHoursOperations= new ZOHOCRMSDK.HoursShift.ShiftHoursOperations("");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.HoursShift.ActionHandler.MasterModel>= await shiftHoursOperations.deleteShiftHour(id);
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.HoursShift.ActionHandler.MasterModel= response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.HoursShift.ActionWrapper)
            {
                let actionWrapper : ZOHOCRMSDK.HoursShift.ActionWrapper = actionHandler;
                let actionResponses : ZOHOCRMSDK.HoursShift.ActionResponse.MasterModel[] = actionWrapper.getShiftHours();
                if (actionResponses != null)
                {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.HoursShift.SuccessResponse)
                        {
                            let successResponse : ZOHOCRMSDK.HoursShift.SuccessResponse = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details  \n");
                            let details : Map<string, any>  = successResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + successResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.HoursShift.APIException)
                        {
                            let exception : ZOHOCRMSDK.HoursShift.APIException = actionResponse;
                            console.log("Status: " + exception.getStatus().getValue() +"\n");
                            console.log("Code: " + exception.getCode().getValue() + "\n");
                            console.log("Details \n");
                            let details : Map<string, any> = exception.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " +  exception.getMessage());
                        }
                    });
                }
            }
            else if (actionHandler instanceof ZOHOCRMSDK.HoursShift.APIException)
            {
                let exception :ZOHOCRMSDK.HoursShift.APIException = actionHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details \n");
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
        await DeleteShiftHours.deleteShiftHours(BigInt("44028001729028"));
    }
}
DeleteShiftHours.initializeAndCall();
