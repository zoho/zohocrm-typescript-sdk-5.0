import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetProfile
{
    public static async getProfile(profileId: bigint) {
        //example
        // let profileId = 34096430026014n;
        let profilesOperations: ZOHOCRMSDK.Profiles.ProfilesOperations = new ZOHOCRMSDK.Profiles.ProfilesOperations();
        //Call getProfile method that takes profileId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Profiles.ResponseHandler.MasterModel> = await profilesOperations.getProfile(profileId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Profiles.ProfileWrapper) {
                    let profiles: ZOHOCRMSDK.Profiles.Profile[] = responseObject.getProfiles();
                    profiles.forEach(profile => {
                        console.log("Profile DisplayLabel: " + profile.getDisplayLabel());
                        if (profile.getCreatedTime() != null) {
                            console.log("Profile CreatedTime: " + profile.getCreatedTime());
                        }
                        if (profile.getModifiedTime() != null) {
                            console.log("Profile ModifiedTime: " + profile.getModifiedTime());
                        }
                        let permissionsDetails: ZOHOCRMSDK.Profiles.PermissionDetail[] = profile.getPermissionsDetails();
                        if (permissionsDetails != null) {
                            permissionsDetails.forEach(permissionsDetail => {
                                console.log("Profile PermissionDetail DisplayLabel: " + permissionsDetail.getDisplayLabel());
                                console.log("Profile PermissionDetail Module: " + permissionsDetail.getModule());
                                console.log("Profile PermissionDetail Name: " + permissionsDetail.getName());
                                console.log("Profile PermissionDetail ID: " + permissionsDetail.getId());
                                console.log("Profile PermissionDetail Enabled: " + permissionsDetail.getEnabled());
                            });
                        }
                        console.log("Profile Name: " + profile.getName());
                        let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = profile.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Profile Modified By User-ID: " + modifiedBy.getId());
                            console.log("Profile Modified By User-Name: " + modifiedBy.getName());
                            console.log("Profile Modified By User-Email: " + modifiedBy.getEmail());
                        }
                        console.log("Profile Description: " + profile.getDescription());
                        console.log("Profile ID: " + profile.getId());
                        let createdBy: ZOHOCRMSDK.Users.MinifiedUser = profile.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Profile Created By User-ID: " + createdBy.getId());
                            console.log("Profile Created By User-Name: " + createdBy.getName());
                            console.log("Profile Created By User-Email: " + createdBy.getEmail());
                        }
                        let sections : ZOHOCRMSDK.Profiles.Section[] = profile.getSections();
                        if (sections != null) {
                            for (let index = 0; index < sections.length; index++) {
                                let section = sections[index];
                                console.log("Profile Section Name: " + section.getName());
                                let categories : ZOHOCRMSDK.Profiles.Category.MasterModel[] = section.getCategories();
                                categories.forEach(category => {
                                    if (category instanceof ZOHOCRMSDK.Profiles.CategoryModule)
                                    {
                                        console.log("Profile Section Category DisplayLabel: " + category.getDisplayLabel());
                                        let categoryPermissionsDetails : string[] = category.getPermissionsDetails();
                                        if (categoryPermissionsDetails != null) {
                                            categoryPermissionsDetails.forEach(permissionsDetailID => {
                                                console.log("Profile Section Category permissionsDetailID: " + permissionsDetailID);
                                            });
                                        }
                                        console.log("Profile Section Category Module: " + category.getModule());
                                        console.log("Profile Section Category Name: " + category.getName());
                                    }
                                    if (category instanceof ZOHOCRMSDK.Profiles.CategoryOthers)
                                    {
                                        console.log("Profile Section Category DisplayLabel: " + category.getDisplayLabel());
                                        let categoryPermissionsDetails : string[] = category.getPermissionsDetails();
                                        if (categoryPermissionsDetails != null) {
                                            categoryPermissionsDetails.forEach(permissionsDetailID => {
                                                console.log("Profile Section Category permissionsDetailID: " + permissionsDetailID);
                                            });
                                        }
                                        console.log("Profile Section Category Name: " + category.getName());
                                    }
                                });
                            }
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Profiles.APIException) {
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
        await GetProfile.getProfile(BigInt("345432345432"));
    }
}
GetProfile.initializeAndCall()
