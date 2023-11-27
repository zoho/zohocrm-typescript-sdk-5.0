import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DeleteRole
{
    static async deleteRole(id : bigint) {
        let rolesOperations: ZOHOCRMSDK.Roles.RolesOperations = new ZOHOCRMSDK.Roles.RolesOperations();
        let paraminstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paraminstance.add(ZOHOCRMSDK.Roles.DeleteRoleParam.TRANSFER_TO_ID, BigInt("44028001502018"));
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Roles.ActionHandler.MasterModel> = await rolesOperations.deleterole(id, paraminstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Roles.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Roles.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.Roles.ActionResponse.MasterModel[] = responseObject.getRoles();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Roles.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        } else if (actionResponse instanceof ZOHOCRMSDK.Roles.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                    });
                } else if (responseObject instanceof ZOHOCRMSDK.Roles.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
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
        await DeleteRole.deleteRole(BigInt("44028001626023"));
    }
}
DeleteRole.initializeAndCall();
