import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateTaxes
{
    public static async updateTaxes() {
        let taxesOperations : ZOHOCRMSDK.Taxes.TaxesOperations= new ZOHOCRMSDK.Taxes.TaxesOperations();
        let request : ZOHOCRMSDK.Taxes.BodyWrapper= new ZOHOCRMSDK.Taxes.BodyWrapper();
        let orgTax : ZOHOCRMSDK.Taxes.OrgTax  = new ZOHOCRMSDK.Taxes.OrgTax();
        let taxList : ZOHOCRMSDK.Taxes.Tax[] = [];
        let tax1 : ZOHOCRMSDK.Taxes.Tax = new ZOHOCRMSDK.Taxes.Tax();
        tax1.setId(BigInt("44028001509001"));
        tax1.setName("ModifiedByMeTax");
        tax1.setSequenceNumber(3);
        tax1.setValue(20.00);
//		tax1.setDelete(null);
        taxList.push(tax1);
        orgTax.setTaxes(taxList);
        let preference : ZOHOCRMSDK.Taxes.Preference = new ZOHOCRMSDK.Taxes.Preference();
        preference.setAutoPopulateTax(false);
        preference.setModifyTaxRates(false);
        await orgTax.setPreference(preference);
        await request.setOrgTaxes(orgTax);
        //Call updateTaxes method that takes ZOHOCRMSDK.Taxes.BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Taxes.ActionHandler.MasterModel> = await taxesOperations.updateTaxes(request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Taxes.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Taxes.ActionWrapper) {
                    let actionResponse: ZOHOCRMSDK.Taxes.ActionResponse.MasterModel = responseObject.getOrgTaxes();
                    if (actionResponse instanceof ZOHOCRMSDK.Taxes.SuccessResponse) {
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
                    else if (actionResponse instanceof ZOHOCRMSDK.Taxes.APIException) {
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
                }
                else if (responseObject instanceof ZOHOCRMSDK.Taxes.APIException) {
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
        await UpdateTaxes.updateTaxes();
    }
}
UpdateTaxes.initializeAndCall()
