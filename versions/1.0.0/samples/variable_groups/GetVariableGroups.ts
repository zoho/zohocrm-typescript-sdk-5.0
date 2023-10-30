import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetVariableGroups
{
    public static async getVariableGroups() {
        let variableGroupsOperations: ZOHOCRMSDK.GroupsVariable.VariableGroupsOperations = new ZOHOCRMSDK.GroupsVariable.VariableGroupsOperations();
        //Call getVariableGroups method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.GroupsVariable.ResponseHandler.MasterModel> = await variableGroupsOperations.getVariableGroups();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.GroupsVariable.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.GroupsVariable.ResponseWrapper) {
                    let variableGroups: ZOHOCRMSDK.GroupsVariable.VariableGroup[] = responseObject.getVariableGroups();
                    variableGroups.forEach(variableGroup => {
                        console.log("VariableGroup DisplayLabel: " + variableGroup.getDisplayLabel());
                        console.log("VariableGroup APIName: " + variableGroup.getAPIName());
                        console.log("VariableGroup Name: " + variableGroup.getName());
                        console.log("VariableGroup Description: " + variableGroup.getDescription());
                        console.log("VariableGroup ID: " + variableGroup.getId());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.GroupsVariable.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage().getValue());
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
        await GetVariableGroups.getVariableGroups();
    }
}
GetVariableGroups.initializeAndCall();
