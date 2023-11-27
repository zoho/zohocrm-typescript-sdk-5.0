import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetPortal
{
    static async getPortal(portalName: any)
    {
        let portalsOperations  : ZOHOCRMSDK.Portals.PortalsOperations = new ZOHOCRMSDK.Portals.PortalsOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Portals.ResponseHandler.MasterModel>= await portalsOperations.getPortal(portalName);
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode() + '\n');
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.Portals.ResponseHandler.MasterModel= response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.Portals.ResponseWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.Portals.ResponseWrapper = responseHandler;
                let portals : ZOHOCRMSDK.Portals.Portals[] = responseHandler.getPortals();
                if (portals != null)
                {
                    portals.forEach(portal  => {
                        console.log("Portals CreatedTime : " + portal.getCreatedTime().toString() + "\n");
                        console.log("Portals Modifiedtime : " + portal.getModifiedTime().toString() + "\n");
                        let modifiedBy = portal.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Portals Modified User-Id : " + modifiedBy.getId() + "\n");
                            console.log("Portals Modified User-Name : " + modifiedBy.getName() + "\n");
                        }
                        let createdBy = portal.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Portals createdBy User-Id : " + createdBy.getId() + "\n");
                            console.log("Portals createdBy User-Name : " + createdBy.getName() + "\n");
                        }
                        console.log("Portals Zaid : " + portal.getZaid() + "\n");
                        console.log("Portals Name : " + portal.getName() + "\n");
                        console.log("Portals Active : " + portal.getActive() + "\n");
                    });
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.Portals.APIException)
            {
                let exception : ZOHOCRMSDK.Portals.APIException = responseHandler;
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
        await GetPortal.getPortal("PortalsAPItest10");
    }
}
GetPortal.initializeAndCall();
