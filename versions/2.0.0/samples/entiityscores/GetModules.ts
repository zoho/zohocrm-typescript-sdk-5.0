import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";

class GetModules
{
    static async getModules()
    {
        let entityScoresOperations : ZOHOCRMSDK.EntityScores.EntityScoresOperations = new ZOHOCRMSDK.EntityScores.EntityScoresOperations("Positive_Score");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.EntityScores.ResponseHandler.MasterModel> = await entityScoresOperations.getModules();

        if(response != null)
        {
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject : ZOHOCRMSDK.EntityScores.ResponseHandler.MasterModel = response.getObject();

            if (responseObject != null)
            {
                if(responseObject instanceof ZOHOCRMSDK.EntityScores.ResponseWrapper)
                {
                    let entityScores : ZOHOCRMSDK.EntityScores.EntityScores[] = responseObject.getData();
                    if (entityScores != null)
                    {
                        entityScores.forEach(entityScore =>{
                            console.log("EntityScore Id: " + entityScore.getId());
                            console.log("EntityScore Score: " + entityScore.getScore());
                            console.log("EntityScore PositiveScore: " + entityScore.getPositiveScore());
                            console.log("EntityScore NegativeScore: " + entityScore.getNegativeScore());
                            console.log("EntityScore touchPointNegativeScore: " + entityScore.getTouchPointNegativeScore());
                            console.log("EntityScore touchPointPositiveScore: " + entityScore.getTouchPointPositiveScore());
                            console.log("EntityScore ZiaVisions: " + entityScore.getZiaVisions());
                            let scoringRule :  ZOHOCRMSDK.EntityScores.ScoringRuleStructure = entityScore.getScoringRule();
                            if (scoringRule != null)
                            {
                                console.log("ScoringRule Id : " + scoringRule.getId());
                                console.log("ScoringRule Name : " + scoringRule.getName());
                            }
                            let fieldStates : any[] = entityScore.getFieldStates();
                            if (fieldStates != null)
                            {
                                fieldStates.forEach(fieldState => {
                                    console.log("fieldStates : " + fieldState);
                                });
                            }
                        });
                        let info : ZOHOCRMSDK.EntityScores.Info = responseObject.getInfo();
                        if (info != null)
                        {
                            if (info.getPerPage() != null)
                            {
                                console.log("Info PerPage: " + info.getPerPage().toString());
                            }
                            if (info.getCount() != null)
                            {
                                console.log("Info Count: " + info.getCount().toString());
                            }
                            if (info.getPage() != null)
                            {
                                console.log("Info Page: " + info.getPage());
                            }
                            if (info.getMoreRecords() != null)
                            {
                                console.log("Info MoreRecords: " + info.getMoreRecords().toString());
                            }
                        }
                    }
                }
                else if(responseObject instanceof ZOHOCRMSDK.EntityScores.APIException)
                {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    let details : Map<string, any>= responseObject.getDetails();
                    console.log("Details: ");
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage());
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
        await GetModules.getModules();
    }
}
GetModules.initializeAndCall();