import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetPipeline
{
    static async getPipeline(layoutId: bigint, pipelineId: bigint) {
        let pipelineOperations: ZOHOCRMSDK.Pipeline.PipelineOperations = new ZOHOCRMSDK.Pipeline.PipelineOperations(layoutId);
        //Call getPipeline method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Pipeline.ResponseHandler.MasterModel> = await pipelineOperations.getPipeline(pipelineId);
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseWrapper: ZOHOCRMSDK.Pipeline.ResponseHandler.MasterModel = response.getObject();
            if (responseWrapper instanceof ZOHOCRMSDK.Pipeline.BodyWrapper) {
                let pipelines: ZOHOCRMSDK.Pipeline.Pipeline[] = responseWrapper.getPipeline();
                pipelines.forEach(pipeline => {
                    console.log("Pipeline Id: " + pipeline.getId());
                    console.log("Pipeline DisplayValue: " + pipeline.getDisplayValue());
                    console.log("Pipeline Maps ActualValue: " + pipeline.getActualValue());
                    console.log("Pipeline Default: " + pipeline.getDefault());
                    console.log("Pipeline ChildAvailable  : " + pipeline.getChildAvailable());
                    let parent: ZOHOCRMSDK.Pipeline.Pipeline = pipeline.getParent();
                    if (parent != null) {
                        console.log("Pipeline parent ID: " + parent.getId());
                    }
                    let maps: ZOHOCRMSDK.Pipeline.Maps[] = pipeline.getMaps();
                    if (maps != null) {
                        maps.forEach(map => {
                            console.log("Pipeline Maps ActualValue: " + map.getActualValue());
                            console.log("PickListValue Delete" + map.getDelete());
                            console.log("Pipeline Maps DisplayValue: " + map.getDisplayValue());
                            let forecastCategory: ZOHOCRMSDK.Pipeline.ForecastCategory = map.getForecastCategory();
                            if (forecastCategory != null) {
                                console.log("Pipeline Maps ForecastCategory Name: " + forecastCategory.getName());
                                console.log("Pipeline Maps ForecastCategory Id: " + forecastCategory.getId());
                            }
                            console.log("Pipeline Maps ForecastType: " + map.getForecastType());
                            console.log("Pipeline Maps Id: " + map.getId());
                            console.log("Pipeline Maps SequenceNumber: " + map.getSequenceNumber());
                        });
                    }
                });
            }
            else if (responseWrapper instanceof ZOHOCRMSDK.Pipeline.APIException) {
                console.log("Status: " + responseWrapper.getStatus().getValue());
                console.log("Code: " + responseWrapper.getCode().getValue());
                console.log("Details");
                let details = responseWrapper.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseWrapper.getMessage());
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
        await GetPipeline.getPipeline(BigInt("440280173"), BigInt("44028001627019"));
    }
}
GetPipeline.initializeAndCall()
