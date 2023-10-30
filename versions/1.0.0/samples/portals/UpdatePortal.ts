import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class UpdatePortal
{
    static async updatePortal(portalName: any)
    {
        let portalsOperations : ZOHOCRMSDK.Portals.PortalsOperations= new ZOHOCRMSDK.Portals.PortalsOperations();
        let bodyWrapper : ZOHOCRMSDK.Portals.BodyWrapper= new ZOHOCRMSDK.Portals.BodyWrapper();
        let portals : ZOHOCRMSDK.Portals.Portals[] = [];
        let portal = new ZOHOCRMSDK.Portals.Portals();
        portal.setName("PortalAPITest101");
        portals.push(portal);
        bodyWrapper.setPortals(portals);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Portals.ActionHandler.MasterModel> = await portalsOperations.updatePortal(portalName, bodyWrapper);
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.Portals.ActionHandler.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.Portals.ActionWrapper) {
                let actionWrapper : ZOHOCRMSDK.Portals.ActionWrapper = actionHandler;
                let actionResponses : ZOHOCRMSDK.Portals.ActionResponse.MasterModel[] = actionWrapper.getPortals();
                if (actionResponses != null) {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Portals.SuccessResponse) {
                            let successResponse : ZOHOCRMSDK.Portals.SuccessResponse  = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details: ");
                            let details : Map<string, any> = successResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + successResponse.getMessage());
                        }
                        if (actionResponse instanceof ZOHOCRMSDK.Portals.APIException) {
                            let exception : ZOHOCRMSDK.Portals.APIException = actionResponse;
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
                    });
                }
            } else if (actionHandler instanceof ZOHOCRMSDK.Portals.APIException) {
                let exception : ZOHOCRMSDK.Portals.APIException = actionHandler;
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
        await UpdatePortal.updatePortal("PortalsAPItest10");
    }
}
UpdatePortal.initializeAndCall();
