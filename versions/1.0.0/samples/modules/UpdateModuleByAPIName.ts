import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateModuleByAPIName
{
    public static async updateModuleByAPIName(moduleAPIName: string) {
        //example
        //let moduleAPIName = "Leads";
        let modulesOperations: ZOHOCRMSDK.Modules.ModulesOperations = new ZOHOCRMSDK.Modules.ModulesOperations();
        let modulesArray: ZOHOCRMSDK.Modules.Modules[] = [];
        let profilesArray: ZOHOCRMSDK.Profiles.MinifiedProfile[] = [];
        let profile: ZOHOCRMSDK.Profiles.MinifiedProfile = new ZOHOCRMSDK.Profiles.MinifiedProfile();
        profile.setId(BigInt("3477061026014"));
        //Add Profile instance to the array
        profilesArray.push(profile);
        let module: ZOHOCRMSDK.Modules.Modules = new ZOHOCRMSDK.Modules.Modules();
        module.setProfiles(profilesArray);
        //Add the Module instance to array
        modulesArray.push(module);
        let request: ZOHOCRMSDK.Modules.BodyWrapper = new ZOHOCRMSDK.Modules.BodyWrapper();
        request.setModules(modulesArray);
        //Call updateModuleByAPIName method that takes BodyWrapper instance and moduleAPIName as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Modules.ActionHandler.MasterModel> = await modulesOperations.updateModuleByAPIName(moduleAPIName, request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Modules.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Modules.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.Modules.ActionResponse.MasterModel[] = responseObject.getModules();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Modules.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.Modules.APIException) {
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
                else if (responseObject instanceof ZOHOCRMSDK.Modules.APIException) {
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
        await UpdateModuleByAPIName.updateModuleByAPIName("Leads");
    }
}
UpdateModuleByAPIName.initializeAndCall()
