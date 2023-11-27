import * as ZOHOCRMSDK  from "@zohocrm/typescript-sdk-5.0"
class SampleRecord {
    public static async call() {
        let logger: ZOHOCRMSDK.Logger = new ZOHOCRMSDK.LogBuilder()
            .level(ZOHOCRMSDK.Levels.INFO)
            .filePath("/SampleApp/sdk-sample-application/final-logs.log")
            .build();
        let environment1: ZOHOCRMSDK.Environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
        let token1 = new ZOHOCRMSDK.OAuthBuilder()
            .clientId("client_id")
            .clientSecret("client_secret")
            .grantToken("grant_token")
            .redirectURL("https://www.zoho.com")
            .build();
        let tokenstore: ZOHOCRMSDK.DBStore = new ZOHOCRMSDK.DBBuilder()
             .host("hostName")
             .databaseName("databaseName")
             .userName("userName")
             .portNumber(3306)
             .tableName("tableName")
             .password("password")
             .build();
        let store: ZOHOCRMSDK.FileStore = new ZOHOCRMSDK.FileStore("sample-app/sdk-sample-applications/sdk-tokens.txt");
        /*
        * autoRefreshFields
        * if true - all the modules' fields will be auto-refreshed in the background, every    hour.
        * if false - the fields will not be auto-refreshed in the background. The user can manually delete the file(s) or refresh the fields using methods from ModuleFieldsHandler(utils/util/module_fields_handler.js)
        *
        * pickListValidation
        * A boolean field that validates user input for a pick list field and allows or disallows the addition of a new value to the list.
        * True - the SDK validates the input. If the value does not exist in the pick list, the SDK throws an error.
        * False - the SDK does not validate the input and makes the API request with the user’s input to the pick list
        */
        let sdkConfig: ZOHOCRMSDK.SDKConfig = new ZOHOCRMSDK.SDKConfigBuilder().pickListValidation(false).autoRefreshFields(true).build();
        let resourcePath: string = "/Users/SampleApp/typescript-sdk-sample-application";
        try {
            await (await new ZOHOCRMSDK.InitializeBuilder())
                .environment(environment1)
                .token(token1)
                .store(store)
                .SDKConfig(sdkConfig)
                .resourcePath(resourcePath)
                .logger(logger)
                .initialize();
        } catch (error) {
            console.log(error);
        }
        await SampleRecord.getRecords("Leads");
        await ZOHOCRMSDK.Initializer.removeUserConfiguration(token1);
        let environment2: ZOHOCRMSDK.Environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
        let token2: ZOHOCRMSDK.OAuthToken = new ZOHOCRMSDK.OAuthBuilder()
            .clientId("client_id")
            .clientSecret("client_secret")
            .grantToken("grant_token")
            .redirectURL("https://www.zoho.com")
            .build();
        let sdkConfig2: ZOHOCRMSDK.SDKConfig = new ZOHOCRMSDK.SDKConfigBuilder().pickListValidation(true).autoRefreshFields(true).build();
        await (await new ZOHOCRMSDK.InitializeBuilder())
            .environment(environment2)
            .token(token2)
            .store(store)
            .SDKConfig(sdkConfig2)
            .switchUser();
        await ZOHOCRMSDK.Initializer.removeUserConfiguration(token2);
        await SampleRecord.getRecords("Leads");
    }
    static async getRecords(moduleAPIName: string) {
        try {
            let moduleAPIName = "Leads";
            let recordOperations: ZOHOCRMSDK.Record.RecordOperations = new ZOHOCRMSDK.Record.RecordOperations();
            let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
            await paramInstance.add(ZOHOCRMSDK.Record.GetRecordsParam.APPROVED, "both");
            await paramInstance.add(ZOHOCRMSDK.Record.GetRecordsParam.FIELDS, "id");
            let headerInstance: ZOHOCRMSDK.HeaderMap = new ZOHOCRMSDK.HeaderMap();
            await headerInstance.add(ZOHOCRMSDK.Record.GetRecordsHeader.IF_MODIFIED_SINCE, new Date("2020-01-01T00:00:00+05:30"));
            //Call getRecords method that takes paramInstance, headerInstance and moduleAPIName as parameters
            let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.ResponseHandler.MasterModel> = await recordOperations.getRecords(moduleAPIName, paramInstance, headerInstance);
            if (response != null) {
                console.log("Status Code: " + response.getStatusCode());
                if ([204, 304].includes(response.getStatusCode())) {
                    console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                    return;
                }
                let responseObject: ZOHOCRMSDK.Record.ResponseHandler.MasterModel = response.getObject();
                if (responseObject != null) {
                    if (responseObject instanceof ZOHOCRMSDK.Record.ResponseWrapper) {
                        let records: ZOHOCRMSDK.Record.Record[] = responseObject.getData();
                        for (let record of records) {
                            console.log("Record ID: " + record.getId());
                            let createdBy = record.getCreatedBy();
                            if (createdBy != null) {
                                console.log("Record Created By User-ID: " + createdBy.getId());
                                console.log("Record Created By User-Name: " + createdBy.getName());
                                console.log("Record Created By User-Email: " + createdBy.getEmail());
                            }
                            console.log("Record CreatedTime: " + record.getCreatedTime());
                            let modifiedBy = record.getModifiedBy();
                            if (modifiedBy != null) {
                                console.log("Record Modified By User-ID: " + modifiedBy.getId());
                                console.log("Record Modified By User-Name: " + modifiedBy.getName());
                                console.log("Record Modified By User-Email: " + modifiedBy.getEmail());
                            }
                            console.log("Record ModifiedTime: " + record.getModifiedTime());
                            let tags: ZOHOCRMSDK.Tags.Tag[] = record.getTag();
                            if (tags != null) {
                                tags.forEach(tag => {
                                    console.log("Record Tag Name: " + tag.getName());
                                    console.log("Record Tag ID: " + tag.getId());
                                });
                            }
                            //To get particular field value
                            console.log("Record Field Value: " + record.getKeyValue("Last_Name"));// FieldApiName
                            console.log("Record KeyValues: ");
                            let keyValues: Map<string, any> = record.getKeyValues();
                            let keyArray: string[] = Array.from(keyValues.keys());
                            for (let keyName of keyArray) {
                                let value: any = keyValues.get(keyName);
                                console.log(keyName + " : " + value);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
SampleRecord.call();
