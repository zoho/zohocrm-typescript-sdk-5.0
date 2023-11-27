import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";

class GetServicePreferences
{
    static async getServicePreferences()
    {
        let servicePreferenceOperations : ZOHOCRMSDK.PreferenceService.ServicePreferenceOperations = new ZOHOCRMSDK.PreferenceService.ServicePreferenceOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.PreferenceService.ResponseHandler.MasterModel> = await servicePreferenceOperations.getServicePreference();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject : ZOHOCRMSDK.PreferenceService.ResponseHandler.MasterModel = response.getObject();
            if (responseObject instanceof ZOHOCRMSDK.PreferenceService.ResponseWrapper)
            {
                let servicePreference : ZOHOCRMSDK.PreferenceService.ServicePreference = responseObject.getServicePreferences();
                if (servicePreference != null)
                {
                    console.log("JobSheetEnabled : " + servicePreference.getJobSheetEnabled());
                }
            }
            else if (responseObject instanceof ZOHOCRMSDK.PreferenceService.APIException) {
                console.log("Status: " + responseObject.getStatus().getValue());
                console.log("Code: " + responseObject.getCode().getValue());
                console.log("Details");
                let details : Map<string, any> = responseObject.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseObject.getMessage());
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
        await GetServicePreferences.getServicePreferences();    }
}
GetServicePreferences.initializeAndCall();