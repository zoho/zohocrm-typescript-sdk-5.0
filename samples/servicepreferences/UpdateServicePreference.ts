import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";

class UpdateServicePreference
{
    static async updateServicePreference() {
        let servicePreferenceOperations : ZOHOCRMSDK.PreferenceService.ServicePreferenceOperations= new ZOHOCRMSDK.PreferenceService.ServicePreferenceOperations();
        let request : ZOHOCRMSDK.PreferenceService.BodyWrapper= new ZOHOCRMSDK.PreferenceService.BodyWrapper();
        let servicePreferences : ZOHOCRMSDK.PreferenceService.ServicePreference = new ZOHOCRMSDK.PreferenceService.ServicePreference();
        servicePreferences.setJobSheetEnabled(false);
        await request.setServicePreferences(servicePreferences);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.PreferenceService.ActionHandler.MasterModel>=await servicePreferenceOperations.updateServicePreference(request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let actionHandler : ZOHOCRMSDK.PreferenceService.ActionHandler.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.PreferenceService.ActionWrapper) {
                let actionResponse : ZOHOCRMSDK.PreferenceService.ActionResponse.MasterModel= actionHandler.getServicePreferences();
                if (actionResponse instanceof ZOHOCRMSDK.PreferenceService.SuccessResponse) {
                    console.log("Status: " + actionResponse.getStatus().getValue());
                    console.log("Code: " + actionResponse.getCode().getValue());
                    console.log("Details");
                    let details :Map<string, any> = actionResponse.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + actionResponse.getMessage().getValue());
                } else if (actionResponse instanceof ZOHOCRMSDK.PreferenceService.APIException) {
                    console.log("Status: " + actionResponse.getStatus().getValue());
                    console.log("Code: " + actionResponse.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any>= actionResponse.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + actionResponse.getMessage());
                }
            } else if (actionHandler instanceof ZOHOCRMSDK.PreferenceService.APIException) {
                console.log("Status: " + actionHandler.getStatus().getValue());
                console.log("Code: " + actionHandler.getCode().getValue());
                console.log("Details");
                let details : Map<string, any> = actionHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + actionHandler.getMessage());
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
        await UpdateServicePreference.updateServicePreference();
    }
}
UpdateServicePreference.initializeAndCall();