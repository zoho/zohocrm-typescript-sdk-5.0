import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetBulkReadJobDetails
{
    public static async getBulkReadJobDetails(jobId: bigint) {
        //example
        // let jobId = 34096432461001n;
        let bulkReadOperations: ZOHOCRMSDK.BulkRead.BulkReadOperations = new ZOHOCRMSDK.BulkRead.BulkReadOperations();
        //Call getBulkReadJobDetails method that takes jobId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.BulkRead.ResponseHandler.MasterModel> = await bulkReadOperations.getBulkReadJobDetails(jobId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.BulkRead.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BulkRead.ResponseWrapper) {
                    let jobDetails: ZOHOCRMSDK.BulkRead.JobDetail[] = responseObject.getData();
                    jobDetails.forEach(jobDetail => {
                        console.log("Bulk read Job ID: " + jobDetail.getId());
                        console.log("Bulk read Operation: " + jobDetail.getOperation());
                        console.log("Bulk read State: " + jobDetail.getState().getValue());
                        let result: ZOHOCRMSDK.BulkRead.Result = jobDetail.getResult();
                        if (result != null) {
                            console.log("Bulkread Result Page: " + result.getPage().toString());
                            console.log("Bulkread Result Count: " + result.getCount().toString());
                            console.log("Bulkread Result Download URL: " + result.getDownloadUrl());
                            console.log("Bulkread Result Per_Page: " + result.getPerPage().toString());
                            console.log("Bulkread Result MoreRecords: " + result.getMoreRecords().toString());
                        }
                        let query: ZOHOCRMSDK.BulkRead.Query = jobDetail.getQuery();
                        if (query != null) {
                            console.log("Bulk read Query Module: " + query.getModule());
                            console.log("Bulk read Query Page: " + query.getPage().toString());
                            console.log("Bulk read Query cvid: " + query.getCvid());
                            let fields: string[] = query.getFields();
                            if (fields != null) {
                                fields.forEach(fieldName => {
                                    console.log("Bulk read Query Fields: " + fieldName);
                                });
                            }
                            let criteria: ZOHOCRMSDK.BulkRead.Criteria = query.getCriteria();
                            if (criteria != null) {
                                this.printCriteria(criteria);
                            }
                        }
                        let createdBy: ZOHOCRMSDK.Users.MinifiedUser = jobDetail.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Bulkread Created By User-ID: " + createdBy.getId());
                            console.log("Bulkread Created By user-Name: " + createdBy.getName());
                        }
                        console.log("Bulkread CreatedTime: " + jobDetail.getCreatedTime());
                        console.log("Bulkread File Type: " + jobDetail.getFileType());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.BulkRead.APIException) {
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
    private static async printCriteria(criteria: ZOHOCRMSDK.BulkRead.Criteria) {
        if (criteria.getAPIName() != null) {
            console.log("BulkRead Criteria API Name: " + criteria.getAPIName());
        }
        if (criteria.getComparator() != null) {
            console.log("BulkRead Criteria Comparator: " + criteria.getComparator().getValue());
        }
        if (criteria.getValue() != null) {
            console.log("BulkRead Criteria Value: " + criteria.getValue().toString());
        }
        let criteriaGroup: ZOHOCRMSDK.BulkRead.Criteria[] = criteria.getGroup();
        if (criteriaGroup != null) {
            criteriaGroup.forEach(eachCriteria => {
                this.printCriteria(eachCriteria);
            });
        }
        if (criteria.getGroupOperator() != null) {
            console.log("BulkRead Criteria Group Operator: " + criteria.getGroupOperator().getValue());
        }
    }
    static async initializeAndCall(){
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
        await GetBulkReadJobDetails.getBulkReadJobDetails( BigInt("33423423423"));
    }
}
GetBulkReadJobDetails.initializeAndCall()
