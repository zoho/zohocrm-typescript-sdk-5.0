import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetTags{
    public static async getTags(moduleAPIName: string) {
        //example
        //let moduleAPIName = "Leads";
        let tagsOperations: ZOHOCRMSDK.Tags.TagsOperations = new ZOHOCRMSDK.Tags.TagsOperations();
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters of Get Tags operation */
        await paramInstance.add(ZOHOCRMSDK.Tags.GetTagsParam.MODULE, moduleAPIName);
        await paramInstance.add(ZOHOCRMSDK.Tags.GetTagsParam.MY_TAGS, 'true');
        //Call getTags method that takes ZOHOCRMSDK.ParameterMap instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Tags.ResponseHandler.MasterModel> = await tagsOperations.getTags(paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Tags.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Tags.ResponseWrapper) {
                    let tags: ZOHOCRMSDK.Tags.Tag[] = responseObject.getTags();
                    tags.forEach(tag => {
                        console.log("Tag CreatedTime: " + tag.getCreatedTime());
                        console.log("Tag ModifiedTime: " + tag.getModifiedTime());
                        console.log("Tag Name: " + tag.getName());
                        let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = tag.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Tag Modified By User-ID: " + modifiedBy.getId());
                            console.log("Tag Modified By User-Name: " + modifiedBy.getName());
                        }
                        console.log("Tag ID: " + tag.getId());
                        let createdBy: ZOHOCRMSDK.Users.MinifiedUser = tag.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Tag Created By User-ID: " + createdBy.getId());
                            console.log("Tag Created By User-Name: " + createdBy.getName());
                        }
                    });
                    let info: ZOHOCRMSDK.Tags.Info = responseObject.getInfo();
                    if (info != null) {
                        if (info.getCount() != null) {
                            console.log("Tag Info Count: " + info.getCount().toString());
                        }
                        if (info.getAllowedCount() != null) {
                            console.log("Tag Info AllowedCount: " + info.getAllowedCount().toString());
                        }
                    }
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
        await GetTags.getTags("leads");
    }
}
GetTags.initializeAndCall()
