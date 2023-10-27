import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class CreateBulkReadJob
{
    public static async createBulkReadJob(moduleAPIName: string) {
        //example
        //let moduleAPIName = "Leads";
        let bulkReadOperations: ZOHOCRMSDK.BulkRead.BulkReadOperations = new ZOHOCRMSDK.BulkRead.BulkReadOperations();
        let requestWrapper: ZOHOCRMSDK.BulkRead.RequestWrapper = new ZOHOCRMSDK.BulkRead.RequestWrapper();
        let callBack: ZOHOCRMSDK.BulkRead.CallBack = new ZOHOCRMSDK.BulkRead.CallBack();
        callBack.setUrl("https://www.example.com/callback");
        callBack.setMethod(new ZOHOCRMSDK.Choice("post"));
        //The Bulk Read Job's details is posted to this URL on successful completion / failure of the job.
        requestWrapper.setCallback(callBack);
        let query: ZOHOCRMSDK.BulkRead.Query = new ZOHOCRMSDK.BulkRead.Query();
        //Specifies the API Name of the module to be read.
        let module: ZOHOCRMSDK.Modules.MinifiedModule = new ZOHOCRMSDK.Modules.MinifiedModule();
        module.setAPIName(moduleAPIName);
        //Specifies the API Name of the module to be read.
        query.setModule(module);
        //Specifies the unique ID of the custom view, whose records you want to export.
        // query.setCvid("3477061087501");
        //Array of field names
        let fieldAPINames: string[] = [];
        fieldAPINames.push("Last_Name");
        //Specifies the API Name of the fields to be fetched.
        // query.setFields(fieldAPINames);
        query.setPage(1);
        let criteria: ZOHOCRMSDK.BulkRead.Criteria = new ZOHOCRMSDK.BulkRead.Criteria();
        criteria.setGroupOperator(new ZOHOCRMSDK.Choice("or"));
        let criteriaArray: ZOHOCRMSDK.BulkRead.Criteria[] = [];
        let group11: ZOHOCRMSDK.BulkRead.Criteria = new ZOHOCRMSDK.BulkRead.Criteria();
        group11.setGroupOperator(new ZOHOCRMSDK.Choice("and"));
        let groupArray11: ZOHOCRMSDK.BulkRead.Criteria[] = [];
        let group111: ZOHOCRMSDK.BulkRead.Criteria = new ZOHOCRMSDK.BulkRead.Criteria();
        let field1: ZOHOCRMSDK.Fields.MinifiedField = new ZOHOCRMSDK.Fields.MinifiedField();
        field1.setAPIName("Company");
        group111.setField(field1);
        group111.setComparator(new ZOHOCRMSDK.Choice("equal"));
        group111.setValue("Zoho");
        groupArray11.push(group111);
        let group112: ZOHOCRMSDK.BulkRead.Criteria = new ZOHOCRMSDK.BulkRead.Criteria();
        let field2: ZOHOCRMSDK.Fields.MinifiedField = new ZOHOCRMSDK.Fields.MinifiedField();
        field2.setAPIName("Owner");
        group112.setField(field2);
        group112.setComparator(new ZOHOCRMSDK.Choice("in"));
        group112.setValue(["3477061173021"]);
        groupArray11.push(group112);
        group11.setGroup(groupArray11);
        criteriaArray.push(group11);
        let group12 = new ZOHOCRMSDK.BulkRead.Criteria();
        group12.setGroupOperator(new ZOHOCRMSDK.Choice("or"));
        let groupArray12: ZOHOCRMSDK.BulkRead.Criteria[] = [];
        let group121 = new ZOHOCRMSDK.BulkRead.Criteria();
        let field3: ZOHOCRMSDK.Fields.MinifiedField = new ZOHOCRMSDK.Fields.MinifiedField();
        field3.setAPIName("Paid");
        group121.setField(field3);
        group121.setComparator(new ZOHOCRMSDK.Choice("equal"));
        group121.setValue(true);
        groupArray12.push(group121);
        let group122 = new ZOHOCRMSDK.BulkRead.Criteria();
        let field4: ZOHOCRMSDK.Fields.MinifiedField = new ZOHOCRMSDK.Fields.MinifiedField();
        // To set API name of a field.
        field4.setAPIName("Created_Time");
        group122.setField(field4);
        // To set comparator(eg: equal, greater_than.).
        group122.setComparator(new ZOHOCRMSDK.Choice("between"));
        let time = ["2020-06-03T17:31:48+05:30", "2020-06-03T17:31:48+05:30"];
        // To set the value to be compared
        group122.setValue(time);
        groupArray12.push(group122);
        group12.setGroup(groupArray12);
        criteriaArray.push(group12);
        criteria.setGroup(criteriaArray);
        //To filter the records to be exported.
        query.setCriteria(criteria);
        requestWrapper.setQuery(query);
        //Specify the value for this key as "ics" to export all records in the Events module as an ICS file.
        // requestWrapper.setFileType(new ZOHOCRMSDK.Choice("ics"));
        //Call createBulkReadJob method that takes RequestWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.BulkRead.ActionHandler.MasterModel> = await bulkReadOperations.createBulkReadJob(requestWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BulkRead.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.BulkRead.ActionResponse.MasterModel[] = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.BulkRead.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.BulkRead.APIException) {
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
        await CreateBulkReadJob.createBulkReadJob("Leads");
    }
}
CreateBulkReadJob.initializeAndCall()
