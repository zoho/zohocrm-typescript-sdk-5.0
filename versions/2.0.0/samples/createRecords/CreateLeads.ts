import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class CreateLeads
{
    static async createLeads(moduleAPIName: string)
    {
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations = new ZOHOCRMSDK.Record.RecordOperations();
        let request : ZOHOCRMSDK.Record.BodyWrapper = new ZOHOCRMSDK.Record.BodyWrapper();
        let records : ZOHOCRMSDK.Record.Record[] = [];
        let record1 : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.CITY, "city");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.COMPANY, "company");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.LAST_NAME, "TypeScriptlast");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.FIRST_NAME, "First_Name");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.ANNUAL_REVENUE, 100.1);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.EMAIL, "abc@gmail.com");
        record1.addKeyValue("Designation", "Title_Name");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.SECONDARY_EMAIL, "abc1@gmail.com");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.PHONE, "3003003330");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.FAX, "fax");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.MOBILE, "10101010");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.WEBSITE, "www.domain.com");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.LEAD_STATUS, new ZOHOCRMSDK.Choice("Contacted"));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.LEAD_SOURCE, new ZOHOCRMSDK.Choice("Advertisement"));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.NO_OF_EMPLOYEES, 10);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.INDUSTRY, new ZOHOCRMSDK.Choice("ERP"));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.EMAIL_OPT_OUT, true);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.RATING, new ZOHOCRMSDK.Choice("Active"));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.SKYPE_ID, "skype_id");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.TWITTER, "twitter55");
        // Address Info
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.STREET, "street");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.STATE, "State");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.CITY, "City");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.COUNTRY, "Country");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.ZIP_CODE, "zip_code");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.DESCRIPTION, "description");
        // used when GDPR is enabled
        let dataConsent : ZOHOCRMSDK.Record.Consent = new ZOHOCRMSDK.Record.Consent();
        dataConsent.setConsentRemarks("Approved.");
        dataConsent.setConsentThrough("Email");
        dataConsent.setContactThroughEmail(true);
        dataConsent.setContactThroughSocial(false);
        dataConsent.setContactThroughPhone(true);
        dataConsent.setContactThroughSurvey(true);
        dataConsent.setConsentDate(new Date(2022, 10, 11));
        dataConsent.setDataProcessingBasis("Obtained");
        record1.addKeyValue("Data_Processing_Basis_Details", dataConsent);
        // for custom Fields
        record1.addKeyValue("External", "Value12345");
        record1.addKeyValue("CustomField", "custom_field")
        record1.addKeyValue("Longinteger", BigInt("121321211"))
        record1.addKeyValue("Decimal", 100.12)
        record1.addKeyValue("Datetime", new Date(2020, 12, 20, 10, 29, 33))
        record1.addKeyValue("Date_1", new Date(2020, 10, 12))
        record1.addKeyValue("Subject", "AutomatedSDK");
        record1.addKeyValue("Product_Name", "Automated");
        let fileDetails: ZOHOCRMSDK.Record.FileDetails[]  = [];
        let fileDetail : ZOHOCRMSDK.Record.FileDetails = new ZOHOCRMSDK.Record.FileDetails();
        fileDetail.setFileIdS("ae9c7cefa418aec1d6a5cc2d9ab35c32a6ae23d729ad87c6d90b0bd44183");
        fileDetails.push(fileDetail);
        let fileDetail2 : ZOHOCRMSDK.Record.FileDetails = new ZOHOCRMSDK.Record.FileDetails();
        fileDetail2.setFileIdS("ae9c7cefa418aec1d6a5cc2d9ab35c32a6ae2329ad87c6d90b0bd44183");
        fileDetails.push(fileDetail2);
        record1.addKeyValue("file_Upload", fileDetails);
        // for Custom User LookUp
        let user : ZOHOCRMSDK.Users.MinifiedUser = new ZOHOCRMSDK.Users.MinifiedUser();
        user.setId(BigInt("440280254001"));
        record1.addKeyValue("User_1", user);
        // for Custom LookUp
        let data : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        data.setId(BigInt("44028001821040"));
        record1.addKeyValue("Lookup_1", data);
        //for Custom PicKList
        record1.addKeyValue("Pick", new ZOHOCRMSDK.Choice("true"));
        //for Custom MultiPickList
        record1.addKeyValue("Multiselect", [new ZOHOCRMSDK.Choice("Option 1"), new ZOHOCRMSDK.Choice("Option 2")]);
        // for Subform
        let subformList : ZOHOCRMSDK.Record.Record[] =[];
        let subform : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        subform.addKeyValue("customfield", "customValue");
        let user1 : ZOHOCRMSDK.Users.MinifiedUser = new ZOHOCRMSDK.Users.MinifiedUser();
        user1.setId(BigInt("440280254001"));
        subform.addKeyValue("Userfield", user1);
        subformList.push(subform);
        record1.addKeyValue("Subform_2", subformList);
        // for MultiSelectLookUp/custom MultiSelectLookUp
        let multiSelectList : ZOHOCRMSDK.Record.Record[] = [];
        let record : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        record.addKeyValue("id", BigInt("44028001821010"));
        let linkingRecord : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        linkingRecord.addKeyValue("MultiSelectLookup", record);
        multiSelectList.push(linkingRecord);
        let record3 : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        record3.addKeyValue("id", BigInt("44028001659002"));
        let linkingRecord2 : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        linkingRecord2.addKeyValue("MultiSelectLookup", record3);
        multiSelectList.push(linkingRecord2);
        record1.addKeyValue("MultiSelectLookup", multiSelectList);

        let tagList : ZOHOCRMSDK.Tags.Tag[] = [];
        let tag : ZOHOCRMSDK.Tags.Tag = new ZOHOCRMSDK.Tags.Tag();
        tag.setName("Testtask");
        tagList.push(tag);
        record1.setTag(tagList);
        // add Record instance to List
        records.push(record1);
        request.setData(records);
        let trigger : string[] = ["approval", "workflow", "blueprint"];
        request.setTrigger(trigger);
        request.setLarId("4222222224324");
        let headerInstance : ZOHOCRMSDK.HeaderMap = new ZOHOCRMSDK.HeaderMap();
        // await headerInstance.add(ZOHOCRMSDK.Record.CreateRecordsHeader.X_EXTERNAL, "Quotes.Quoted_Items.Product_Name.Products_External");
        // await headerInstance.add(ZOHOCRMSDK.Record.CreateRecordsHeader.X_EXTERNAL, "Products.Products_External");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.ActionHandler.MasterModel>= await recordOperations.createRecords(moduleAPIName, request, headerInstance);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Record.ActionWrapper) {
                    let actionResponses : ZOHOCRMSDK.Record.ActionResponse.MasterModel[]  = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Record.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        } else if (actionResponse instanceof ZOHOCRMSDK.Record.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                } else if (responseObject instanceof ZOHOCRMSDK.Record.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details = responseObject.getDetails();
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
        await CreateLeads.createLeads("Leads");
    }
}
CreateLeads.initializeAndCall();
