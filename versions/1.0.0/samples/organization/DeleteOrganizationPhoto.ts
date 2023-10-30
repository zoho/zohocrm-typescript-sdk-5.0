import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DeleteOrganizationPhoto
{
    public static async deleteOrganizationPhoto() {
        let orgOperations: ZOHOCRMSDK.Org.OrgOperations = new ZOHOCRMSDK.Org.OrgOperations();
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Org.ActionHandler.MasterModel> = await orgOperations.deleteOrganizationPhoto();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Org.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Org.SuccessResponse) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage());
                }
                else if (responseObject instanceof ZOHOCRMSDK.Org.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage());
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
        await DeleteOrganizationPhoto.deleteOrganizationPhoto();
    }
}
DeleteOrganizationPhoto.initializeAndCall()
