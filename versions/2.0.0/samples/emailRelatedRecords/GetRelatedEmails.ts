import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetRelatedEmails
{
    static async getRelatedEmails(moduleAPIName : string, id: bigint)
    {
        let emailRelatedOperations : ZOHOCRMSDK.EmailRecordsRelated.EmailRelatedRecordsOperations= new ZOHOCRMSDK.EmailRecordsRelated.EmailRelatedRecordsOperations(id, moduleAPIName);
        let paramInstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.EmailRecordsRelated.ResponseHandler.MasterModel>= await emailRelatedOperations.getEmailsRelatedRecords(paramInstance);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode());
            if (response.getStatusCode() == 204 || response.getStatusCode() == 304) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.EmailRecordsRelated.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.EmailRecordsRelated.ResponseWrapper)
            {
                let responseWrapper :  ZOHOCRMSDK.EmailRecordsRelated.ResponseWrapper = responseHandler;
                let emailTemplates :  ZOHOCRMSDK.EmailRecordsRelated.Email[] = responseWrapper.getEmails();
                if (emailTemplates != null)
                {
                    emailTemplates.forEach(emailTemplate => {
                        let userDetails: ZOHOCRMSDK.EmailRecordsRelated.UserDetails[] = emailTemplate.getCc();
                        if (userDetails != null) {
                            userDetails.forEach(userDetail => {
                                console.log("GetRelatedEmail user Email: " + userDetail.getEmail());
                                console.log("GetRelatedEmail User Name: " + userDetail.getUserName());
                            })
                        }
                        console.log("getRelatedEmail Summary : " + emailTemplate.getSummary());
                        let owner: ZOHOCRMSDK.Users.MinifiedUser = emailTemplate.getOwner();
                        if (owner != null) {
                            console.log("GetRelatedEmail User Id : " + owner.getId());
                            console.log("GetRelatedEmail User Name : " + owner.getName());
                        }
                        console.log("GetRelatedEmail Read: " + emailTemplate.getRead());
                        console.log("GetRelatedEmail Sent: " + emailTemplate.getSent());
                        console.log("GetRelatedEmail Subject: " + emailTemplate.getSubject());
                        console.log("GetRelatedEmail Intent: " + emailTemplate.getIntent());
                        console.log("GetRelatedEmail Content: " + emailTemplate.getContent());
                        console.log("GetRelatedEmail SentimentInfo: " + emailTemplate.getSentimentInfo() + "\n");
                        console.log("GetRelatedEmail MessageId: " + emailTemplate.getMessageId());
                        console.log("GetRelatedEmail MessageId: " + emailTemplate.getSource());
                        let linkedRecord: ZOHOCRMSDK.EmailRecordsRelated.LinkedRecord = emailTemplate.getLinkedRecord();
                        if (linkedRecord != null) {
                            console.log("GetRelatedEmail LinkedRecord id :" + linkedRecord.getId());
                            let module: ZOHOCRMSDK.EmailRecordsRelated.Module = linkedRecord.getModule();
                            if (module != null) {
                                console.log("GetRelatedEmail LinkedRecord Module APIName : " + module.getAPIName());
                                console.log("GetRelatedEmail LinkedRecord Module Id: " + module.getId());
                            }
                        }
                        console.log("GetRelatedEmail Emotion : " + emailTemplate.getEmotion());
                        let from: ZOHOCRMSDK.EmailRecordsRelated.UserDetails = emailTemplate.getFrom();
                        if (from != null) {
                            console.log("GetRelatedEmail From User Email : " + from.getEmail());
                            console.log("GetRelatedEmail From User Name : " + from.getUserName());
                        }
                        let toUserDetails: ZOHOCRMSDK.EmailRecordsRelated.UserDetails[] = emailTemplate.getTo();
                        if (toUserDetails != null) {
                            toUserDetails.forEach(userDetail => {
                                console.log("GetRelatedEmail User Email : " + userDetail.getEmail());
                                console.log("GetRelatedEmail User Name : " + userDetail.getUserName());
                            });
                        }
                        console.log("GetRelatedEmail Time: ");
                        console.log(emailTemplate.getTime().toString());
                        let status: ZOHOCRMSDK.EmailRecordsRelated.Status[] = emailTemplate.getStatus();
                        if (status != null) {
                            status.forEach(status1 => {
                                console.log("GetRelatedEmail Status Type : " + status1.getType());
                                console.log("GetRelatedEmail Status BouncedTime : " + status1.getBouncedTime());
                                console.log("GetRelatedEmail Status BouncedReason : " + status1.getBouncedReason());
                            });
                        }
                    });
                }
                let info :  ZOHOCRMSDK.EmailRecordsRelated.Info = responseWrapper.getInfo();
                if (info != null)
                {
                    if (info.getCount() != null)
                    {
                        console.log("Record Info Count: " + info.getCount() );
                    }
                    if (info.getNextIndex() != null)
                    {
                        console.log("Record Info NextIndex: " + info.getNextIndex() );
                    }
                    if (info.getPrevIndex() != null)
                    {
                        console.log("Record Info PrevIndex: " + info.getPrevIndex() );
                    }
                    if (info.getPerPage() != null)
                    {
                        console.log("Record Info PerPage: " + info.getPerPage() );
                    }
                    if (info.getMoreRecords() != null)
                    {
                        console.log("Record Info MoreRecords: " + info.getMoreRecords() );
                    }
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.EmailRecordsRelated.APIException)
            {
                console.log("Status: " + responseHandler.getStatus().getValue());
                console.log("Code: " + responseHandler.getCode().getValue());
                console.log("Details");
                let details :  Map<string, any>= responseHandler.getDetails();
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
        let moduleAPIName: string = "leads";
        let id : bigint= BigInt("440280774074");
        await GetRelatedEmails.getRelatedEmails(moduleAPIName, id);
    }
}
GetRelatedEmails.initializeAndCall();