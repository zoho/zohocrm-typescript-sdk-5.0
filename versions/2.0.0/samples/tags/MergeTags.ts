import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class MergeTags
{
    public static async mergeTags(tagId: bigint, conflictId: string) {
        //example
        //let tagId = 3409643661047n;
        //let conflictId = "3409643661026";
        let tagsOperations: ZOHOCRMSDK.Tags.TagsOperations = new ZOHOCRMSDK.Tags.TagsOperations();
        let request: ZOHOCRMSDK.Tags.MergeWrapper = new ZOHOCRMSDK.Tags.MergeWrapper();
        //Array to hold ConflictWrapper instances
        let tagsArray: ZOHOCRMSDK.Tags.ConflictWrapper[] = [];
        let conflictWrapper: ZOHOCRMSDK.Tags.ConflictWrapper = new ZOHOCRMSDK.Tags.ConflictWrapper();
        conflictWrapper.setConflictId(conflictId);
        //Add the instance to array
        tagsArray.push(conflictWrapper);
        request.setTags(tagsArray);
        //Call mergeTags method that takes MergeWrapper instance and tag id as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Tags.ActionHandler.MasterModel> = await tagsOperations.mergeTags(tagId, request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Tags.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.Tags.ActionResponse.MasterModel[] = responseObject.getTags();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Tags.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.Tags.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Tags.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }
    static async initializeAndCall() {
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
        let tagId : bigint = BigInt("44028001626096");
        let conflictId : string = "44028001631104";
        await MergeTags.mergeTags(tagId, conflictId);
    }
}
MergeTags.initializeAndCall();
