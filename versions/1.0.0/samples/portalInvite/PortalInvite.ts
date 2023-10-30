import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";

class PortalInvite
{
    static async portalInvite(recordId: bigint, module: string, userTypeId: bigint, type: string)
    {
        let portalInviteOperations : ZOHOCRMSDK.InvitePortal.PortalInviteOperations = new ZOHOCRMSDK.InvitePortal.PortalInviteOperations(module);
        let paraminstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        await paraminstance.add(ZOHOCRMSDK.InvitePortal.InviteUsersParam.TYPE, type);
        await paraminstance.add(ZOHOCRMSDK.InvitePortal.InviteUsersParam.USER_TYPE_ID, userTypeId);
        await paraminstance.add(ZOHOCRMSDK.InvitePortal.InviteUsersParam.LANGUAGE, "en_US");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.InvitePortal.ActionHandler.MasterModel>= await portalInviteOperations.inviteUsers(recordId, paraminstance);
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode());
            let actionHandler : ZOHOCRMSDK.InvitePortal.ActionHandler.MasterModel= response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.InvitePortal.ActionWrapper) {
                let actionWrapper : ZOHOCRMSDK.InvitePortal.ActionWrapper = actionHandler;
                let actionResponses : ZOHOCRMSDK.InvitePortal.ActionResponse.MasterModel[] = actionWrapper.getPortalInvite();
                if (actionResponses != null) {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.InvitePortal.SuccessResponse) {
                            let successResponse : ZOHOCRMSDK.InvitePortal.SuccessResponse = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details: ");
                            let details : Map<string, any>= actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + successResponse.getMessage());
                        }
                        if (actionResponse instanceof ZOHOCRMSDK.InvitePortal.APIException) {
                            let exception : ZOHOCRMSDK.InvitePortal.APIException = actionResponse;
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
            } else if (actionHandler instanceof ZOHOCRMSDK.InvitePortal.APIException) {
                let exception : ZOHOCRMSDK.InvitePortal.APIException= actionHandler;
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
        let recordId : bigint= BigInt("44028001330018");
        let module : string= "Contacts";
        let userTypeId : bigint= BigInt("44028001304019");
        let type : string= "invite";
        await PortalInvite.portalInvite(recordId, module, userTypeId, type);
    }
}
PortalInvite.initializeAndCall();