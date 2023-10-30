import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class CreateScoringRules
{
    static async createScoringRules()
    {
        let scoringRulesOperations : ZOHOCRMSDK.RulesScoring.ScoringRulesOperations= new ZOHOCRMSDK.RulesScoring.ScoringRulesOperations();
        let bodyWrapper : ZOHOCRMSDK.RulesScoring.BodyWrapper= new ZOHOCRMSDK.RulesScoring.BodyWrapper();
        let scoringRules : ZOHOCRMSDK.RulesScoring.ScoringRule[] = []
        let scoringRule : ZOHOCRMSDK.RulesScoring.ScoringRule= new ZOHOCRMSDK.RulesScoring.ScoringRule();
        scoringRule.setName("Rule Kakashi");
        scoringRule.setDescription("Rule for Module Leads");
        let module : ZOHOCRMSDK.Modules.Modules = new ZOHOCRMSDK.Modules.Modules();
        module.setAPIName("Leads");
        module.setId(BigInt("440280037"));
        await scoringRule.setModule(module);
        let layout : ZOHOCRMSDK.RulesScoring.Layout = new ZOHOCRMSDK.RulesScoring.Layout();
        layout.setAPIName("Standard");
        layout.setId(BigInt("440280167"));
        await scoringRule.setLayout(layout);
        scoringRule.setActive(true);
        let fieldRules = [];
        let fieldRule : ZOHOCRMSDK.RulesScoring.FieldRule = new ZOHOCRMSDK.RulesScoring.FieldRule();
        fieldRule.setScore(5);
        let criteria : ZOHOCRMSDK.RulesScoring.Criteria = new ZOHOCRMSDK.RulesScoring.Criteria();
        criteria.setGroupOperator("or");
        let group =[];
        let criteria1 : ZOHOCRMSDK.RulesScoring.Criteria = new ZOHOCRMSDK.RulesScoring.Criteria();
        let field1 : ZOHOCRMSDK.RulesScoring.Field = new ZOHOCRMSDK.RulesScoring.Field;
        field1.setAPIName("Company");
        await criteria1.setField(field1);
        criteria1.setComparator("equal");
        criteria1.setValue("Zoho");
        group.push(criteria1);
        let criteria2 : ZOHOCRMSDK.RulesScoring.Criteria = new ZOHOCRMSDK.RulesScoring.Criteria();
        field1 =  new ZOHOCRMSDK.RulesScoring.Field();
        field1.setAPIName("Designation");
        await criteria2.setField(field1);
        criteria2.setComparator("equal");
        criteria2.setValue("review");
        group.push(criteria2);
        let criteria3 : ZOHOCRMSDK.RulesScoring.Criteria= new ZOHOCRMSDK.RulesScoring.Criteria();
        field1 =  new ZOHOCRMSDK.RulesScoring.Field();
        field1.setAPIName("Last_Name");
        await criteria3.setField(field1);
        criteria3.setComparator("equal");
        criteria3.setValue("SDK");
        group.push(criteria3);
        criteria.setGroup(group);
        await fieldRule.setCriteria(criteria);
        fieldRules.push(fieldRule);
        scoringRule.setFieldRules(fieldRules);
        let signalRules : ZOHOCRMSDK.RulesScoring.SignalRule[] = [];
        let signalRule : ZOHOCRMSDK.RulesScoring.SignalRule = new ZOHOCRMSDK.RulesScoring.SignalRule();
        signalRule.setId("4836976111233");
        signalRule.setScore(10);
        let signal: ZOHOCRMSDK.RulesScoring.Signal = new ZOHOCRMSDK.RulesScoring.Signal();
        signal.setId(4876876112019n);
        signal.setNamespace(new ZOHOCRMSDK.Choice("Email_Incoming__s"));
        await signalRule.setSignal(signal);
        signalRules.push(signalRule);
        // scoringRule.setSignalRules(signalRules);
        scoringRules.push(scoringRule);
        bodyWrapper.setScoringRules(scoringRules);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.RulesScoring.ActionHandler.MasterModel> = await scoringRulesOperations.createScoringRules(bodyWrapper);
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
        await CreateScoringRules.createScoringRules();
    }
}
CreateScoringRules.initializeAndCall();
