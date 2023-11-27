import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetAssociations
{
    static async getAssociations(groupId: bigint)
    {
        let userGroupOperations : ZOHOCRMSDK.GroupsUser.UserGroupsOperations= new ZOHOCRMSDK.GroupsUser.UserGroupsOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.GroupsUser.ResponseHandler.MasterModel>= await userGroupOperations.getAssociations(groupId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.GroupsUser.ResponseHandler.MasterModel= response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.GroupsUser.AssociationWrapper)
            {
                let associations :  ZOHOCRMSDK.GroupsUser.AssociationResponse[] = responseHandler.getAssociations();
                if (associations != null)
                {
                    associations.forEach(associationResponse =>{
                        console.log("Associations Type : " + associationResponse.getType());
                        let resource :  ZOHOCRMSDK.GroupsUser.Resource = associationResponse.getResource();
                        if (resource != null)
                        {
                            console.log("Associations Resource Id : " + resource.getId());
                            console.log("Associations Resource Name : " + resource.getName());
                        }
                        let detail :  ZOHOCRMSDK.GroupsUser.AssociationModule = associationResponse.getDetail();
                        if (detail != null)
                        {
                            let module :  ZOHOCRMSDK.Modules.MinifiedModule = detail.getModule();
                            if (module != null)
                            {
                                console.log("Associations Module Id : " + module.getId());
                                console.log("Associations Module Id : " + module.getAPIName());
                                console.log("Associations Module Id : " + module.getModule());
                            }
                        }
                    });
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.GroupsUser.APIException) {
                console.log("Status: " + responseHandler.getStatus().getValue());
                console.log("Code: " + responseHandler.getCode().getValue());
                console.log("Details");
                let details : Map<string, any> = responseHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseHandler.getMessage());
            }
        }
    }
    static async initializeAndCall() {
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
        await GetAssociations.getAssociations(BigInt("44028001326019"));
    }
}
GetAssociations.initializeAndCall();
