import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class CreateTags
{
    public static async createTags(moduleAPIName: string) {
        //example
        //let moduleAPIName = "Leads";
        let tagsOperations : ZOHOCRMSDK.Tags.TagsOperations= new ZOHOCRMSDK.Tags.TagsOperations();
        let request : ZOHOCRMSDK.Tags.BodyWrapper= new ZOHOCRMSDK.Tags.BodyWrapper();
        let tagList : ZOHOCRMSDK.Tags.Tag[] = [];
        let tag1 : ZOHOCRMSDK.Tags.Tag = new ZOHOCRMSDK.Tags.Tag();
        tag1.setName("new TypeScript Tag");
        tag1.setColorCode(new ZOHOCRMSDK.Choice("#F48435"));
        tagList.push(tag1);
        request.setTags(tagList);
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.Tags.CreateTagsParam.MODULE, moduleAPIName);
        //Call createTags method that takes ZOHOCRMSDK.Tags.BodyWrapper instance and ZOHOCRMSDK.ParameterMap instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Tags.ActionHandler.MasterModel> = await tagsOperations.createTags(request, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Tags.ActionHandler.MasterModel = response.getObject();
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
        await CreateTags.createTags("leads");
    }
}
CreateTags.initializeAndCall();
