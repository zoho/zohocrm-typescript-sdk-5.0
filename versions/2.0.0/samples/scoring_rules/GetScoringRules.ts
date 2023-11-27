import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetScoringRules
{
    static async getScoringRules()
    {
        let scoringRulesOperations = new ZOHOCRMSDK.RulesScoring.ScoringRulesOperations();
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.RulesScoring.GetScoringRulesParam.MODULE, "Leads");
        let response = await scoringRulesOperations.getScoringRules(paramInstance);
        if(response!= null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (response != null) {
                console.log("Status Code: " + response.getStatusCode());
                if ([204, 304].includes(response.getStatusCode())) {
                    console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                    return;
                }
                let responseObject: ZOHOCRMSDK.RulesScoring.ResponseHandler.MasterModel = response.getObject();
                if (responseObject != null) {
                    if (responseObject instanceof ZOHOCRMSDK.RulesScoring.ResponseWrapper) {
                        let scoringRules: ZOHOCRMSDK.RulesScoring.ScoringRule[] = responseObject.getScoringRules();
                        scoringRules.forEach(scoringRule => {
                            let layout: ZOHOCRMSDK.RulesScoring.Layout = scoringRule.getLayout();
                            if (layout != null) {
                                console.log("ScoringRule Layout ID : " + layout.getId());
                                console.log("ScoringRule Layout APIName: " + layout.getAPIName());
                            }
                            console.log("ScoringRule CreatedTime: " + scoringRule.getCreatedTime());
                            console.log("ScoringRule ModifiedTime: " + scoringRule.getModifiedTime());
                            let fieldRules: ZOHOCRMSDK.RulesScoring.FieldRule[] = scoringRule.getFieldRules();
                            fieldRules.forEach(fieldRule => {
                                console.log("ScoringRule FieldRule Id :" + fieldRule.getId());
                                let criteria: ZOHOCRMSDK.RulesScoring.Criteria = fieldRule.getCriteria();
                                if (criteria != null) {
                                    GetScoringRules.printCriteria(criteria);
                                }
                                console.log("ScoringRule FieldRule Id: " + fieldRule.getId());
                            });
                            let modules: ZOHOCRMSDK.Modules.Modules = scoringRule.getModule();
                            if (modules != null) {
                                console.log("ScoringRule Module ID: " + modules.getId());
                                console.log("ScoringRule Module APIName: " + modules.getAPIName());
                            }
                            console.log("ScoringRule Name: " + scoringRule.getName());
                            let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = scoringRule.getModifiedBy();
                            if (modifiedBy != null) {
                                console.log("ScoringRule Modified By Name : " + modifiedBy.getName());
                                console.log("ScoringRule Modified By id : " + modifiedBy.getId());
                            }
                            console.log("ScoringRule Active: " + scoringRule.getActive());
                            console.log("ScoringRule Description: " + scoringRule.getDescription());
                            console.log("ScoringRule Id: " + scoringRule.getId());
                            let signalRules: ZOHOCRMSDK.RulesScoring.SignalRule[] = scoringRule.getSignalRules();
                            if (signalRules != null) {
                                signalRules.forEach(SignalRule1 => {
                                    console.log("ScoringRule SignalRule Score: " + SignalRule1.getScore());
                                    console.log("ScoringRule SignalRule Id: " + SignalRule1.getId());
                                    let signal: ZOHOCRMSDK.RulesScoring.Signal = SignalRule1.getSignal();
                                    if (signal != null) {
                                        console.log("ScoringRule SignalRule Signal Namespace: " + signal.getNamespace());
                                        console.log("ScoringRule SignalRule Signal Id: " + signal.getId());
                                    }
                                });
                            }
                            let createdBy: ZOHOCRMSDK.Users.MinifiedUser = scoringRule.getCreatedBy();
                            if (createdBy != null) {
                                console.log("ScoringRule Created By Name : " + createdBy.getName());
                                console.log("ScoringRule Created By id : " + createdBy.getId());
                            }
                        });
                        let info: ZOHOCRMSDK.RulesScoring.Info = responseObject.getInfo();
                        if (info != null) {
                            if (info.getPerPage() != null) {
                                console.log("Info PerPage: " + info.getPerPage().toString());
                            }
                            if (info.getCount() != null) {
                                console.log("Info Count: " + info.getCount().toString());
                            }
                            if (info.getPage() != null) {
                                console.log("Info Page: " + info.getPage());
                            }
                            if (info.getMoreRecords() != null) {
                                console.log("Info MoreRecords: " + info.getMoreRecords().toString());
                            }
                        }
                    } else if (responseObject instanceof ZOHOCRMSDK.RulesScoring.APIException) {
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
    }
    static async printCriteria(criteria: ZOHOCRMSDK.RulesScoring.Criteria)
    {
        if(criteria.getComparator()!=null)
        {
            console.log("CustomView Criteria Comparator: " + criteria.getComparator());
        }
        if (criteria.getValue() != null)
        {
            console.log("CustomView Criteria Value: " + criteria.getValue().toString());
        }
        let criteriaGroup = criteria.getGroup();
        if (criteriaGroup != null)
        {
            criteriaGroup.forEach(criteria1=>{
                GetScoringRules.printCriteria(criteria1);
            });
        }
        if (criteria.getGroupOperator() != null)
        {
            console.log("CustomView Criteria Group Operator: " + criteria.getGroupOperator());
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
        await GetScoringRules.getScoringRules();    }
}
GetScoringRules.initializeAndCall();
