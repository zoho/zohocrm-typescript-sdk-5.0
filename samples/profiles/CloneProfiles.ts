import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class CloneProfiles
{
    static async cloneProfiles(profileId: bigint)
    {
        let profilesOperations : ZOHOCRMSDK.Profiles.ProfilesOperations= new ZOHOCRMSDK.Profiles.ProfilesOperations();
        let bodyWrapper : ZOHOCRMSDK.Profiles.ProfileWrapper= new ZOHOCRMSDK.Profiles.ProfileWrapper();
        let profiles : ZOHOCRMSDK.Profiles.Profile[] = [];
        let profile : ZOHOCRMSDK.Profiles.Profile = new ZOHOCRMSDK.Profiles.Profile();
        profile.setName("Test2");
        profile.setDescription("description");
        profiles.push(profile);
        bodyWrapper.setProfiles(profiles);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Profiles.ActionHandler.MasterModel>= await profilesOperations.cloneProfiles(profileId, bodyWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject : ZOHOCRMSDK.Profiles.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if(responseObject instanceof ZOHOCRMSDK.Profiles.ActionWrapper) {
                    let actionResponses : ZOHOCRMSDK.Profiles.ActionResponse.MasterModel[]  = responseObject.getProfiles();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Profiles.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any>  = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.Profiles.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Profiles.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any> = responseObject.getDetails();
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
        await CloneProfiles.cloneProfiles(BigInt("44028001629188"));
    }
}
CloneProfiles.initializeAndCall()
