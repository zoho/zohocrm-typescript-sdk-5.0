import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class CreateVariables
{
    public static async createVariables() {
        let variablesOperations: ZOHOCRMSDK.Variables.VariablesOperations = new ZOHOCRMSDK.Variables.VariablesOperations();
        let request: ZOHOCRMSDK.Variables.BodyWrapper = new ZOHOCRMSDK.Variables.BodyWrapper();
        //Array to hold Variable instances
        let variableArray: ZOHOCRMSDK.Variables.Variable[] = [];
        let variable1: ZOHOCRMSDK.Variables.Variable = new ZOHOCRMSDK.Variables.Variable();
        variable1.setName("Variable551ash");
        variable1.setAPIName("Variable551ash");
        let variableGroup: ZOHOCRMSDK.Variables.VariableGroup = new ZOHOCRMSDK.Variables.VariableGroup();
        variableGroup.setName("General");
        variable1.setVariableGroup(variableGroup);
        variable1.setType(new ZOHOCRMSDK.Choice<string>("integer"));
        variable1.setValue("55");
        variable1.setDescription("This denotes variable 5 description");
        //Add the variable instance to the array
        variableArray.push(variable1);
        // variable1 = new ZOHOCRMSDK.Variables.Variable();
        //
        // variable1.setName("Variable661ash");
        //
        // variable1.setAPIName("Variable661ash");
        //
        // variableGroup = new ZOHOCRMSDK.Variables.VariableGroup();
        //
        // variableGroup.setName("General");
        //
        // variable1.setVariableGroup(variableGroup);
        //
        // variable1.setType(new ZOHOCRMSDK.Choice<string>("text"));
        //
        // variable1.setValue("Hello");
        //
        // variable1.setDescription("This denotes variable 6 description");
        //Add the variable instance to the array
        // variableArray.push(variable2);
        request.setVariables(variableArray);
        //Call createVariables method that takes ZOHOCRMSDK.Variables.BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Variables.ActionHandler.MasterModel> = await variablesOperations.createvariable(request);
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
        await CreateVariables.createVariables();
    }
}
CreateVariables.initializeAndCall();
