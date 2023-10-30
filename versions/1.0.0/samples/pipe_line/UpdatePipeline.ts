import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdatePipeline
{
    static async updatePipeline(layoutId: bigint, pipelineId: bigint) {
        let pipelineOperations: ZOHOCRMSDK.Pipeline.PipelineOperations = new ZOHOCRMSDK.Pipeline.PipelineOperations(layoutId);
        let pipeline: ZOHOCRMSDK.Pipeline.Pipeline = new ZOHOCRMSDK.Pipeline.Pipeline();
        pipeline.setDisplayValue("Pipeline2");
        let pickList = new ZOHOCRMSDK.Pipeline.Maps();
        pickList.setId(BigInt("440280257"));
        pickList.setSequenceNumber(1);
        pipeline.setMaps([pickList]);
        let body = new ZOHOCRMSDK.Pipeline.BodyWrapper();
        body.setPipeline([pipeline]);
        //Call updatePipeline method that takes BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Pipeline.ActionHandler.MasterModel> = await pipelineOperations.updatePipeline(pipelineId, body);
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            let actionWrapper: ZOHOCRMSDK.Pipeline.ActionHandler.MasterModel = response.getObject();
            if (actionWrapper instanceof ZOHOCRMSDK.Pipeline.ActionWrapper) {
                let actionResponses: ZOHOCRMSDK.Pipeline.ActionResponse.MasterModel[] = actionWrapper.getPipeline();
                actionResponses.forEach(actionResponse => {
                    if (actionResponse instanceof ZOHOCRMSDK.Pipeline.SuccessResponse) {
                        console.log("Status: " + actionResponse.getStatus().getValue());
                        console.log("Code: " + actionResponse.getCode().getValue());
                        console.log("Details: ");
                        let details = actionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + actionResponse.getMessage());
                    }
                    else if (actionResponse instanceof ZOHOCRMSDK.Pipeline.APIException) {
                        console.log("Status: " + actionResponse.getStatus().getValue());
                        console.log("Code: " + actionResponse.getCode().getValue());
                        console.log("Details");
                        let details = actionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + actionResponse.getMessage());
                    }
                });
            }
            else if (actionWrapper instanceof ZOHOCRMSDK.Pipeline.APIException) {
                console.log("Status: " + actionWrapper.getStatus().getValue());
                console.log("Code: " + actionWrapper.getCode().getValue());
                console.log("Details");
                let details = actionWrapper.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + actionWrapper.getMessage());
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
        await UpdatePipeline.updatePipeline(BigInt("440280173"), BigInt("44028001627019"));
    }
}
UpdatePipeline.initializeAndCall()