import * as ZOHOCRMSDK  from "@zohocrm/typescript-sdk-5.0";
export class UpdateRecordsOwner
{
    static async updateRecordsOwner(moduleAPIName: string) {
        let changeOwnerOperations : ZOHOCRMSDK.ChangeOwner.ChangeOwnerOperations= new ZOHOCRMSDK.ChangeOwner.ChangeOwnerOperations(moduleAPIName);
        let massWrapper : ZOHOCRMSDK.ChangeOwner.MassWrapper = new ZOHOCRMSDK.ChangeOwner.MassWrapper();
        let Ids : bigint[] = [];
        Ids.push(BigInt("440280774074"));
        Ids.push(BigInt("44028001661043"));
        massWrapper.setIds(Ids);
        let owner : ZOHOCRMSDK.ChangeOwner.Owner= new ZOHOCRMSDK.ChangeOwner.Owner();
        owner.setId(BigInt("440280254001"));
        await massWrapper.setOwner(owner);
        massWrapper.setNotify(false);
        let relatedModules : ZOHOCRMSDK.ChangeOwner.RelatedModules[]= [];
        let relatedModule : ZOHOCRMSDK.ChangeOwner.RelatedModules = new ZOHOCRMSDK.ChangeOwner.RelatedModules();
        relatedModule.setId(BigInt("44028001438054"));
        relatedModule.setAPIName("Tasks");
        relatedModules.push(relatedModule);
        relatedModule = new ZOHOCRMSDK.ChangeOwner.RelatedModules();
        relatedModule.setId(BigInt("347706114686005"));
        relatedModule.setAPIName("Tasks");
        relatedModules.push(relatedModule);
        massWrapper.setRelatedModules(relatedModules);
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ChangeOwner.ActionHandler.MasterModel>= await changeOwnerOperations.massUpdate(massWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject : ZOHOCRMSDK.ChangeOwner.ActionHandler.MasterModel= response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.ChangeOwner.ActionWrapper) {
                    let changeowners : ZOHOCRMSDK.ChangeOwner.ActionResponse.MasterModel[] = responseObject.getData();
                    changeowners.forEach(changeowner => {
                        if (changeowner instanceof ZOHOCRMSDK.ChangeOwner.SuccessResponse) {
                            console.log("Status:" + changeowner.getStatus().getValue());
                            console.log("Code : " + changeowner.getCode().getValue());
                            console.log("Details: ");
                            let details : Map<string, any>= changeowner.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + changeowner.getMessage());
                        } else if (changeowner instanceof ZOHOCRMSDK.ChangeOwner.APIException) {
                            console.log("Status: " + changeowner.getStatus().getValue());
                            console.log("Code: " + changeowner.getCode().getValue());
                            let details : Map<string, any>= changeowner.getDetails();
                            console.log("Details: ");
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + changeowner.getMessage());
                        }
                    });
                } else if (responseObject instanceof ZOHOCRMSDK.ChangeOwner.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    let details : Map<string, any> = responseObject.getDetails();
                    console.log("Details: ");
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
        let moduleAPIName = "Leads";
        await UpdateRecordsOwner.updateRecordsOwner(moduleAPIName);
    }
}
UpdateRecordsOwner.initializeAndCall();
