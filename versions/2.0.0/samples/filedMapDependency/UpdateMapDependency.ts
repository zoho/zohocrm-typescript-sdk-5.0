import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class UpdateMapDependency
{
    static async updateMapDependency(layoutId: bigint, module: string, dependencyId: bigint)
    {
        let fieldMapDependencyOperations : ZOHOCRMSDK.DependencyFieldMap.FieldMapDependencyOperations= new ZOHOCRMSDK.DependencyFieldMap.FieldMapDependencyOperations(layoutId, module);
        let bodyWrapper : ZOHOCRMSDK.DependencyFieldMap.BodyWrapper= new ZOHOCRMSDK.DependencyFieldMap.BodyWrapper();
        let mapDependencies : ZOHOCRMSDK.DependencyFieldMap.MapDependency[] = [];
        let mapDependency : ZOHOCRMSDK.DependencyFieldMap.MapDependency = new ZOHOCRMSDK.DependencyFieldMap.MapDependency();
        let parent : ZOHOCRMSDK.DependencyFieldMap.Parent = new ZOHOCRMSDK.DependencyFieldMap.Parent();
        parent.setAPIName("Stage");
        parent.setId(BigInt('440280887'));
        await mapDependency.setParent(parent);
        let child : ZOHOCRMSDK.DependencyFieldMap.Child = new ZOHOCRMSDK.DependencyFieldMap.Child();
        child.setAPIName("Lead_Source");
        child.setId(BigInt("440280085"));
        await mapDependency.setChild(child);
        let pickListValues : ZOHOCRMSDK.DependencyFieldMap.PickListMapping[] = [];
        let pickListValue : ZOHOCRMSDK.DependencyFieldMap.PickListMapping= new ZOHOCRMSDK.DependencyFieldMap.PickListMapping();
        pickListValue.setDisplayValue("-None-");
        pickListValue.setId(BigInt("440280011340"));
        pickListValue.setActualValue("-None-");
        let pickListMaps : ZOHOCRMSDK.DependencyFieldMap.PicklistMap[] =[];
        let pickListMap : ZOHOCRMSDK.DependencyFieldMap.PicklistMap = new ZOHOCRMSDK.DependencyFieldMap.PicklistMap();
        pickListMap.setId(BigInt("44024011274"));
        pickListMap.setActualValue("Cold Call");
        pickListMap.setDisplayValue("Cold Call");
        pickListMaps.push(pickListMap);
        pickListMap = new ZOHOCRMSDK.DependencyFieldMap.PicklistMap();
        pickListMap.setId(BigInt('40434223542343'));
        pickListMap.setActualValue("-None-");
        pickListMap.setDisplayValue("-None-");
        pickListMaps.push(pickListMap);
        pickListValue.setMaps(pickListMaps);
        pickListValues.push(pickListValue);
        mapDependency.setPickListValues(pickListValues);
        mapDependencies.push(mapDependency);
        bodyWrapper.setMapDependency(mapDependencies);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.DependencyFieldMap.ActionHandler.MasterModel>= await fieldMapDependencyOperations.updateMapDependency(dependencyId, bodyWrapper);
        if (response != null) {
            console.log("Status code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.DependencyFieldMap.ActionHandler.MasterModel= response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.DependencyFieldMap.ActionWrapper) {
                let actionWrapper : ZOHOCRMSDK.DependencyFieldMap.ActionWrapper= actionHandler;
                let actionResponses : ZOHOCRMSDK.DependencyFieldMap.ActionResponse.MasterModel[]= actionWrapper.getMapDependency();
                actionResponses.forEach(actionResponse => {
                    if (actionResponse instanceof ZOHOCRMSDK.DependencyFieldMap.SuccessResponse) {
                        let successResponse : ZOHOCRMSDK.DependencyFieldMap.SuccessResponse = actionResponse;
                        console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                        console.log("Code: " + successResponse.getCode().getValue() + "\n");
                        console.log("Details: ");
                        let details : Map<string,any> = actionResponse.getDetails();
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
                        let details : Map<string, any>= exception.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key) + "\n");
                            });
                        }
                        console.log("Message: " + exception.getMessage());
                    }
                });
            } else if (actionHandler instanceof ZOHOCRMSDK.DependencyFieldMap.APIException) {
                let exception : ZOHOCRMSDK.DependencyFieldMap.APIException = actionHandler;
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
    static async initializeAndCall()
    {
        let environment: ZOHOCRMSDK.Environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
        let token : ZOHOCRMSDK.OAuthToken = new ZOHOCRMSDK.OAuthBuilder()
            .clientId("client_id")
            .clientSecret("client_secret")
            .refreshToken("refreshToken")
            .build();
        await (await new ZOHOCRMSDK.InitializeBuilder())
            .environment(environment)
            .token(token)
            .initialize();
        await UpdateMapDependency.updateMapDependency(BigInt("423423423"), "Leads", BigInt("323423423234"));
    }
}
UpdateMapDependency.initializeAndCall();