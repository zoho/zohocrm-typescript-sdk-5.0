import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class RemoveContactRoleFromDeal
{
    static async removeContactRoleFromDeal(contactId : bigint, dealId: bigint)
    {
        let contactRolesOperations : ZOHOCRMSDK.ContactDealRoles.DealContactRolesOperations= new ZOHOCRMSDK.ContactDealRoles.DealContactRolesOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ContactDealRoles.ActionHandler.MasterModel>= await contactRolesOperations.deleteContactRoleRealation(contactId, dealId);
        if (response != null)
        {
            console.log("Status code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.ContactDealRoles.ActionHandler.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.ContactDealRoles.ActionWrapper)
            {
                let actionWrapper : ZOHOCRMSDK.ContactDealRoles.ActionWrapper = actionHandler;
                let actionResponses : ZOHOCRMSDK.ContactDealRoles.ActionResponse.MasterModel[] = actionWrapper.getData();
                actionResponses.forEach(actionResponse => {
                    if (actionResponse instanceof ZOHOCRMSDK.ContactDealRoles.SuccessResponse)
                    {
                        let successResponse : ZOHOCRMSDK.ContactDealRoles.SuccessResponse = actionResponse;
                        console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                        console.log("Code: " + successResponse.getCode().getValue() + "\n");
                        console.log("Details: ");
                        let details : Map<string, any> = actionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key) + "\n");
                            });
                        }
                        console.log("Message: " + successResponse.getMessage());
                    }
                    if (actionResponse instanceof ZOHOCRMSDK.ContactDealRoles.APIException)
                    {
                        let exception : ZOHOCRMSDK.ContactDealRoles.APIException = actionResponse;
                        console.log("Status: " + exception.getStatus().getValue() + "\n");
                        console.log("Code: " + exception.getCode().getValue() + "\n");
                        console.log("Details: ");
                        let details : Map<string, any> = exception.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key) + "\n");
                            });
                        }
                        console.log("Message: " + exception.getMessage());
                    }
                });
            }
            else if (actionHandler instanceof ZOHOCRMSDK.ContactDealRoles.APIException)
            {
                let exception : ZOHOCRMSDK.ContactDealRoles.APIException = actionHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any> = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " + exception.getMessage());
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
        let contactId : bigint= BigInt("44028001030088");
        let dealId : bigint= BigInt("44028001538050");
        await RemoveContactRoleFromDeal.removeContactRoleFromDeal(contactId, dealId);
    }
}
RemoveContactRoleFromDeal.initializeAndCall();