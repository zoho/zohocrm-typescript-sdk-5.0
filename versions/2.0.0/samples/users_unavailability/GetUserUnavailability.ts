import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetUserUnavailability {
    static async getUserUnavailabilityHours(id: string)
    {
        let usersUnavailabilityOperations : ZOHOCRMSDK.UnavailabilityUsers.UsersUnavailabilityOperations = new ZOHOCRMSDK.UnavailabilityUsers.UsersUnavailabilityOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.UnavailabilityUsers.ResponseHandler.MasterModel>= await usersUnavailabilityOperations.getUserUnavailability(id, paramInstance);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if(responseObject != null)
            {
                if (responseObject instanceof ZOHOCRMSDK.UnavailabilityUsers.ResponseWrapper)
                {
                    let users :  ZOHOCRMSDK.UnavailabilityUsers.UsersUnavailability[] = responseObject.getUsersUnavailability();
                    users.forEach(usersUnavailability => {
                        console.log("UsersUnavailability Comments: " + usersUnavailability.getComments());
                        console.log("UsersUnavailability From: " + usersUnavailability.getFrom());
                        console.log("UsersUnavailability Id: " + usersUnavailability.getId());
                        console.log("UsersUnavailability to: " + usersUnavailability.getTo());
                        let user :  ZOHOCRMSDK.UnavailabilityUsers.User = usersUnavailability.getUser();
                        if (user != null)
                        {
                            console.log("UsersUnavailability User-Name: " + user.getName());
                            console.log("UsersUnavailability User-Id: " + user.getId());
                            console.log("UsersUnavailability User-ZuId: " + user.getZuid());
                        }
                    });
                    let info : ZOHOCRMSDK.UnavailabilityUsers.Info = responseObject.getInfo();
                    if (info != null)
                    {
                        if (info.getPerPage() != null)
                        {
                            console.log("User Info PerPage: " + info.getPerPage().toString());
                        }
                        if (info.getCount() != null)
                        {
                            console.log("User Info Count: " + info.getCount().toString());
                        }
                        if (info.getPage() != null)
                        {
                            console.log("User Info Page: " + info.getPage().toString());
                        }
                        if (info.getMoreRecords() != null)
                        {
                            console.log("User Info MoreRecords: " + info.getMoreRecords().toString());
                        }
                    }
                }
                else if(responseObject instanceof ZOHOCRMSDK.UnavailabilityUsers.APIException)
                {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    let details = responseObject.getDetails();
                    console.log("Details: ");
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
        await GetUserUnavailability.getUserUnavailabilityHours("44028001627141");
    }
}
GetUserUnavailability.initializeAndCall();
