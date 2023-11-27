import * as ZOHOCRMSDK  from "@zohocrm/typescript-sdk-5.0"
export class Query {
    public static async getRecords() {
        let queryOperations: ZOHOCRMSDK.Query.QueryOperations = new ZOHOCRMSDK.Query.QueryOperations();
        let bodyWrapper: ZOHOCRMSDK.Query.BodyWrapper = new ZOHOCRMSDK.Query.BodyWrapper();
        let selectQuery: string = "select Last_Name, Account_Name.Parent_Account, Account_Name.Parent_Account.Account_Name, First_Name, Full_Name, Created_Time from Contacts where Last_Name is not null limit 200";
        bodyWrapper.setSelectQuery(selectQuery);
        //Call getRecords method that takes BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Query.ResponseHandler.MasterModel> = await queryOperations.getRecords(bodyWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Query.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Query.ResponseWrapper) {
                    let records: ZOHOCRMSDK.Record.Record[] = responseObject.getData();
                    for (let record of records) {
                        console.log("Record ID: " + record.getId());
                        let createdBy: ZOHOCRMSDK.Users.MinifiedUser = record.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Record Created By User-ID: " + createdBy.getId());
                            console.log("Record Created By User-Name: " + createdBy.getName());
                            console.log("Record Created By User-Email: " + createdBy.getEmail());
                        }
                        console.log("Record CreatedTime: " + record.getCreatedTime());
                        let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = record.getModifiedBy();
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
                        let keyArray = Array.from(keyValues.keys());
                        for (let keyName of keyArray) {
                            let value: any = keyValues.get(keyName);
                            if (Array.isArray(value)) {
                                console.log("Record keyName: " + keyName);
                                for (let data of value) {
                                    if (data instanceof Map) {
                                        for (let mapKey in data) {
                                            console.log(mapKey + " : " + data.get(mapKey));
                                        }
                                    }
                                    else {
                                        console.log(data);
                                    }
                                }
                            }
                            else if (value instanceof Map) {
                                console.log("Record keyName: " + keyName);
                                for (let mapKey in value) {
                                    console.log(mapKey + " : " + value.get(mapKey));
                                }
                            }
                            else {
                                console.log("Record keyName: " + keyName + " - Value - " + value);
                            }
                        }
                    }
                    let info: ZOHOCRMSDK.Record.Info = responseObject.getInfo();
                    if (info != null) {
                        if (info.getCount() != null) {
                            console.log("Record Info Count: " + info.getCount().toString());
                        }
                        if (info.getMoreRecords() != null) {
                            console.log("Record Info MoreRecords: " + info.getMoreRecords().toString());
                        }
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.Query.APIException) {
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
        await Query.getRecords();
    }
}
Query.initializeAndCall()
