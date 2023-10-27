import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DeleteContactRoles
{
    public static async deleteContactRoles(contactRoleIds: bigint[]) {
        //example
        //let contactRoleIds = [34096432157002n, 34096431619001n, 340964306883n];
        let contactRolesOperations: ZOHOCRMSDK.ContactRoles.ContactRolesOperations = new ZOHOCRMSDK.ContactRoles.ContactRolesOperations();
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        //Add ids to ParameterMap instance
        for (let contactRoleId of contactRoleIds) {
            await paramInstance.add(ZOHOCRMSDK.ContactRoles.DeleteRolesParam.IDS, contactRoleId);
        }
        //Call deleteContactRoles method that takes paramInstance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ContactRoles.ActionHandler.MasterModel> = await contactRolesOperations.deleteRoles(paramInstance);
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.ContactRoles.ActionHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.ContactRoles.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.ContactRoles.ActionResponse.MasterModel[] = responseObject.getContactRoles();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.ContactRoles.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details !== null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.ContactRoles.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details !== null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.ContactRoles.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details !== null) {
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
        await DeleteContactRoles.deleteContactRoles([BigInt("34323423213")]);
    }
}
DeleteContactRoles.initializeAndCall()
