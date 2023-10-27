import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetBulkWriteJobDetails
{
    public static async getBulkWriteJobDetails(jobId: string) {
        //example
        //let jobId = 34770615615003n;
        let bulkWriteOperations: ZOHOCRMSDK.BulkWrite.BulkWriteOperations = new ZOHOCRMSDK.BulkWrite.BulkWriteOperations();
        //Call getBulkWriteJobDetails method that takes jobId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.BulkWrite.ResponseWrapper.MasterModel> = await bulkWriteOperations.getBulkWriteJobDetails(jobId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.BulkWrite.ResponseWrapper.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BulkWrite.BulkWriteResponse) {
                    console.log("Bulk write Job Status: " + responseObject.getStatus());
                    console.log("Bulk write Character Encoding: " + responseObject.getCharacterEncoding());
                    let resources: ZOHOCRMSDK.BulkWrite.Resource[] = responseObject.getResource();
                    if (resources != null) {
                        resources.forEach(resource => {
                            console.log("Bulk write Resource Status: " + resource.getStatus().getValue());
                            console.log("Bulk write Resource Type: " + resource.getType().getValue());
                            console.log("Bulk write Resource Module: " + resource.getModule());
                            let fieldMappings: ZOHOCRMSDK.BulkWrite.FieldMapping[] = resource.getFieldMappings();
                            if (fieldMappings != null) {
                                fieldMappings.forEach(fieldMapping => {
                                    console.log("Bulk write Resource FieldMapping Module: " + fieldMapping.getAPIName());
                                    if (fieldMapping.getIndex() != null) {
                                        console.log("Bulk write Resource FieldMapping Inded: " + fieldMapping.getIndex().toString());
                                    }
                                    if (fieldMapping.getFormat() != null) {
                                        console.log("Bulk write Resource FieldMapping Format: " + fieldMapping.getFormat());
                                    }
                                    if (fieldMapping.getFindBy() != null) {
                                        console.log("Bulk write Resource FieldMapping FindBy: " + fieldMapping.getFindBy());
                                    }
                                    if (fieldMapping.getDefaultValue() != null) {
                                        let defaultValue : ZOHOCRMSDK.BulkWrite.DefaultValue =fieldMapping.getDefaultValue();
                                        console.log("Default Value Name : "+ defaultValue.getName());
                                        console.log("Default Value Module: " + defaultValue.getModule());
                                        console.log("Default Value value: " + defaultValue.getValue());
                                    }
                                });
                            }
                            let file: ZOHOCRMSDK.BulkWrite.File = resource.getFile();
                            if (file != null) {
                                console.log("Bulk write Resource File Status: " + file.getStatus().getValue());
                                console.log("Bulk write Resource File Name: " + file.getName());
                                console.log("Bulk write Resource File AddedCount: " + file.getAddedCount().toString());
                                console.log("Bulk write Resource File SkippedCount: " + file.getSkippedCount().toString());
                                console.log("Bulk write Resource File UpdatedCount: " + file.getUpdatedCount().toString());
                                console.log("Bulk write Resource File TotalCount: " + file.getTotalCount().toString());
                            }
                        });
                    }
                    let callback: ZOHOCRMSDK.BulkWrite.CallBack = responseObject.getCallback();
                    if (callback != null) {
                        console.log("Bulk write CallBack Url: " + callback.getUrl());
                        console.log("Bulk write CallBack Method: " + callback.getMethod().getValue());
                    }
                    console.log("Bulk write ID: " + responseObject.getId().toString());
                    let result: ZOHOCRMSDK.BulkWrite.Result = responseObject.getResult();
                    if (result != null) {
                        console.log("Bulk write DownloadUrl: " + result.getDownloadUrl());
                    }
                    let createdBy: ZOHOCRMSDK.Users.MinifiedUser = responseObject.getCreatedBy();
                    if (createdBy != null) {
                        console.log("Bulkwrite Created By User-ID: " + createdBy.getId());
                        console.log("Bulkwrite Created By user-Name: " + createdBy.getName());
                    }
                    console.log("Bulk write Operation: " + responseObject.getOperation());
                    console.log("Bulk write File CreatedTime: " + responseObject.getCreatedTime().toString());
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
        await GetBulkWriteJobDetails.getBulkWriteJobDetails("33242423423");
    }
}
GetBulkWriteJobDetails.initializeAndCall()
