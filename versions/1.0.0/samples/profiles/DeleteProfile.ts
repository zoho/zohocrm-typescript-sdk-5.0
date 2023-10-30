import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DeleteProfile
{
    static async deleteProfile(profileId : bigint, existingProfileId: bigint)
    {
        let profileOperations : ZOHOCRMSDK.Profiles.ProfilesOperations= new ZOHOCRMSDK.Profiles.ProfilesOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.Profiles.DeleteProfileParam.TRANSFER_TO, existingProfileId);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Profiles.ActionHandler.MasterModel>= await profileOperations.deleteProfile(profileId, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Profiles.SuccessResponse) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage());
                } else if (responseObject instanceof ZOHOCRMSDK.Profiles.APIException) {
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
        await DeleteProfile.deleteProfile(BigInt("44028001727035"), BigInt("440280031160"));
    }
}
DeleteProfile.initializeAndCall()