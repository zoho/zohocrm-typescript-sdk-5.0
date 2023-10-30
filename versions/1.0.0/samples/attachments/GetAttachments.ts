import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetAttachments
{
    public static async getAttachments(moduleAPIName: string, recordID: bigint) {
        let attachmentsOperations: ZOHOCRMSDK.Attachments.AttachmentsOperations = new ZOHOCRMSDK.Attachments.AttachmentsOperations();
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        //Possible parameters of Get Attachments Operation
        // await paramInstance.add(GetAttachmentsParam.FIELDS, 'id');
        await paramInstance.add(ZOHOCRMSDK.Attachments.GetAttachmentsParam.PAGE, 1);
        await paramInstance.add(ZOHOCRMSDK.Attachments.GetAttachmentsParam.PER_PAGE, 10);
        await paramInstance.add(ZOHOCRMSDK.Attachments.GetAttachmentsParam.FIELDS, "id");
        //Call getAttachments method that takes ParameterMap instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Attachments.ResponseHandler.MasterModel> = await attachmentsOperations.getAttachments(recordID, moduleAPIName, paramInstance);
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Attachments.ResponseHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.Attachments.ResponseWrapper) {
                    let attachments: ZOHOCRMSDK.Attachments.Attachment[] = responseObject.getData();
                    attachments.forEach(attachment => {
                        console.log("Attachment ID: " + attachment.getId());
                        let owner: ZOHOCRMSDK.Users.MinifiedUser = attachment.getOwner();
                        if (owner !== undefined) {
                            console.log("Attachment Owner - Name: " + owner.getName());
                            console.log("Attachment Owner ID: " + owner.getId());
                            console.log("Attachment Owner Email: " + owner.getEmail());
                        }
                        if (attachment.getModifiedTime() !== undefined && attachment.getModifiedTime() !== null) {
                            console.log("Attachment Modified Time: " + attachment.getModifiedTime().toString());
                        }
                        console.log("Attachment File Name: " + attachment.getFileName());
                        console.log("Attachment Created Time: " + attachment.getCreatedTime());
                        console.log("Attachment File Size: " + attachment.getSize());
                        let parentId: ZOHOCRMSDK.Attachments.ParentId = attachment.getParentId();
                        if (parentId !== undefined) {
                            console.log("Attachment parent record Name: " + parentId.getName());
                            console.log("Attachment parent record ID: " + parentId.getId());
                        }
                        if (attachment.getEditable() !== null && attachment.getEditable() !== undefined) {
                            console.log("Attachment is Editable: " + attachment.getEditable().toString());
                        }
                        console.log("Attachment File ID: " + attachment.getFileId());
                        console.log("Attachment File Type: " + attachment.getType());
                        console.log("Attachment seModule: " + attachment.getSeModule());
                        let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = attachment.getModifiedBy();
                        if (modifiedBy !== undefined) {
                            console.log("Attachment Modified By User-Name: " + modifiedBy.getName());
                            console.log("Attachment Modified By User-ID: " + modifiedBy.getId());
                            console.log("Attachment Modified By User-Email: " + modifiedBy.getEmail());
                        }
                        console.log("Attachment State: " + attachment.getState());
                        let createdBy: ZOHOCRMSDK.Users.MinifiedUser = attachment.getCreatedBy();
                        if (createdBy !== undefined) {
                            console.log("Attachment Created By User-Name: " + createdBy.getName());
                            console.log("Attachment Created By User-ID: " + createdBy.getId());
                            console.log("Attachment Created By User-Email: " + createdBy.getEmail());
                        }
                        console.log("Attachment LinkUrl: " + attachment.getLinkUrl());
                    });
                    let info: ZOHOCRMSDK.Attachments.Info = responseObject.getInfo();
                    if (info !== null) {
                        if (info.getPerPage() !== null) {
                            console.log("Attachment Info PerPage: " + info.getPerPage().toString());
                        }
                        if (info.getCount() !== null) {
                            console.log("Attachment Info Count: " + info.getCount().toString());
                        }
                        if (info.getPage() !== null) {
                            console.log("Attachment Info Page: " + info.getPage().toString());
                        }
                        if (info.getMoreRecords() !== null) {
                            console.log("Attachment Info MoreRecords: " + info.getMoreRecords().toString());
                        }
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.Attachments.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any>= responseObject.getDetails();
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                    console.log("Message: " + responseObject.getMessage());
                }
            }
        }
    }
    public static async initializeAndCall()
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
        await GetAttachments.getAttachments( "Leads", BigInt("44028001661043"));
    }
}
GetAttachments.initializeAndCall()
