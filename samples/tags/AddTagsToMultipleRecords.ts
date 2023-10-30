import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class AddTagsToMultipleRecords
{
    public static async addTagsToMultipleRecords(moduleAPIName: string, recordIds: bigint[]) {
        let tagsOperations :ZOHOCRMSDK.Tags.TagsOperations = new ZOHOCRMSDK.Tags.TagsOperations();
        let request :ZOHOCRMSDK.Tags.NewTagRequestWrapper= new ZOHOCRMSDK.Tags.NewTagRequestWrapper();
        let tagList:ZOHOCRMSDK.Tags.Tag[]  = [];
        let tag1 :ZOHOCRMSDK.Tags.Tag= new ZOHOCRMSDK.Tags.Tag();
        tag1.setName("tagNam3e3e1235TYPESCRIPT");
        tagList.push(tag1);
        request.setTags(tagList);
        request.setOverWrite(true);
        request.setIds(recordIds);
        request.setOverWrite(false);
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.Tags.AddTagsToMultipleRecordsParam.OVER_WRITE, "false");
        //Call addTagsToMultipleRecords method that takes ZOHOCRMSDK.ParameterMap instance and moduleAPIName as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Tags.RecordActionHandler.MasterModel> = await tagsOperations.addTagsToMultipleRecords(moduleAPIName,request, paramInstance);
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
        let moduleAPIName = "Leads";
        let recordIds = [BigInt("44028001647093"), BigInt("44028001507174")];
        await AddTagsToMultipleRecords.addTagsToMultipleRecords(moduleAPIName, recordIds);
    }
}
AddTagsToMultipleRecords.initializeAndCall()
