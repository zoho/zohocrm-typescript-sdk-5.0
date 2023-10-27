import * as ZOHOCRMSDK  from "@zohocrm/typescript-sdk-5.0";
export class UpdateRecordOwner
{
    static async updateRecordOwner(moduleAPIName: string,recordId :bigint)
    {
        let changeOwnerOperations : ZOHOCRMSDK.ChangeOwner.ChangeOwnerOperations= new ZOHOCRMSDK.ChangeOwner.ChangeOwnerOperations(moduleAPIName);
        let bodyWrapper :ZOHOCRMSDK.ChangeOwner.BodyWrapper= new ZOHOCRMSDK.ChangeOwner.BodyWrapper();
        let owner : ZOHOCRMSDK.ChangeOwner.Owner= new ZOHOCRMSDK.ChangeOwner.Owner();
        owner.setId(BigInt("440280254001"));
        await bodyWrapper.setOwner(owner);
        bodyWrapper.setNotify(true);
        let relatedModules : ZOHOCRMSDK.ChangeOwner.RelatedModules[] = [];
        let relatedModule: ZOHOCRMSDK.ChangeOwner.RelatedModules = new ZOHOCRMSDK.ChangeOwner.RelatedModules();
        relatedModule.setId(BigInt("44028001438054"));
        relatedModule.setAPIName("Tasks");
        relatedModules.push(relatedModule);
        relatedModule = new ZOHOCRMSDK.ChangeOwner.RelatedModules();
        relatedModule.setId(BigInt("347706114686005"));
        relatedModule.setAPIName("Tasks");
        relatedModules.push(relatedModule);
        bodyWrapper.setRelatedModules(relatedModules);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ChangeOwner.ActionHandler.MasterModel>= await changeOwnerOperations.singleUpdate(recordId, bodyWrapper);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            let responseObject : ZOHOCRMSDK.ChangeOwner.ActionHandler.MasterModel = response.getObject();
            if(responseObject != null)
            {
                if(responseObject instanceof ZOHOCRMSDK.ChangeOwner.ActionWrapper)
                {
                    let changeowners : ZOHOCRMSDK.ChangeOwner.ActionResponse.MasterModel[] = responseObject.getData();
                    changeowners.forEach(changeowner => {
                        if(changeowner instanceof ZOHOCRMSDK.ChangeOwner.SuccessResponse)
                        {
                            console.log("Status:" + changeowner.getStatus().getValue() + "\n");
                            console.log("Code : "+ changeowner.getCode().getValue() + "\n");
                            console.log("Details: " + "\n");
                            let details : Map<string, any> = changeowner.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + changeowner.getMessage() + "\n");
                        }
                        else if( changeowner instanceof ZOHOCRMSDK.ChangeOwner.APIException)
                        {
                            console.log("Status: " + changeowner.getStatus().getValue() + "\n");
                            console.log("Code: " + changeowner.getCode().getValue() + "\n");
                            let details : Map<string, any>= changeowner.getDetails();
                            console.log("Details: " + "\n");
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + changeowner.getMessage() +"\n");
                        }
                    });
                }
                else if(responseObject instanceof ZOHOCRMSDK.ChangeOwner.APIException)
                {
                    console.log("Status: " + responseObject.getStatus().getValue() + "\n");
                    console.log("Code: " + responseObject.getCode().getValue() + "\n");
                    let details : Map<string, any>= responseObject.getDetails();
                    console.log("Details: " + "\n");
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key) + "\n");
                        });
                    }
                    console.log("Message: " + responseObject.getMessage() + "\n");
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
        let recordId = BigInt("44028001629014");
        let moduleAPIName = "Leads";
        await UpdateRecordOwner.updateRecordOwner(moduleAPIName, recordId);
    }
}
UpdateRecordOwner.initializeAndCall();
