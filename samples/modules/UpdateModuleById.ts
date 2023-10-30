import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateModuleById
{
    public static async updateModuleById(moduleId: bigint) {
        //example
        //moduleId = 3409643252001n
        let modulesOperations: ZOHOCRMSDK.Modules.ModulesOperations = new ZOHOCRMSDK.Modules.ModulesOperations();
        let modulesArray: ZOHOCRMSDK.Modules.Modules[] = [];
        let profilesArray: ZOHOCRMSDK.Profiles.MinifiedProfile[] = [];
        let profile: ZOHOCRMSDK.Profiles.MinifiedProfile = new ZOHOCRMSDK.Profiles.MinifiedProfile();
        let module: ZOHOCRMSDK.Modules.Modules = new ZOHOCRMSDK.Modules.Modules();
        profile.setId(BigInt("440280031160"));
        // profile.setDelete(true);
        //Add the Profile instance to the array.
        profilesArray.push(profile);
        module.setProfiles(profilesArray);
        //Add the Module instance to the array
        modulesArray.push(module);
        let request: ZOHOCRMSDK.Modules.BodyWrapper = new ZOHOCRMSDK.Modules.BodyWrapper();
        request.setModules(modulesArray);
        //Call updateModuleById method that takes BodyWrapper instance and moduleAPIName as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Modules.ActionHandler.MasterModel> = await modulesOperations.updateModule(moduleId, request);
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
        await UpdateModuleById.updateModuleById(BigInt("440280037"));
    }
}
UpdateModuleById.initializeAndCall()
