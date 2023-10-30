import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetRelatedList
{
    static async getRelatedList(moduleAPIName: string, relatedListId: bigint) {
        //example
        //let moduleAPIName = "Contacts";
        // let relatedListId = 340964362003n;
        let relatedListsOperations: ZOHOCRMSDK.ListsRelated.RelatedListsOperations = new ZOHOCRMSDK.ListsRelated.RelatedListsOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.ListsRelated.GetRelatedListParam.MODULE, moduleAPIName);
        //Call getRelatedList method which takes relatedListId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ListsRelated.ResponseHandler.MasterModel> = await relatedListsOperations.getRelatedList(relatedListId, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.ListsRelated.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.ListsRelated.ResponseWrapper) {
                    let relatedLists: ZOHOCRMSDK.ListsRelated.RelatedList[] = responseObject.getRelatedLists();
                    relatedLists.forEach(relatedList => {
                        console.log("RelatedList SequenceNumber: " + relatedList.getSequenceNumber());
                        console.log("RelatedList DisplayLabel: " + relatedList.getDisplayLabel());
                        console.log("RelatedList APIName: " + relatedList.getAPIName());
                        console.log("RelatedList Module: " + relatedList.getModule());
                        console.log("RelatedList Name: " + relatedList.getName());
                        console.log("RelatedList Action: " + relatedList.getAction());
                        console.log("RelatedList ID: " + relatedList.getId());
                        console.log("RelatedList Href: " + relatedList.getHref());
                        console.log("RelatedList Type: " + relatedList.getType());
                        console.log("RelatedList Connectedmodule: " + relatedList.getConnectedmodule());
                        console.log("RelatedList Linkingmodule: " + relatedList.getLinkingmodule());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.ListsRelated.APIException) {
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
        await GetRelatedList.getRelatedList("Leads", BigInt("440280236100"));
    }
}
GetRelatedList.initializeAndCall()
