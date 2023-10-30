import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetOrganization
{
    public static async getOrganization() {
        let orgOperations: ZOHOCRMSDK.Org.OrgOperations = new ZOHOCRMSDK.Org.OrgOperations();
        //Call getOrganization method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Org.ResponseHandler.MasterModel> = await orgOperations.getOrganization();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Org.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Org.ResponseWrapper) {
                    let orgs: ZOHOCRMSDK.Org.Org[] = responseObject.getOrg();
                    orgs.forEach(org => {
                        console.log("Organization Country: " + org.getCountry());
                        console.log("Organization PhotoId: " + org.getPhotoId());
                        console.log("Organization City: " + org.getCity());
                        console.log("Organization Description: " + org.getDescription());
                        console.log("Organization McStatus: " + org.getMcStatus());
                        console.log("Organization GappsEnabled: " + org.getGappsEnabled());
                        console.log("Organization DomainName: " + org.getDomainName());
                        console.log("Organization TranslationEnabled: " + org.getTranslationEnabled());
                        console.log("Organization Street: " + org.getStreet());
                        console.log("Organization Alias: " + org.getAlias());
                        console.log("Organization Currency: " + org.getCurrency());
                        console.log("Organization Id: " + org.getId());
                        console.log("Organization State: " + org.getState());
                        console.log("Organization Fax: " + org.getFax());
                        console.log("Organization EmployeeCount: " + org.getEmployeeCount());
                        console.log("Organization Zip: " + org.getZip());
                        console.log("Organization Website: " + org.getWebsite());
                        console.log("Organization CurrencySymbol: " + org.getCurrencySymbol());
                        console.log("Organization Mobile: " + org.getMobile());
                        console.log("Organization CurrencyLocale: " + org.getCurrencyLocale());
                        console.log("Organization PrimaryZuid: " + org.getPrimaryZuid());
                        console.log("Organization ZiaPortalId: " + org.getZiaPortalId());
                        console.log("Organization TimeZone: " + org.getTimeZone()!.name);
                        console.log("Organization Zgid: " + org.getZgid());
                        console.log("Organization CountryCode: " + org.getCountryCode());
                        let licenseDetails: ZOHOCRMSDK.Org.LicenseDetails = org.getLicenseDetails();
                        if (licenseDetails != null && licenseDetails != undefined) {
                            console.log("Organization LicenseDetails PaidExpiry: " + licenseDetails.getPaidExpiry());
                            console.log("Organization LicenseDetails UsersLicensePurchased: " + licenseDetails.getUsersLicensePurchased());
                            console.log("Organization LicenseDetails TrialType: " + licenseDetails.getTrialType());
                            console.log("Organization LicenseDetails TrialExpiry: " + licenseDetails.getTrialExpiry());
                            console.log("Organization LicenseDetails Paid: " + licenseDetails.getPaid());
                            console.log("Organization LicenseDetails PaidType: " + licenseDetails.getPaidType());
                        }
                        console.log("Organization Phone: " + org.getPhone());
                        console.log("Organization CompanyName: " + org.getCompanyName());
                        console.log("Organization PrivacySettings: " + org.getPrivacySettings());
                        console.log("Organization PrimaryEmail: " + org.getPrimaryEmail());
                        console.log("Organization IsoCode: " + org.getIsoCode());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Org.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details != null)
                    {
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
        await GetOrganization.getOrganization();
    }
}
GetOrganization.initializeAndCall()
