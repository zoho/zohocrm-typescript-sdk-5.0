import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetRoles{
    public static async getRoles() {
        let rolesOperations: ZOHOCRMSDK.Roles.RolesOperations = new ZOHOCRMSDK.Roles.RolesOperations();
        //Call getRoles method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Roles.ResponseHandler.MasterModel> = await rolesOperations.getRoles();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Roles.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Roles.ResponseWrapper) {
                    let roles: ZOHOCRMSDK.Roles.Role[] = responseObject.getRoles();
                    roles.forEach(role => {
                        console.log("Role DisplayLabel: " + role.getDisplayLabel());
                        let forecastManager: ZOHOCRMSDK.Roles.ReportingTo = role.getForecastManager();
                        if (forecastManager != null) {
                            console.log("Role Forecast Manager User-ID: " + forecastManager.getId());
                            console.log("Role Forecast Manager User-Name: " + forecastManager.getName());
                        }
                        console.log("Role ShareWithPeers: " + role.getShareWithPeers().toString());
                        console.log("Role Name: " + role.getName());
                        console.log("Role Description: " + role.getDescription());
                        console.log("Role ID: " + role.getId());
                        let reportingTo: ZOHOCRMSDK.Roles.ReportingTo = role.getReportingTo();
                        if (reportingTo != null) {
                            console.log("Role ReportingTo User-ID: " + reportingTo.getId());
                            console.log("Role ReportingTo User-Name: " + reportingTo.getName());
                        }
                        console.log("Role AdminUser: " + role.getAdminUser());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Roles.APIException) {
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
        await GetRoles.getRoles();
    }
}
GetRoles.initializeAndCall();
