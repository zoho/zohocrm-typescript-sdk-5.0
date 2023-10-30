import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetTax
{
    public static async getTax(taxId: bigint) {
        //example
        //let taxId = 34096432317003n;
        let taxesOperations: ZOHOCRMSDK.Taxes.TaxesOperations = new ZOHOCRMSDK.Taxes.TaxesOperations();
        //Call getTax method that takes taxId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Taxes.ResponseHandler.MasterModel> = await taxesOperations.getTax(taxId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Taxes.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Taxes.ResponseWrapper) {
                    let orgtaxes: ZOHOCRMSDK.Taxes.OrgTax = responseObject.getOrgTaxes();
                    let taxes : ZOHOCRMSDK.Taxes.Tax[] = orgtaxes.getTaxes();
                    taxes.forEach(tax => {
                        console.log("Tax DisplayLabel: " + tax.getDisplayLabel());
                        console.log("Tax Name: " + tax.getName());
                        console.log("Tax ID: " + tax.getId());
                        console.log("Tax Value: " + tax.getValue().toString());
                    });
                    let preference: ZOHOCRMSDK.Taxes.Preference = orgtaxes.getPreference();
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
        await GetTax.getTax(BigInt("44028001509001"));
    }
}
GetTax.initializeAndCall()
