import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetRecordCountForTag
{
    public static async getRecordCountForTag(moduleAPIName: string, tagId: bigint) {
        //example
        // let moduleAPIName = "Leads";
        // let tagId = 3409643661047n;
        let tagsOperations: ZOHOCRMSDK.Tags.TagsOperations = new ZOHOCRMSDK.Tags.TagsOperations();
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Get Record Count operation */
        await paramInstance.add(ZOHOCRMSDK.Tags.GetRecordCountForTagParam.MODULE, moduleAPIName);
        //Call getRecordCountForTag method that takes paramInstance and tagId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Tags.ResponseHandler.MasterModel> = await tagsOperations.getRecordCountForTag(tagId, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Tags.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Tags.CountResponseWrapper) {
                    console.log("Tag Count: " + responseObject.getCount());
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
        await GetRecordCountForTag.getRecordCountForTag("Leads", BigInt("44028001626096"));
    }
}
GetRecordCountForTag.initializeAndCall();
