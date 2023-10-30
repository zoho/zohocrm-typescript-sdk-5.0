import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetMapDependency
{
    static async getMapDependency(layoutId: bigint, module: string, dependencyId: bigint)
    {
        let fieldMapDependencyOperations : ZOHOCRMSDK.DependencyFieldMap.FieldMapDependencyOperations= new ZOHOCRMSDK.DependencyFieldMap.FieldMapDependencyOperations(layoutId, module);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.DependencyFieldMap.ResponseHandler.MasterModel>= await fieldMapDependencyOperations.getMapDependency(dependencyId);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.DependencyFieldMap.ResponseHandler.MasterModel= response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.DependencyFieldMap.BodyWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.DependencyFieldMap.BodyWrapper= responseHandler;
                let mapDependencies : ZOHOCRMSDK.DependencyFieldMap.MapDependency[] = responseWrapper.getMapDependency();
                if (mapDependencies != null) {
                    mapDependencies.forEach(mapDependency => {
                        let parent : ZOHOCRMSDK.DependencyFieldMap.Parent = mapDependency.getParent();
                        if (parent != null) {
                            console.log("MapDependency Parent ID : " + parent.getId() + "\n");
                            console.log("MapDependency Parent APIName : " + parent.getAPIName() + "\n");
                        }
                        let child : ZOHOCRMSDK.DependencyFieldMap.Child = mapDependency.getChild();
                        if (child != null) {
                            console.log("MapDependency child ID : " + child.getId() + "\n");
                            console.log("MapDependency child APIName : " + child.getAPIName() + "\n");
                        }
                        let pickListValues : ZOHOCRMSDK.DependencyFieldMap.PickListMapping[] = mapDependency.getPickListValues();
                        if (pickListValues != null) {
                            pickListValues.forEach(pickListValue => {
                                console.log("MapDependency PickListvalue ID: " + pickListValue.getId() + "\n");
                                console.log("MapDependency PickListvalue ActualValue: " + pickListValue.getActualValue() + "\n");
                                console.log("MapDependency PickListvalue DisplayValue: " + pickListValue.getDisplayValue() + "\n");
                                let pickListMaps : ZOHOCRMSDK.DependencyFieldMap.PicklistMap[] = pickListValue.getMaps();
                                if (pickListMaps != null) {
                                    pickListMaps.forEach(pickListMap => {
                                        console.log("MapDependency PickListValue Map ID : " + pickListMap.getId() + "\n");
                                        console.log("MapDependency PickListValue Map ActualValue : " + pickListMap.getActualValue() + "\n");
                                        console.log("MapDependency PickListValue Map DisplayValue : " + pickListMap.getDisplayValue() + "\n");
                                    });
                                }
                            });
                        }
                        console.log("MapDependency Internal : " + mapDependency.getInternal() + "\n");
                        console.log("MapDependency Active : " + mapDependency.getActive() + "\n");
                        console.log("MapDependency ID : " + mapDependency.getId() + "\n");
                        console.log("MapDependency Source : " + mapDependency.getSource() + "\n");
                        console.log("MapDependency Category : " + mapDependency.getCategory() + "\n");
                    });
                    let info : ZOHOCRMSDK.DependencyFieldMap.Info = responseWrapper.getInfo();
                    if (info != null)
                    {
                        if (info.getPerPage() != null)
                        {
                            console.log("MapDependency INfo PerPage: " + info.getPerPage() + "\n");
                        }
                        if (info.getCount() != null)
                        {
                            console.log("MapDependency INfo Count: " + info.getCount() + "\n");
                        }
                        if (info.getPage() != null)
                        {
                            console.log("MapDependency INfo Page: " + info.getPage() + "\n");
                        }
                        if (info.getMoreRecords() != null)
                        {
                            console.log("MapDependency INfo MoreRecords: " + info.getMoreRecords() + "\n");
                        }
                    }
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.DependencyFieldMap.APIException)
            {
                let exception : ZOHOCRMSDK.DependencyFieldMap.APIException = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any> = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " +  exception.getMessage());
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
        await GetMapDependency.getMapDependency(BigInt("440280167"), "Leads", BigInt("44028001729018"));
    }
}
GetMapDependency.initializeAndCall();
