import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class CreateBulkWriteJob
{
    public static async createBulkWriteJob(moduleAPIName: string, fileId: string) {
        //example
        //let moduleAPIName = "Leads";
        //let fileId  = "34770616121001";
        let bulkWriteOperations: ZOHOCRMSDK.BulkWrite.BulkWriteOperations = new ZOHOCRMSDK.BulkWrite.BulkWriteOperations();
        let requestWrapper: ZOHOCRMSDK.BulkWrite.RequestWrapper = new ZOHOCRMSDK.BulkWrite.RequestWrapper();
        let callBack: ZOHOCRMSDK.BulkWrite.CallBack = new ZOHOCRMSDK.BulkWrite.CallBack();
        callBack.setUrl("https://www.example.com/callback");
        callBack.setMethod(new ZOHOCRMSDK.Choice("post"));
        //The Bulk Write Job's details are posted to this URL on successful completion / failure of the job.
        requestWrapper.setCallback(callBack);
        requestWrapper.setCharacterEncoding("UTF-8");
        requestWrapper.setOperation(new ZOHOCRMSDK.Choice("insert"));
        let resources: ZOHOCRMSDK.BulkWrite.Resource[] = [];
        let resource: ZOHOCRMSDK.BulkWrite.Resource = new ZOHOCRMSDK.BulkWrite.Resource();
        // To set the type of module that you want to import. The value is data.
        resource.setType(new ZOHOCRMSDK.Choice("data"));
        let module = new ZOHOCRMSDK.Modules.MinifiedModule();
        module.setAPIName(moduleAPIName);
        resource.setModule(module);
        resource.setFileId(fileId);
        //True - Ignores the empty values.The default value is false.
        resource.setIgnoreEmpty(true);
        // To set a field as a unique field or ID of a record.
        // resource.setFindBy("Email");
        let fieldMappings: ZOHOCRMSDK.BulkWrite.FieldMapping[] = [];
        let fieldMapping: ZOHOCRMSDK.BulkWrite.FieldMapping = new ZOHOCRMSDK.BulkWrite.FieldMapping();
        fieldMapping.setAPIName("Last_Name");
        fieldMapping.setIndex(0);
        fieldMappings.push(fieldMapping);
        fieldMapping = new ZOHOCRMSDK.BulkWrite.FieldMapping();
        fieldMapping.setAPIName("Email");
        fieldMapping.setIndex(1);
        fieldMappings.push(fieldMapping);
        fieldMapping = new ZOHOCRMSDK.BulkWrite.FieldMapping();
        fieldMapping.setAPIName("Company");
        fieldMapping.setIndex(2);
        fieldMappings.push(fieldMapping);
        fieldMapping = new ZOHOCRMSDK.BulkWrite.FieldMapping();
        fieldMapping.setAPIName("Phone");
        fieldMapping.setIndex(3);
        fieldMappings.push(fieldMapping);
        let defaultValue : ZOHOCRMSDK.BulkWrite.DefaultValue = new ZOHOCRMSDK.BulkWrite.DefaultValue()
        fieldMapping = new ZOHOCRMSDK.BulkWrite.FieldMapping();
        fieldMapping.setAPIName("Website");
        defaultValue.setValue("www.zohoapis.com");
        fieldMapping.setDefaultValue(defaultValue);
        fieldMappings.push(fieldMapping);
        resource.setFieldMappings(fieldMappings);
        resources.push(resource);
        requestWrapper.setResource(resources);
        //Call createBulkWriteJob method that takes RequestWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.BulkWrite.ActionResponse.MasterModel> = await bulkWriteOperations.createBulkWriteJob(requestWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.BulkWrite.ActionResponse.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BulkWrite.SuccessResponse) {
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
                else if (responseObject instanceof ZOHOCRMSDK.BulkWrite.APIException) {
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
        await CreateBulkWriteJob.createBulkWriteJob("Leads", "3434234234234");
    }
}
CreateBulkWriteJob.initializeAndCall()
