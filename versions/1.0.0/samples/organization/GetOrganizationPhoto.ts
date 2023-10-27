import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
import * as path from "path";
import * as fs from "fs";
class GetOrganizationPhoto
{
    public static async getOrganizationPhoto(destinationFolder : string)
    {
        let orgOperations : ZOHOCRMSDK.Org.OrgOperations = new ZOHOCRMSDK.Org.OrgOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Org.ResponseHandler.MasterModel> =await orgOperations.getOrgPhoto();
        if (response != null)
        {
            console.log("Status code " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject instanceof ZOHOCRMSDK.Org.FileBodyWrapper) {
                let streamWrapper: ZOHOCRMSDK.StreamWrapper = responseObject.getFile();
                let name: string | undefined = streamWrapper.getName();
                if (name !== undefined) {
                    let fileName = path.join(destinationFolder, name);
                    let readStream = streamWrapper.getStream();
                    if (readStream !== undefined && readStream instanceof Buffer) {
                        fs.writeFileSync(fileName, readStream);
                    }
                }
            }
            else if (responseObject instanceof ZOHOCRMSDK.Org.APIException) {
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
        await GetOrganizationPhoto.getOrganizationPhoto("/Users/sample-application/file");
    }
}
GetOrganizationPhoto.initializeAndCall();