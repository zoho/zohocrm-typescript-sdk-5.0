import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class CreateProducts
{
    static async createProducts(moduleAPIName: string)
    {
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations = new ZOHOCRMSDK.Record.RecordOperations();
        let request : ZOHOCRMSDK.Record.BodyWrapper = new ZOHOCRMSDK.Record.BodyWrapper();
        let records : ZOHOCRMSDK.Record.Record[] = [];
        let record1 : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.PRODUCT_NAME, 'Product2');
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.PRODUCT_CODE, 'code1233');
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.PRODUCT_ACTIVE, true);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.PRODUCT_CATEGORY, new ZOHOCRMSDK.Choice('Hardware'));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.MANUFACTURER, new ZOHOCRMSDK.Choice('LexPon Inc.'));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.UNIT_PRICE, 100.1);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.COMMISSION_RATE, 12.0);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.USAGE_UNIT, new ZOHOCRMSDK.Choice('Box'));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.QTY_ORDERED, 100.0);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.QTY_IN_DEMAND, 120.0);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.QTY_IN_STOCK, 200.0);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.REORDER_LEVEL, 1.0);
        let vendorName : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        vendorName.setId(BigInt("44028001538092"));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.VENDOR_NAME, vendorName);
        let handler : ZOHOCRMSDK.Users.MinifiedUser= new ZOHOCRMSDK.Users.MinifiedUser();
        handler.setId(BigInt('440280254001'));
        await record1.addKeyValue("Handler", handler);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.SALES_END_DATE, new Date(2023, 9, 10));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.SALES_START_DATE, new Date(2023, 8, 10));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.SUPPORT_EXPIRY_DATE, new Date(2023, 10, 10));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.SUPPORT_START_DATE, new Date(2023, 8, 10));
        let taxes = [];
        let line_tax : ZOHOCRMSDK.Record.Tax = new ZOHOCRMSDK.Record.Tax();
        line_tax.setId(BigInt("44028001626124"));
        line_tax.setValue("20.0");
        taxes.push(line_tax);
        record1.addKeyValue("Tax", taxes);
        // await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.TAX, taxes);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.TAXABLE, true);
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Products.DESCRIPTION, 'description');
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
        record1.addKeyValue("LongInteger", 123);
        record1.addKeyValue("CustomField", "custom_field");
        record1.addKeyValue("Datetime", new Date(2020, 12, 20, 10, 29, 33));
        record1.addKeyValue("Date_1", new Date(2020, 10, 12));
        record1.addKeyValue("Subject", "AutomatedSDK");
        // record1.addKeyValue("Product_Name", "Automated");
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
        user.setId(BigInt("4323001232"));
        record1.addKeyValue("User_1", user);
        // for Custom LookUp
        let data : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        data.setId(BigInt("4034234234234"));
        record1.addKeyValue("LookUp_1", data);
        //for Custom PicKList
        record1.addKeyValue("Pick", new ZOHOCRMSDK.Choice("true"));
        //for Custom MultiPickList
        record1.addKeyValue("MultiSelecr", [new ZOHOCRMSDK.Choice("Option 1"), new ZOHOCRMSDK.Choice("Option 2")]);
        // for Subform
        let subformList : ZOHOCRMSDK.Record.Record[] =[];
        let subform : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        subform.addKeyValue("customfield", "customValue");
        let user1 : ZOHOCRMSDK.Users.MinifiedUser = new ZOHOCRMSDK.Users.MinifiedUser();
        user1.setId(BigInt("42393413434213"));
        subform.addKeyValue("Userfield", user1);
        subformList.push(subform);
        record1.addKeyValue("Subform_2", subformList);
        // for MultiSelectLookUp/custom MultiSelectLookUp
        let multiSelectList : ZOHOCRMSDK.Record.Record[] = [];
        let record : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        record.addKeyValue("id", BigInt("43234234423434"));
        let linkingRecord : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        linkingRecord.addKeyValue("MultiSelectLookup", record);
        multiSelectList.push(linkingRecord);
        let record3 : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        record3.addKeyValue("id", BigInt("43234234423434"));
        let linkingRecord2 : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        linkingRecord2.addKeyValue("MultiSelectLookup", record3);
        multiSelectList.push(linkingRecord2);
        record1.addKeyValue("MultiSelectlookup", multiSelectList);
        // //
        let tagList : ZOHOCRMSDK.Tags.Tag[] = [];
        let tag : ZOHOCRMSDK.Tags.Tag = new ZOHOCRMSDK.Tags.Tag();
        tag.setName("Testtask");
        tagList.push(tag);
        record1.setTag(tagList);
        // add Record instance to List
        records.push(record1);
        request.setData(records);
        // let trigger : string[] = ["approval", "workflow", "blueprint"];
        // request.setTrigger(trigger);
        // request.setLarId("4222222224324");
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
    static async initializeAndCall() {
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
        await CreateProducts.createProducts("Products");
    }
}
CreateProducts.initializeAndCall();
