import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class ScoringRuleExecutionUsingLayoutId
{
    static async scoringRuleExecutionUsingLayoutId(moduleAPIName: string)
    {
        let scoringRulesOperations : ZOHOCRMSDK.RulesScoring.ScoringRulesOperations = new ZOHOCRMSDK.RulesScoring.ScoringRulesOperations();
        let bodyWrapper: ZOHOCRMSDK.RulesScoring.LayoutRequestWrapper  = new ZOHOCRMSDK.RulesScoring.LayoutRequestWrapper();
        let layout : ZOHOCRMSDK.RulesScoring.Layout = new ZOHOCRMSDK.RulesScoring.Layout();
        layout.setId(BigInt("440280167"));
        await bodyWrapper.setLayout(layout);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.RulesScoring.ActionHandler.MasterModel>= await scoringRulesOperations.scoringRuleExecutionUsingLayoutId(moduleAPIName, bodyWrapper);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode());
            let actionResponse : ZOHOCRMSDK.RulesScoring.ActionHandler.MasterModel = response.getObject();
            if (actionResponse != null)
            {
                if (actionResponse instanceof ZOHOCRMSDK.RulesScoring.SuccessResponse)
                {
                    console.log("Status: " + actionResponse.getStatus().getValue());
                    console.log("Code: " + actionResponse.getCode().getValue());
                    let details : Map<String, any> = actionResponse.getDetails();
                    console.log("Details: ");
                    if (details != null)
                    {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + actionResponse.getMessage().getValue());
                }
                else if (actionResponse instanceof ZOHOCRMSDK.RulesScoring.APIException)
                {
                    console.log("Status: " + actionResponse.getStatus().getValue());
                    console.log("Code: " + actionResponse.getCode().getValue());
                    let details :Map<String, any> = actionResponse.getDetails();
                    console.log("Details: ");
                    if (details != null)
                    {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + actionResponse.getMessage().getValue());
                }
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
        await ScoringRuleExecutionUsingLayoutId.scoringRuleExecutionUsingLayoutId("Leads");
    }
}
ScoringRuleExecutionUsingLayoutId.initializeAndCall();
