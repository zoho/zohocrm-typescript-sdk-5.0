import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class CreateContactRoles
{
    public static async createContactRoles() {
        let contactRolesOperations: ZOHOCRMSDK.ContactRoles.ContactRolesOperations = new ZOHOCRMSDK.ContactRoles.ContactRolesOperations();
        let request: ZOHOCRMSDK.ContactRoles.BodyWrapper = new ZOHOCRMSDK.ContactRoles.BodyWrapper();
        //Array to hold ContactRole instances
        let contactRolesArray: ZOHOCRMSDK.ContactRoles.ContactRole[] = [];
        for (let index = 0; index < 1; index++) {
            let contactRole: ZOHOCRMSDK.ContactRoles.ContactRole = new ZOHOCRMSDK.ContactRoles.ContactRole();
            contactRole.setName("contactRole-ts" + index.toString());
            contactRole.setSequenceNumber(index + 1);
            //Add ContactRole instance to the array
            contactRolesArray.push(contactRole);
        }
        request.setContactRoles(contactRolesArray);
        //Call createContactRoles method that takes BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ContactRoles.ActionHandler.MasterModel> = await contactRolesOperations.createRoles(request);
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.ContactRoles.ActionHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.ContactRoles.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.ContactRoles.ActionResponse.MasterModel[] = responseObject.getContactRoles();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.ContactRoles.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details !== null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.ContactRoles.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details !== null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.ContactRoles.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details = responseObject.getDetails();
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
        await CreateContactRoles.createContactRoles();
    }
}
CreateContactRoles.initializeAndCall()
