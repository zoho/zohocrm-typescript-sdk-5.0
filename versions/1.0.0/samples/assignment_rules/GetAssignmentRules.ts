import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";

export class GetAssignmentRules
{
    public static async getAssignmentRules()
    {
        let assignmentRulesOperations: ZOHOCRMSDK.AssignmentRules.AssignmentRulesOperations = new ZOHOCRMSDK.AssignmentRules.AssignmentRulesOperations();
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.AssignmentRules.ResponseHandler.MasterModel> = await assignmentRulesOperations.getAssignmentRules();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.AssignmentRules.ResponseHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.AssignmentRules.ResponseWrapper) {
                    let assignmentRules: ZOHOCRMSDK.AssignmentRules.AssignmentRules[] = responseObject.getAssignmentRules();
                    assignmentRules.forEach(assignmentRule => {
                        console.log("AssignmentRule ModifiedTime : " + assignmentRule.getModifiedTime());
                        console.log("AssignmentRule CreatedTime : " + assignmentRule.getCreatedTime());
                        let defaultAssignee: ZOHOCRMSDK.AssignmentRules.DefaultAssignee = assignmentRule.getDefaultAssignee();
                        if (defaultAssignee != null) {
                            console.log("AssignmentRule DefaultAssignee Id : " + defaultAssignee.getId());
                            console.log("AssignmentRule DefaultAssignee Name : " + defaultAssignee.getName());
                        }
                        let module: ZOHOCRMSDK.Modules.MinifiedModule = assignmentRule.getModule();
                        if (module != null) {
                            console.log("AssignmentRule Module Id : " + module.getId());
                            console.log("AssignmentRule Module APIName : " + module.getAPIName());
                        }
                        console.log("AssignmentRule Name : " + assignmentRule.getName());
                        let modifiedBy: ZOHOCRMSDK.AssignmentRules.CreatedBy = assignmentRule.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("AssignmentRule ModifiedBy User-Id : " + modifiedBy.getId());
                            console.log("AssignmentRule ModifiedBy User-Name : " + modifiedBy.getName());
                            console.log("AssignmentRule ModifiedBy User-Email : " + modifiedBy.getEmail());
                        }
                        let createdBy: ZOHOCRMSDK.AssignmentRules.CreatedBy = assignmentRule.getCreatedBy();
                        if (createdBy != null) {
                            console.log("AssignmentRule CreatedBy User-Id : " + createdBy.getId());
                            console.log("AssignmentRule CreatedBy User-Name : " + createdBy.getName());
                            console.log("AssignmentRule CreatedBy User-Email : " + createdBy.getEmail());
                        }
                        console.log("AssignmentRule ID : " + assignmentRule.getId());
                        console.log("AssignmentRule Description : " + assignmentRule.getDescription());
                    });
                } else if (responseObject instanceof ZOHOCRMSDK.AssignmentRules.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any>= responseObject.getDetails();
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
    public static async initializeAndCall()
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
        await GetAssignmentRules.getAssignmentRules()
    }
}
GetAssignmentRules.initializeAndCall()