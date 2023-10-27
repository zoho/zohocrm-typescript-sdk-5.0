import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class ValidateBeforeTransferForAllTerritories
{
    static async validateBeforeTransferForAllTerritories(userId: bigint)
    {
        let usersTerritoriesOperations = new ZOHOCRMSDK.TerritoriesUsers.UsersTerritoriesOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.TerritoriesUsers.ValidationHandler.MasterModel>= await usersTerritoriesOperations.validateBeforeTransferForAllTerritories(userId);
        if (response != null)
        {
            console.log("Status Code: " +response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.TerritoriesUsers.ValidationWrapper)
            {
                let responseWrapper = responseHandler;
                let userTerritory :  ZOHOCRMSDK.TerritoriesUsers.ValidationGroup.MasterModel[] = responseWrapper.getValidateBeforeTransfer();
                userTerritory.forEach(validation=>{
                    if (validation instanceof ZOHOCRMSDK.TerritoriesUsers.BulkValidation)
                    {
                        console.log("User Territory Validation Alert : " + validation.getAlert() + "\n");
                        console.log("User Territory Validation Assignment : " + validation.getAssignment() + "\n");
                        console.log("User Territory Validation Criteria : " + validation.getCriteria() + "\n");
                        console.log("User Territory Validation Name : " + validation.getName() + "\n");
                        console.log("User Territory Validation Id : " + validation.getId() + "\n");
                    }
                    else if (validation instanceof ZOHOCRMSDK.TerritoriesUsers.Validation)
                    {
                        console.log("User Territory ID: " + validation.getId() + "\n");
                        console.log("User Territory Name: " + validation.getName() + "\n");
                        console.log("User Territory records: " + validation.getRecords() + "\n");
                    }
                });
            }
            else if (responseHandler instanceof ZOHOCRMSDK.TerritoriesUsers.APIException)
            {
                let exception = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details \n");
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
        await ValidateBeforeTransferForAllTerritories.validateBeforeTransferForAllTerritories(BigInt("44028001647189"));
    }
}
ValidateBeforeTransferForAllTerritories.initializeAndCall();
