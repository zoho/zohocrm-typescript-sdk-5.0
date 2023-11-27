import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";

export class GetAssignmentRule
{
    public static async getAssignmentRule(ruleId: bigint) {
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.AssignmentRules.GetAssignmentRuleParam.MODULE, "Leads");
        let assignmentRulesOperations: ZOHOCRMSDK.AssignmentRules.AssignmentRulesOperations = new ZOHOCRMSDK.AssignmentRules.AssignmentRulesOperations();
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Attachments.ResponseHandler.MasterModel> = await assignmentRulesOperations.getAssignmentRule(ruleId, paramInstance);
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
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
                            console.log("AssignmentRule ModifiedBy Id : " + modifiedBy.getId());
                            console.log("AssignmentRule ModifiedBy Name : " + modifiedBy.getName());
                            console.log("AssignmentRule ModifiedBy User-Email : " + modifiedBy.getEmail());
                        }
                        let createdBy: ZOHOCRMSDK.AssignmentRules.CreatedBy = assignmentRule.getCreatedBy();
                        if (createdBy != null) {
                            console.log("AssignmentRule CreatedBy Id : " + createdBy.getId());
                            console.log("AssignmentRule CreatedBy Name : " + createdBy.getName());
                            console.log("AssignmentRule CreatedBy User-Email : " + createdBy.getEmail());
                        }
                        console.log("AssignmentRule ID : " + assignmentRule.getId());
                        console.log("AssignmentRule Description : " + assignmentRule.getDescription());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.AssignmentRules.APIException) {
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
        await GetAssignmentRule.getAssignmentRule(BigInt("44028001305001"));
    }
}
GetAssignmentRule.initializeAndCall();