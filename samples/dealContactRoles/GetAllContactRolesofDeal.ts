import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetAllContactRolesofDeal
{
    static async getAllContactRolesofDeal(dealId: bigint)
    {
        let contactRolesOperations : ZOHOCRMSDK.ContactDealRoles.DealContactRolesOperations = new ZOHOCRMSDK.ContactDealRoles.DealContactRolesOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.ContactDealRoles.GetAssociatedContactRolesParam.FIELDS, "Last_Name");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ContactDealRoles.ResponseHandler.MasterModel>= await contactRolesOperations.getAssociatedContactRoles(dealId, paramInstance);
        if (response != null)
        {
            console.log('Status Code: ' + response.getStatusCode() + "\n");
            if (response.getStatusCode() == 204 || response.getStatusCode() == 304)
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.ContactDealRoles.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.ContactDealRoles.BodyWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.ContactDealRoles.BodyWrapper = responseHandler;
                let records : ZOHOCRMSDK.ContactDealRoles.Data[] = responseWrapper.getData();
                records.forEach(record => {
                    console.log("Record ID : " + record.getId() + "\n");
                    let createdBy = record.getCreatedBy();
                    if (createdBy != null)
                    {
                        console.log("Record Created By User-ID: " + createdBy.getId() + "\n");
                        console.log("Record CreatedBy User-Name: " + createdBy.getName() + "\n");
                        console.log("Record created by user-Email: " + createdBy.getEmail() + "\n");
                    }
                    console.log("Record CreatedTime: ");
                    console.log(record.getCreatedTime());
                    console.log("\n");
                    let modifiedBy = record.getModifiedBy();
                    if (modifiedBy != null)
                    {
                        console.log("Record Modified By User-ID: " + modifiedBy.getId() + "\n");
                        console.log("Record Modified By User-Name: " + modifiedBy.getName() + "\n");
                        console.log("Record Modified By User-Email: " + modifiedBy.getEmail() + "\n");
                    }
                    console.log("Record Field Value : " + record.getKeyValue("Last_Name") + "\n");
                    console.log("Record KeyValues : \n");
                    let keyvalues = record.getKeyValues();
                    Array.from(keyvalues.keys()).forEach(keyName => {
                        if (keyvalues.get(keyName) != null)
                        {
                            if (Array.isArray(keyvalues.get(keyName)) && keyvalues.get(keyName).length > 0 && keyvalues.get(keyName) != null)
                            {
                                console.log("Record KeyName : " + keyName + " : \n");
                                let dataList = keyvalues.get(keyName);
                                if (Array.isArray(dataList))
                                {
                                    dataList.forEach(data => {
                                        if (Array.isArray(data)) {
                                            console.log("Record KeyName : " + keyName + " - Value : \n");
                                            Array.from(data.keys()).forEach(key => {
                                                console.log(key + " : " + data[key] + "\n");
                                            });
                                        } else {
                                            console.log(data);
                                            console.log("\n");
                                        }
                                    });
                                }
                            }
                            else if (keyvalues.get(keyName) instanceof ZOHOCRMSDK.ContactDealRoles.ContactRole)
                            {
                                console.log("Record ConstactRole Name : " + keyvalues.get(keyName).getName() + "\n");
                                console.log("Record ContactRole Id : " + keyvalues.get(keyName).getId() + "\n");
                            }
                            else
                            {
                                console.log("Record KeyName : " + keyName + " - value : \n");
                                console.log(keyvalues.get(keyName));
                                console.log("\n");
                            }
                        }
                    });
                });
                let info = responseWrapper.getInfo();
                if (info != null)
                {
                    if (info.getCount() != null)
                    {
                        console.log("Record INfo Count : " + info.getCount() + "\n");
                    }
                    if (info.getMoreRecords() != null)
                    {
                        console.log("Record info MoreRecords : " + info.getMoreRecords() + "\n");
                    }
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.ContactDealRoles.APIException)
            {
                let exception = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " + exception.getMessage());
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
        let dealId : bigint= BigInt("44028001538050");
        await GetAllContactRolesofDeal.getAllContactRolesofDeal(dealId);
    }
}
GetAllContactRolesofDeal.initializeAndCall();