import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class CreateRoles
{
    static async createRoles()
    {
        let rolesOperations : ZOHOCRMSDK.Roles.RolesOperations = new ZOHOCRMSDK.Roles.RolesOperations();
        let bodyWrapper : ZOHOCRMSDK.Roles.BodyWrapper = new ZOHOCRMSDK.Roles.BodyWrapper();
        let roles : ZOHOCRMSDK.Roles.Role[] = [];
        let role : ZOHOCRMSDK.Roles.Role = new ZOHOCRMSDK.Roles.Role();
        role.setName("SDK Manager");
        let reportingTo: ZOHOCRMSDK.Roles.ReportingTo  = new ZOHOCRMSDK.Roles.ReportingTo();
        reportingTo.setId(BigInt("44028001502018"));
        await role.setReportingTo(reportingTo);
        role.setDescription("Manage Resources");
        role.setShareWithPeers(false);
        roles.push(role);
        bodyWrapper.setRoles(roles);
        let response:ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Roles.ActionHandler.MasterModel> = await rolesOperations.createRoles(bodyWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject : ZOHOCRMSDK.Roles.ActionHandler.MasterModel= response.getObject();
            if (responseObject != null) {
                if(responseObject instanceof ZOHOCRMSDK.Roles.ActionWrapper) {
                    let actionResponses :  ZOHOCRMSDK.Roles.ActionResponse.MasterModel[] = responseObject.getRoles();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Roles.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.Roles.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Roles.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any> = responseObject.getDetails();
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
        await CreateRoles.createRoles();
    }
}
CreateRoles.initializeAndCall();
