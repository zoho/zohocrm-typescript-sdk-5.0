import * as ZOHOCRMSDK  from "@zohocrm/typescript-sdk-5.0";
export class CancelMeetings {
    static async cancelmeetings(event_id: bigint){

        let cmo : ZOHOCRMSDK.CancelMeetings.CancelMeetingsOperations = new ZOHOCRMSDK.CancelMeetings.CancelMeetingsOperations(event_id);
        let bodyWrapper : ZOHOCRMSDK.CancelMeetings.BodyWrapper= new ZOHOCRMSDK.CancelMeetings.BodyWrapper();
        let notify : ZOHOCRMSDK.CancelMeetings.Notify = new ZOHOCRMSDK.CancelMeetings.Notify();
        notify.setSendCancellingMail(false);
        let notify_list : ZOHOCRMSDK.CancelMeetings.Notify[]= [];
        notify_list.push(notify);
        bodyWrapper.setData(notify_list);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.CancelMeetings.ActionHandler.MasterModel>= await cmo.cancelMeetings(bodyWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject : ZOHOCRMSDK.CancelMeetings.ActionHandler.MasterModel= response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.CancelMeetings.ActionWrapper) {
                    let actionResponses : ZOHOCRMSDK.CancelMeetings.ActionResponse.MasterModel[] = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.CancelMeetings.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any>= actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.CancelMeetings.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any>= actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.CancelMeetings.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any>= responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage());
                }
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
        let event_id : bigint =BigInt("44028001629041");
        await CancelMeetings.cancelmeetings(event_id);
    }
}
CancelMeetings.initializeAndCall();