import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetCurrencies
{
    public static async getCurrencies() {
        let currenciesOperations: ZOHOCRMSDK.Currencies.CurrenciesOperations = new ZOHOCRMSDK.Currencies.CurrenciesOperations();
        //Call getCurrencies method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Currencies.ResponseHandler.MasterModel> = await currenciesOperations.getCurrencies();
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Currencies.ResponseHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.Currencies.BodyWrapper) {
                    let currencies: ZOHOCRMSDK.Currencies.Currency[] = responseObject.getCurrencies();
                    currencies.forEach(currency => {
                        console.log("Currency Id: " + currency.getId());
                        console.log("Currency IsoCode: " + currency.getIsoCode());
                        console.log("Currency Symbol: " + currency.getSymbol());
                        console.log("Currency CreatedTime: " + currency.getCreatedTime());
                        console.log("Currency IsActive: " + currency.getIsActive().toString());
                        console.log("Currency ExchangeRate: " + currency.getExchangeRate());
                        let format: ZOHOCRMSDK.Currencies.CurrencyFormat = currency.getFormat();
                        if (format !== null) {
                            console.log("Currency ZOHOCRMSDK.Currencies.Format DecimalSeparator: " + format.getDecimalSeparator().getValue());
                            console.log("Currency ZOHOCRMSDK.Currencies.Format ThousandSeparator: " + format.getThousandSeparator().getValue());
                            console.log("Currency ZOHOCRMSDK.Currencies.Format DecimalPlaces: " + format.getDecimalPlaces().getValue());
                        }
                        let createdBy: ZOHOCRMSDK.Users.MinifiedUser = currency.getCreatedBy();
                        if (createdBy !== null) {
                            console.log("Currency CreatedBy User-Name: " + createdBy.getName());
                            console.log("Currency CreatedBy User-ID: " + createdBy.getId());
                        }
                        console.log("Currency PrefixSymbol: " + currency.getPrefixSymbol().toString());
                        console.log("Currency IsBase: " + currency.getIsBase().toString());
                        console.log("Currency ModifiedTime: " + currency.getModifiedTime());
                        console.log("Currency Name: " + currency.getName());
                        let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = currency.getModifiedBy();
                        if (modifiedBy !== null) {
                            console.log("Currency ModifiedBy User-Name: " + modifiedBy.getName());
                            console.log("Currency ModifiedBy User-ID: " + modifiedBy.getId());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Currencies.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details !== null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage());
                }
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
        await GetCurrencies.getCurrencies();
    }
}
GetCurrencies.initializeAndCall()
