import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class DeleteScoringRule
{
    static async deleteScoringRule(id: bigint)
    {
        let scoringRulesOperations : ZOHOCRMSDK.RulesScoring.ScoringRulesOperations = new ZOHOCRMSDK.RulesScoring.ScoringRulesOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.RulesScoring.ActionHandler.MasterModel> = await scoringRulesOperations.deleteScoringRule(id);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject : ZOHOCRMSDK.RulesScoring.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null)
            {
                if (responseObject instanceof ZOHOCRMSDK.RulesScoring.ActionWrapper)
                {
                    let ScoringRules: ZOHOCRMSDK.RulesScoring.ActionResponse.MasterModel[] = responseObject.getScoringRules();
                    ScoringRules.forEach(scoringRule =>{
                        if (scoringRule instanceof ZOHOCRMSDK.RulesScoring.SuccessResponse)
                        {
                            console.log("Status: " + scoringRule.getStatus().getValue());
                            console.log("Code: " + scoringRule.getCode().getValue());
                            let details : Map<string, any> = scoringRule.getDetails();
                            console.log("Details: ");
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + scoringRule.getMessage().getValue());
                        }
                        else if (scoringRule instanceof ZOHOCRMSDK.RulesScoring.APIException)
                        {
                            console.log("Status: " + scoringRule.getStatus().getValue());
                            console.log("Code: " + scoringRule.getCode().getValue());
                            let details : Map<string, any> = scoringRule.getDetails();
                            console.log("Details: ");
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + scoringRule.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.RulesScoring.APIException)
                {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    let details : Map<string, any> = responseObject.getDetails();
                    console.log("Details: ");
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
        await DeleteScoringRule.deleteScoringRule(BigInt("44028001628032"));
    }
}
DeleteScoringRule.initializeAndCall();
