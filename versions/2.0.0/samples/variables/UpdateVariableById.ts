import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateVariableById
{
    public static async updateVariableById(variableId: bigint) {
        //example
        //let variableId = 34096432275025n;
        let variablesOperations: ZOHOCRMSDK.Variables.VariablesOperations = new ZOHOCRMSDK.Variables.VariablesOperations();
        let request: ZOHOCRMSDK.Variables.BodyWrapper = new ZOHOCRMSDK.Variables.BodyWrapper();
        //Array to hold Variable instances
        let variableArray: ZOHOCRMSDK.Variables.Variable[] = [];
        let variable1: ZOHOCRMSDK.Variables.Variable = new ZOHOCRMSDK.Variables.Variable();
        variable1.setAPIName("TestAPIName");
        //Add the instance to the array
        variableArray.push(variable1);
        request.setVariables(variableArray);
        //Call updateVariableById method that takes ZOHOCRMSDK.Variables.BodyWrapper instance and variableId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Variables.ActionHandler.MasterModel> = await variablesOperations.updateVariableById(variableId, request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Variables.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Variables.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.Variables.ActionResponse.MasterModel[] = responseObject.getVariables();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Variables.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.Variables.APIException) {
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
        await UpdateVariableById.updateVariableById(BigInt("44028001501020"));
    }
}
UpdateVariableById.initializeAndCall();
