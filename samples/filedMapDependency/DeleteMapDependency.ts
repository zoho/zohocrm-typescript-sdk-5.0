import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DeleteMapDependency
{
    static async deleteMapDependency(layoutId: bigint, module: string, dependencyId: bigint)
    {
        let fieldMapDependencyOperations : ZOHOCRMSDK.DependencyFieldMap.FieldMapDependencyOperations = new ZOHOCRMSDK.DependencyFieldMap.FieldMapDependencyOperations(layoutId, module)
        {
            let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.DependencyFieldMap.ActionHandler.MasterModel> = await fieldMapDependencyOperations.deleteMapDependency(dependencyId);
            if (response != null)
            {
                console.log("Status code : " + response.getStatusCode() + "\n");
                let actionHandler : ZOHOCRMSDK.DependencyFieldMap.ActionHandler.MasterModel = response.getObject();
                if (actionHandler instanceof ZOHOCRMSDK.DependencyFieldMap.ActionWrapper) {
                    let actionWrapper : ZOHOCRMSDK.DependencyFieldMap.ActionWrapper = actionHandler;
                    let actionResponses :  ZOHOCRMSDK.DependencyFieldMap.ActionResponse.MasterModel[] = actionWrapper.getMapDependency();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.DependencyFieldMap.SuccessResponse) {
                            let successResponse : ZOHOCRMSDK.DependencyFieldMap.SuccessResponse = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details: ");
                            let details : Map<string, any>= actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + successResponse.getMessage());
                        }
                        if (actionResponse instanceof ZOHOCRMSDK.DependencyFieldMap.APIException) {
                            let exception : ZOHOCRMSDK.DependencyFieldMap.APIException = actionResponse;
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
                    });
                } else if (actionHandler instanceof ZOHOCRMSDK.DependencyFieldMap.APIException) {
                    let exception : ZOHOCRMSDK.DependencyFieldMap.APIException= actionHandler;
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
        let layoutId : bigint= BigInt("440280167");
        let module : string= "leads";
        let dependencyId : bigint= BigInt("44028001729014");
        await DeleteMapDependency.deleteMapDependency(layoutId, module, dependencyId);    }
}
DeleteMapDependency.initializeAndCall();
