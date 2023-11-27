import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class RemoveTagsFromMultipleRecords
{
    public static async removeTagsFromMultipleRecords(moduleAPIName: string, recordIds: string[]) {
        //example
        // let moduleAPIName = "Leads";
        // let tagNames = ["addtag1,addtag12"];
        // let recordIds = [3409643723026n, 3409643527003n, 3409643394028n];
        let tagsOperations : ZOHOCRMSDK.Tags.TagsOperations= new ZOHOCRMSDK.Tags.TagsOperations();
        let request: ZOHOCRMSDK.Tags.ExistingTagRequestWrapper = new ZOHOCRMSDK.Tags.ExistingTagRequestWrapper();
        let tagList : ZOHOCRMSDK.Tags.ExistingTag[] = [];
        let tag1 : ZOHOCRMSDK.Tags.ExistingTag = new ZOHOCRMSDK.Tags.ExistingTag();
        tag1.setName("tagNam3e3e12345TYPESCRIPT");
        tagList.push(tag1);
        request.setTags(tagList);
        let recordIdsInBigint : bigint[] = recordIds.map((str: string) => BigInt(str));
        request.setIds((recordIdsInBigint));
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Remove Tags from Multiple Records operation */
        for (let recordId of recordIds) {
            await paramInstance.add(ZOHOCRMSDK.Tags.RemoveTagsFromMultipleRecordsParam.IDS, recordId);
        }
        //Call RemoveTagsFromMultipleRecordsParam method that takes ZOHOCRMSDK.ParameterMap instance, moduleAPIName as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Tags.RecordActionHandler.MasterModel> = await tagsOperations.removeTagsFromMultipleRecords(moduleAPIName, request,  paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Tags.RecordActionWrapper) {
                    let actionResponses = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Tags.RecordSuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.Tags.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
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
                    let details = responseObject.getDetails();
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
        let moduleAPIName: string = "leads";
        let recordIds : string[] = ["44028001647093", "44028001507174"];
        await RemoveTagsFromMultipleRecords.removeTagsFromMultipleRecords(moduleAPIName, recordIds);
    }
}
RemoveTagsFromMultipleRecords.initializeAndCall()
