import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class UserTransferAndDelete
{
    static async userTransferAndDelete(id: bigint)
    {
        let usersTransferDeleteOperations : ZOHOCRMSDK.DeleteTransferUsers.UsersTransferDeleteOperations= new ZOHOCRMSDK.DeleteTransferUsers.UsersTransferDeleteOperations();
        let request : ZOHOCRMSDK.DeleteTransferUsers.BodyWrapper= new ZOHOCRMSDK.DeleteTransferUsers.BodyWrapper();
        let transferAndDeletes : ZOHOCRMSDK.DeleteTransferUsers.TransferAndDelete[] = [];
        let transferAndDelete : ZOHOCRMSDK.DeleteTransferUsers.TransferAndDelete = new ZOHOCRMSDK.DeleteTransferUsers.TransferAndDelete();
        transferAndDelete.setId(BigInt("3242345234243"));
        let transfer = new ZOHOCRMSDK.DeleteTransferUsers.Transfer();
        transfer.setRecords(true);
        transfer.setAssignment(true);
        transfer.setCriteria(false);
        transfer.setId(BigInt("34349178323"));
        await transferAndDelete.setTransfer(transfer);
        let moveSubordinate : ZOHOCRMSDK.DeleteTransferUsers.MoveSubordinate = new ZOHOCRMSDK.DeleteTransferUsers.MoveSubordinate();
        moveSubordinate.setId(BigInt("323234872984342"));
        await transferAndDelete.setMoveSubordinate(moveSubordinate);
        transferAndDeletes.push(transferAndDelete);
        request.setTransferAndDelete(transferAndDeletes);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.DeleteTransferUsers.ActionHandler.MasterModel> = await usersTransferDeleteOperations.userTransferAndDelete(id, request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.DeleteTransferUsers.ActionWrapper) {
                    let actionResponses :  ZOHOCRMSDK.DeleteTransferUsers.ActionResponse.MasterModel[] = responseObject.getTransferAndDelete();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.DeleteTransferUsers.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.DeleteTransferUsers.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.DeleteTransferUsers.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any> = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage().getValue());
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
        await UserTransferAndDelete.userTransferAndDelete(BigInt("334543432n"));
    }
}
UserTransferAndDelete.initializeAndCall();