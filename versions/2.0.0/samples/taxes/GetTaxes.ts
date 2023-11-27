import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetTaxes
{
    public static async getTaxes() {
        let taxesOperations: ZOHOCRMSDK.Taxes.TaxesOperations = new ZOHOCRMSDK.Taxes.TaxesOperations();
        //Call getTaxes method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Taxes.ResponseHandler.MasterModel> = await taxesOperations.getTaxes();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Taxes.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Taxes.ResponseWrapper) {
                    let orgtax: ZOHOCRMSDK.Taxes.OrgTax = responseObject.getOrgTaxes();
                    let taxes : ZOHOCRMSDK.Taxes.Tax[] = orgtax.getTaxes();
                    taxes.forEach(tax => {
                        console.log("Tax DisplayLabel: " + tax.getDisplayLabel());
                        console.log("Tax Name: " + tax.getName());
                        console.log("Tax ID: " + tax.getId());
                        console.log("Tax Value: " + tax.getValue().toString());
                    });
                    let preference: ZOHOCRMSDK.Taxes.Preference = orgtax.getPreference();
                    if (preference != null) {
                        console.log("Preference AutoPopulateTax: " + preference.getAutoPopulateTax().toString());
                        console.log("Preference ModifyTaxRates: " + preference.getModifyTaxRates());
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
        await GetTaxes.getTaxes();
    }
}
GetTaxes.initializeAndCall();
