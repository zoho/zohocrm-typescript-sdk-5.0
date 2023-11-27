import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetUsersOfUserType
{
    static async getUsersOfUserType(portalName: string, userTypeId: bigint)
    {
        let userTypeUsersOperations: ZOHOCRMSDK.TypeUserUsers.UserTypeUsersOperations = new ZOHOCRMSDK.TypeUserUsers.UserTypeUsersOperations();
        let paraminstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paraminstance.add(ZOHOCRMSDK.TypeUserUsers.GetUsersofUserTypeParam.TYPE, "AllUsers");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.TypeUserUsers.ResponseHandler.MasterModel>= await userTypeUsersOperations.getUsersOfUserType(userTypeId, portalName, paraminstance);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.TypeUserUsers.ResponseWrapper)
            {
                let responseWrapper = responseHandler;
                let users :  ZOHOCRMSDK.TypeUserUsers.Users[] = responseWrapper.getUsers();
                if (users != null)
                {
                    users.forEach(user=>{
                        console.log("Users PersonalityId: " + user.getPersonalityId() + "\n");
                        console.log("Users Confirm: " + user.getConfirm() + "\n");
                        console.log("Users StatusReasonS: " + user.getStatusReasonS() + "\n");
                        console.log("Users InvitedTime: " + user.getInvitedTime().toString() + "\n");
                        console.log("Users Module: " + user.getModule() + "\n");
                        console.log("Users Name: " + user.getName() + "\n");
                        console.log("Users Active: " + user.getActive() + "\n");
                        console.log("Users Email: " + user.getEmail() + "\n");
                    });
                }
                let info : ZOHOCRMSDK.TypeUserUsers.Info= responseWrapper.getInfo();
                if (info != null)
                {
                    if (info.getPerPage() != null)
                    {
                        console.log("User Info PerPage: " + info.getPerPage() + "\n");
                    }
                    if (info.getCount() != null)
                    {
                        console.log("User Info Count: " + info.getCount() + "\n");
                    }
                    if (info.getPage() != null)
                    {
                        console.log("User Info Page: " + info.getPage() + "\n");
                    }
                    if (info.getMoreRecords() != null)
                    {
                        console.log("User Info MoreRecords: " + info.getMoreRecords() + "\n");
                    }
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.TypeUserUsers.APIException)
            {
                let exception : ZOHOCRMSDK.TypeUserUsers.APIException = responseHandler;
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
        let portalName: string = "PortalAPITest101";
        let usertypeId : bigint= BigInt("44028001304019");
        await GetUsersOfUserType.getUsersOfUserType(portalName, usertypeId);
    }
}
GetUsersOfUserType.initializeAndCall();
