import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class TransferAndDelete
{
    public static async transferAndDelete(layoutId: bigint) {
        let pipelineOperations: ZOHOCRMSDK.Pipeline.PipelineOperations = new ZOHOCRMSDK.Pipeline.PipelineOperations(layoutId);
        let transferAndDeleteWrapper: ZOHOCRMSDK.Pipeline.TransferPipelineWrapper = new ZOHOCRMSDK.Pipeline.TransferPipelineWrapper();
        let transferPipeLine: ZOHOCRMSDK.Pipeline.TransferPipeline = new ZOHOCRMSDK.Pipeline.TransferPipeline();
        let pipeline: ZOHOCRMSDK.Pipeline.TPipeline = new ZOHOCRMSDK.Pipeline.TPipeline();
        pipeline.setFrom(BigInt("44028001627019"));
        pipeline.setTo(BigInt("44028001413033"));
        transferPipeLine.setPipeline(pipeline);
        let stage: ZOHOCRMSDK.Pipeline.Stages = new ZOHOCRMSDK.Pipeline.Stages();
        stage.setFrom(BigInt("440280257"));
        stage.setTo(BigInt("440280257"));
        transferPipeLine.setStages([stage]);
        transferAndDeleteWrapper.setTransferPipeline([transferPipeLine]);
        //Call transferAndDelete method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Pipeline.TransferPipelineActionHandler.MasterModel> = await pipelineOperations.transferPipelines(transferAndDeleteWrapper);
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            let actionWrapper: ZOHOCRMSDK.Pipeline.TransferPipelineActionHandler.MasterModel = response.getObject();
            if (actionWrapper instanceof ZOHOCRMSDK.Pipeline.TransferPipelineActionWrapper) {
                let actionResponses: ZOHOCRMSDK.Pipeline.TransferPipelineActionResponse.MasterModel[] = actionWrapper.getTransferPipeline();
                actionResponses.forEach(actionResponse => {
                    if (actionResponse instanceof ZOHOCRMSDK.Pipeline.TransferPipelineSuccessResponse) {
                        console.log("Status: " + actionResponse.getStatus().getValue());
                        console.log("Code: " + actionResponse.getCode().getValue());
                        console.log("Details");
                        let details : Map<string, any>= actionResponse.getDetails();
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
                        let details : Map<string, any>= actionResponse.getDetails();
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
                let details :Map<string, any>= actionWrapper.getDetails();
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
        await TransferAndDelete.transferAndDelete(BigInt("440280173"));
    }
}
TransferAndDelete.initializeAndCall()
