import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetContactRoles {

    /**
     * <h3> Get Contact Roles </h3>
     * This method is used to get all the Contact Roles and print the response.
     */
    public static async getContactRoles() {
        let contactRolesOperations: ZOHOCRMSDK.ContactRoles.ContactRolesOperations = new ZOHOCRMSDK.ContactRoles.ContactRolesOperations();
        //Call getContactRoles method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ContactRoles.ResponseHandler.MasterModel> = await contactRolesOperations.getRoles();
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.ContactRoles.ResponseHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.ContactRoles.BodyWrapper) {
                    let contactRoles: ZOHOCRMSDK.ContactRoles.ContactRole[] = responseObject.getContactRoles();
                    contactRoles.forEach(contactRole => {
                        console.log("ContactRole ID: " + contactRole.getId());
                        console.log("ContactRole Name: " + contactRole.getName());
                        console.log("ContactRole SequenceNumber: " + contactRole.getSequenceNumber());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.ContactRoles.APIException) {
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
        await GetContactRoles.getContactRoles();
    }
}
GetContactRoles.initializeAndCall();