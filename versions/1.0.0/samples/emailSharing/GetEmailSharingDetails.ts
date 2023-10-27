import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetEmailSharingDetails
{
    static async getEmailSharingDetails(recordId: bigint, module: string)
    {
        let emailSharingOperations : ZOHOCRMSDK.EmailSharing.EmailSharingOperations= new ZOHOCRMSDK.EmailSharing.EmailSharingOperations(recordId, module);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.EmailSharing.ResponseHandler.MasterModel>= await emailSharingOperations.getEmailSharingDetails();
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler: ZOHOCRMSDK.EmailSharing.ResponseHandler.MasterModel = response.getObject();
            if  (responseHandler instanceof ZOHOCRMSDK.EmailSharing.ResponseWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.EmailSharing.ResponseWrapper= responseHandler;
                let emailSharingDetails : ZOHOCRMSDK.EmailSharing.GetEmailSharing[] = responseWrapper.getEmailssharingdetails();
                if (emailSharingDetails != null)
                {
                    emailSharingDetails.forEach(getEmailSharing => {
                        console.log("Email Sharing_Details: " + "\n");
                        let shareFromUsers :  ZOHOCRMSDK.EmailSharing.ShareFromUser[] = getEmailSharing.getShareFromUsers();
                        if (shareFromUsers != null)
                        {
                            console.log("ShareFromUSers :  \n");
                            shareFromUsers.forEach(shareFromUSer => {
                                console.log("id: " + shareFromUSer.getId() + "\n");
                                console.log("name : " + shareFromUSer.getName() + "\n");
                                console.log("type : " + shareFromUSer.getType() + "\n");
                            });
                        }
                        let availableTypes : string[] = getEmailSharing.getAvailableTypes();
                        if (availableTypes != null)
                        {
                            console.log("AvailableTypes: " + "\n");
                            availableTypes.forEach(availableType => {
                                console.log(availableType + "\n");
                            });
                        }
                    })
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.EmailSharing.APIException)
            {
                console.log("Status: " + responseHandler.getStatus().getValue());
                console.log("Code: " + responseHandler.getCode().getValue());
                console.log("Details");
                let details: Map<string, any> = responseHandler.getDetails();
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
        let moduleAPIName: string = "Leads";
        let id : bigint= BigInt("440280774074");
        await GetEmailSharingDetails.getEmailSharingDetails(id, moduleAPIName);
    }
}
GetEmailSharingDetails.initializeAndCall();
