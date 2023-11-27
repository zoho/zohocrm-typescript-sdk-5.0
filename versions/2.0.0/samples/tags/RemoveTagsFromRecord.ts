import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class RemoveTagsFromRecord
{
    public static async removeTagsFromRecord(moduleAPIName: string, recordId: bigint) {
        //example
        // let moduleAPIName = "Leads";
        // let recordId = 34096432157023n;
        // let tagNames = ["addtag1,addtag12"];
        let tagsOperations : ZOHOCRMSDK.Tags.TagsOperations= new ZOHOCRMSDK.Tags.TagsOperations();
        let request: ZOHOCRMSDK.Tags.ExistingTagRequestWrapper = new ZOHOCRMSDK.Tags.ExistingTagRequestWrapper();
        let tagList : ZOHOCRMSDK.Tags.ExistingTag[] = [];
        let tag1 : ZOHOCRMSDK.Tags.ExistingTag = new ZOHOCRMSDK.Tags.ExistingTag();
        tag1.setName("tagNam3e3e12345");
        tagList.push(tag1);
        request.setTags(tagList);
        //Call removeTagsFromRecord method that takes paramInstance, moduleAPIName and recordId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Tags.RecordActionHandler.MasterModel> = await tagsOperations.removeTags(recordId, moduleAPIName, request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Tags.RecordActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Tags.RecordActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.Tags.RecordActionResponse.MasterModel[] = responseObject.getData();
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
        let moduleAPIName : string= "leads";
        let recordId: bigint = BigInt("12121");
        await RemoveTagsFromRecord.removeTagsFromRecord(moduleAPIName, recordId);
    }
}
RemoveTagsFromRecord.initializeAndCall()
