import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetVariableForAPIName
{
    public static async getVariableForAPIName(variableName: string) {
        //example
        //let variableName = "Variable55";
        let variablesOperations: ZOHOCRMSDK.Variables.VariablesOperations = new ZOHOCRMSDK.Variables.VariablesOperations();
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Get Variable for API Name operation */
        // await paramInstance.add(GetVariableForAPINameParam.GROUP, "General");
        //Call getVariableForGroupAPIName method that takes ZOHOCRMSDK.ParameterMap instance and variableName as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Variables.ResponseHandler.MasterModel> = await variablesOperations.getVariableByApiname(variableName, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Variables.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Variables.ResponseWrapper) {
                    let variables: ZOHOCRMSDK.Variables.Variable[] = responseObject.getVariables();
                    variables.forEach(variable => {
                        console.log("Variable ID: " + variable.getId());
                        console.log("Variable APIName: " + variable.getAPIName());
                        console.log("Variable Name: " + variable.getName());
                        console.log("Variable Description: " + variable.getDescription());
                        console.log("Variable Type: " + variable.getType());
                        let variableGroup: ZOHOCRMSDK.Variables.VariableGroup = variable.getVariableGroup();
                        if (variableGroup != null) {
                            console.log("Variable VariableGroup APIName: " + variableGroup.getAPIName());
                            console.log("Variable VariableGroup ID: " + variableGroup.getId());
                        }
                        console.log("Variable Value: " + variable.getValue());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Variables.APIException) {
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
        await GetVariableForAPIName.getVariableForAPIName("new");
    }
}
GetVariableForAPIName.initializeAndCall();
