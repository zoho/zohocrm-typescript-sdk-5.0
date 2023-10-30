import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateContactRoles
{
    public static async updateContactRoles() {
        let contactRolesOperations: ZOHOCRMSDK.ContactRoles.ContactRolesOperations = new ZOHOCRMSDK.ContactRoles.ContactRolesOperations();
        let request: ZOHOCRMSDK.ContactRoles.BodyWrapper = new ZOHOCRMSDK.ContactRoles.BodyWrapper();
        //Array to hold ContactRole instances
        let contactRolesArray: ZOHOCRMSDK.ContactRoles.ContactRole[] = [];
        let cr1: ZOHOCRMSDK.ContactRoles.ContactRole = new ZOHOCRMSDK.ContactRoles.ContactRole();
        cr1.setId(BigInt("347706012517013"));
        cr1.setName("Edited1-typescript");
        //Add ContactRole instance to the array
        contactRolesArray.push(cr1);
        cr1 = new ZOHOCRMSDK.ContactRoles.ContactRole();
        cr1.setId(BigInt("347706108"));
        cr1.setName("Edited12");
        //Add ContactRole instance to the array
        contactRolesArray.push(cr1);
        request.setContactRoles(contactRolesArray);
        //Call updateContactRoles method that takes BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ContactRoles.ActionHandler.MasterModel> = await contactRolesOperations.updateRoles(request);
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
                            let details: Map<string, any> = actionResponse.getDetails();
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
        await UpdateContactRoles.updateContactRoles();
    }
}
UpdateContactRoles.initializeAndCall()
