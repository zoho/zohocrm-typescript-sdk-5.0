import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class UpdateRecord {
    /**
     * <h3> Update Record</h3>
     * This method is used to update a single record of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module.
     * @param {BigInt} recordId The ID of the record to be updated
     */
    static async updateRecord(moduleAPIName: string, recordId: bigint) {
        //API Name of the module to update record
        //let moduleAPIName = "module_api_name";
        //let recordId = 177002n;
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations = new ZOHOCRMSDK.Record.RecordOperations();
        let request : ZOHOCRMSDK.Record.BodyWrapper = new ZOHOCRMSDK.Record.BodyWrapper();
        //Array to hold Record instances
        let recordsArray : ZOHOCRMSDK.Record.Record[] = [];
        let record : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/typescript-sdk-5.0/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        await record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.CITY, "city");
        await record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.LAST_NAME, "Last Name");
        await record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.FIRST_NAME, "First Name");
        await record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.LAST_NAME, "Last Name");
        await record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.COMPANY, "KKRNP");
        await record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.ANNUAL_REVENUE, 1232.1);
        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record.addKeyValue("External", "54321");
        record.addKeyValue("Custom_field", "Value");
        record.addKeyValue("Custom_field_2", "value");
        record.addKeyValue("Date_1", new Date(2017, 1, 13));
        let fileDetails : ZOHOCRMSDK.Record.FileDetails[] = [];
        let fileDetail : ZOHOCRMSDK.Record.FileDetails = new ZOHOCRMSDK.Record.FileDetails();
        fileDetail.setFileIdS("ae9c7cefa418aec1d6a5cc2d9ab35c32537b7c2400dadca8ff55f620c65357da");
        fileDetails.push(fileDetail);
        fileDetail = new ZOHOCRMSDK.Record.FileDetails();
        fileDetail.setFileIdS("ae9c7cefa418aec1d6a5cc2d9ab35c32e0063e7321b5b4ca878a934519e6cdb2");
        fileDetails.push(fileDetail);
        fileDetail = new ZOHOCRMSDK.Record.FileDetails();
        fileDetail.setFileIdS("ae9c7cefa418aec1d6a5cc2d9ab35c323daf4780bfe0058133556f155795981f");
        fileDetails.push(fileDetail);
        record.addKeyValue("File_Upload", fileDetails);
        let recordOwner : ZOHOCRMSDK.Users.Users = new ZOHOCRMSDK.Users.Users();
        recordOwner.setEmail("abc@zoho.com");
        record.addKeyValue("Owner", recordOwner);
        //Used when GDPR is enabled
        let dataConsent : ZOHOCRMSDK.Record.Consent = new ZOHOCRMSDK.Record.Consent();
        dataConsent.setConsentRemarks("Approved.");
        dataConsent.setConsentThrough("Email");
        dataConsent.setContactThroughEmail(true);
        dataConsent.setContactThroughSocial(false);
        record.addKeyValue("Data_Processing_Basis_Details", dataConsent);
        /** Following methods are being used only by Inventory modules */
        let dealName : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        await dealName.addFieldValue(ZOHOCRMSDK.Record.Field.Deals.ID, BigInt("347706112416012"));
        await record.addFieldValue(ZOHOCRMSDK.Record.Field.Sales_Orders.DEAL_NAME, dealName);
        let contactName : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        await contactName.addFieldValue(ZOHOCRMSDK.Record.Field.Contacts.ID, BigInt("347706112263005"));
        await contactName.addFieldValue(ZOHOCRMSDK.Record.Field.Sales_Orders.CONTACT_NAME, contactName);
        let accountName : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        // accountName.addFieldValue(RecordField.Accounts.ID, 34770619326021n);
        accountName.addKeyValue("name", "automatedAccount");
        await record.addFieldValue(ZOHOCRMSDK.Record.Field.Sales_Orders.ACCOUNT_NAME, accountName);
        record.addKeyValue("Discount", 10.5);
        let inventoryLineItemArray: ZOHOCRMSDK.Record.Record[]  = [];
        let inventoryLineItem : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        let lineItemProduct : ZOHOCRMSDK.Record.LineItemProduct = new ZOHOCRMSDK.Record.LineItemProduct();
        lineItemProduct.setId(BigInt("347706112402032"));
        // lineItemProduct.addKeyValue("Products_External", "ProductExternal");
        inventoryLineItem.addKeyValue("Product_Name", lineItemProduct);
        inventoryLineItem.addKeyValue("Quantity", 3);
        inventoryLineItem.addKeyValue("Description", "productDescription");
        inventoryLineItem.addKeyValue("ListPrice", 10.0);
        inventoryLineItem.addKeyValue("Discount", "5.%");
        let productLineTaxes : ZOHOCRMSDK.Record.LineTax[] = [];
        let productLineTax : ZOHOCRMSDK.Record.LineTax = new ZOHOCRMSDK.Record.LineTax();
        productLineTax.setName("MyTax1134");
        productLineTax.setPercentage(20.0);
        productLineTaxes.push(productLineTax);
        inventoryLineItem.addKeyValue("Line_Tax", productLineTaxes);
        inventoryLineItemArray.push(inventoryLineItem);
        record.addKeyValue("Quoted_Items", inventoryLineItemArray);
        let lineTaxes: ZOHOCRMSDK.Record.LineTax[]  = [];
        let lineTax : ZOHOCRMSDK.Record.LineTax = new ZOHOCRMSDK.Record.LineTax();
        lineTax.setName("MyTax1134");
        lineTax.setPercentage(20.0);
        lineTaxes.push(lineTax);
        record.addKeyValue("$line_tax", lineTaxes);
        /** End Inventory **/
        //Add Record instance to the array
        recordsArray.push(record);
        request.setData(recordsArray);
        let trigger = [];
        trigger.push("approval");
        trigger.push("workflow");
        trigger.push("blueprint");
        request.setTrigger(trigger);
        let headerInstance : ZOHOCRMSDK.HeaderMap = new ZOHOCRMSDK.HeaderMap();
        await headerInstance.add(ZOHOCRMSDK.Record.UpdateRecordHeader.X_EXTERNAL, "Leads.External");
        await headerInstance.add(ZOHOCRMSDK.Record.UpdateRecordHeader.X_EXTERNAL, "Quotes.Quoted_Items.Product_Name.Products_External");
        //Call updateRecord method that takes recordId, ModuleAPIName, BodyWrapper instance and headerInstance as parameter.
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.ActionHandler.MasterModel>= await recordOperations.updateRecord(recordId, moduleAPIName, request, headerInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Record.ActionWrapper) {
                    let actionResponses :  ZOHOCRMSDK.Record.ActionResponse.MasterModel[] = responseObject.getData();
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
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.Record.APIException) {
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
                }
                else if (responseObject instanceof ZOHOCRMSDK.Record.APIException) {
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
        await UpdateRecord.updateRecord("Products", BigInt("440280018301"));
    }
}
UpdateRecord.initializeAndCall();
