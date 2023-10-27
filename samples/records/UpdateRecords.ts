import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class UpdateRecords{
    /**
     * <h3> Update Records</h3>
     * This method is used to update the records of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the module to update records.
     */
    static async updateRecords(moduleAPIName: string) {
        //example
        //let moduleAPIName = "module_api_name";
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations= new ZOHOCRMSDK.Record.RecordOperations();
        let request : ZOHOCRMSDK.Record.BodyWrapper= new ZOHOCRMSDK.Record.BodyWrapper();
        //Array to hold Record instances
        let recordsArray : ZOHOCRMSDK.Record.Record[]= [];
        let record1 : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        //ID of the record to be updated
        record1.setId(BigInt("440240983007"));
        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.LAST_NAME, "Node JS SDK");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.FIRST_NAME, "Node");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.COMPANY, "ZCRM");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.CITY, "city");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.ANNUAL_REVENUE, 1231.1);
        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record1.addKeyValue("Custom_field", "Custom val");
        record1.addKeyValue("Custom_field_2", 10);
        //Used when GDPR is enabled
        let dataConsent : ZOHOCRMSDK.Record.Consent = new ZOHOCRMSDK.Record.Consent();
        dataConsent.setConsentRemarks("Approved.");
        dataConsent.setConsentThrough("Email");
        dataConsent.setContactThroughEmail(true);
        dataConsent.setContactThroughSocial(false);
        record1.addKeyValue("Data_Processing_Basis_Details", dataConsent);
        let recordOwner : ZOHOCRMSDK.Users.Users = new ZOHOCRMSDK.Users.Users();
        recordOwner.setEmail("abc@zoho.com");
        record1.addKeyValue("Owner", recordOwner);
        /** Following methods are being used only by Inventory modules */
        let dealName : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        await dealName.addFieldValue(ZOHOCRMSDK.Record.Field.Deals.ID, BigInt("347706112416012"));
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Sales_Orders.DEAL_NAME, dealName);
        let contactName : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        await contactName.addFieldValue(ZOHOCRMSDK.Record.Field.Contacts.ID, BigInt("347706112263005"));
        await contactName.addFieldValue(ZOHOCRMSDK.Record.Field.Sales_Orders.CONTACT_NAME, contactName);
        let accountName : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        // accountName.addFieldValue(RecordField.Accounts.ID, 34770619326021n);
        accountName.addKeyValue("name", "automatedAccount");
        await record1.addFieldValue(ZOHOCRMSDK.Record.Field.Sales_Orders.ACCOUNT_NAME, accountName);
        record1.addKeyValue("Discount", 10.5);
        let inventoryLineItemArray : ZOHOCRMSDK.Record.Record[] = [];
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
        record1.addKeyValue("Quoted_Items", inventoryLineItemArray);
        let lineTaxes : ZOHOCRMSDK.Record.LineTax []= [];
        let lineTax : ZOHOCRMSDK.Record.LineTax = new ZOHOCRMSDK.Record.LineTax();
        lineTax.setName("MyTax1134");
        lineTax.setPercentage(20.0);
        lineTaxes.push(lineTax);
        record1.addKeyValue("$line_tax", lineTaxes);
        /** End Inventory **/
        recordsArray.push(record1);
        let record2 : ZOHOCRMSDK.Record.Record= new ZOHOCRMSDK.Record.Record();
        //ID of the record to be updated
        await record2.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.ID, BigInt("347706110152007"));
        /*
         * Call addFieldValue method that takes two arguments
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        await record2.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.CITY, "City");
        await record2.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.LAST_NAME, "Last Name");
        await record2.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.FIRST_NAME, "First Name");
        await record2.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.COMPANY, "KKRNP");
        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record2.addKeyValue("Custom_field", "Value");
        record2.addKeyValue("Custom_field_2", "value");
        //Add Record instance to the array
        recordsArray.push(record2);
        request.setData(recordsArray);
        // let trigger = [];
        //
        // trigger.push("approval");
        //
        // trigger.push("workflow");
        //
        // trigger.push("blueprint");
        // request.setTrigger(trigger);
        let headerInstance : ZOHOCRMSDK.HeaderMap= new ZOHOCRMSDK.HeaderMap();
        // await headerInstance.add(ZOHOCRMSDK.Record.UpdateRecordsHeader.X_EXTERNAL, "Quotes.Quoted_Items.Product_Name.Products_External");
        //Call updateRecords method that takes moduleAPIName, BodyWrapper instance and headerInstance as parameter.
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.ActionHandler.MasterModel>= await recordOperations.updateRecords(moduleAPIName, request, headerInstance);
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
        await UpdateRecords.updateRecords("Leads");
    }
}
UpdateRecords.initializeAndCall();
