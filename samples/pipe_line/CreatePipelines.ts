import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class CreatePipelines
{
    static async createPipelines(layoutId: bigint) {
        let pipelineOperations: ZOHOCRMSDK.Pipeline.PipelineOperations = new ZOHOCRMSDK.Pipeline.PipelineOperations(layoutId);
        let pipeline: ZOHOCRMSDK.Pipeline.Pipeline = new ZOHOCRMSDK.Pipeline.Pipeline();
        pipeline.setDisplayValue("GetNotificationDetails");
        pipeline.setDefault(false);
        let pickList: ZOHOCRMSDK.Pipeline.Maps = new ZOHOCRMSDK.Pipeline.Maps();
        pickList.setSequenceNumber(1);
        pickList.setId(BigInt("440280257"));
        pickList.setDisplayValue("Closed Won");
        pipeline.setMaps([pickList]);
        let body: ZOHOCRMSDK.Pipeline.BodyWrapper = new ZOHOCRMSDK.Pipeline.BodyWrapper();
        body.setPipeline([pipeline]);
        //Call createPipelines method that takes BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Pipeline.ActionHandler.MasterModel> = await pipelineOperations.createPipeline(body);
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
        await CreatePipelines.createPipelines(BigInt("440280173"));
    }
}
CreatePipelines.initializeAndCall()