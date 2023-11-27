import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetRelatedRecordsUsingExternalId
{
    public static async getRelatedRecordsUsingExternalId(moduleAPIName: string, externalValue: string, relatedListAPIName: string) {
        //example
        //let moduleAPIName = "Products";
        // let externalValue = "external";
        // let relatedListAPIName = "Price_Books";
        let xExternal = "Leads.external123";
        let relatedRecordsOperations: ZOHOCRMSDK.RecordsRelated.RelatedRecordsOperations = new ZOHOCRMSDK.RecordsRelated.RelatedRecordsOperations(relatedListAPIName, moduleAPIName, xExternal);
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Get Related Records operation */
        await paramInstance.add(ZOHOCRMSDK.RecordsRelated.GetRelatedRecordsParam.PAGE, 1);
        await paramInstance.add(ZOHOCRMSDK.RecordsRelated.GetRelatedRecordsParam.PER_PAGE, 200);
        await paramInstance.add(ZOHOCRMSDK.RecordsRelated.GetRelatedRecordsParam.FIELDS, "id");
        let headerInstance: ZOHOCRMSDK.HeaderMap = new ZOHOCRMSDK.HeaderMap();
        /* Possible headers for Get Related Records operation */
        await headerInstance.add(ZOHOCRMSDK.RecordsRelated.GetRelatedRecordsHeader.IF_MODIFIED_SINCE, new Date('October 15, 2019 05:35:32'));
        //Call getRelatedRecordsUsingExternalId method that takes externalValue, ZOHOCRMSDK.ParameterMap instance and ZOHOCRMSDK.HeaderMap instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.RecordsRelated.ResponseHandler.MasterModel> = await relatedRecordsOperations.getRelatedRecordsUsingExternalId(externalValue, paramInstance, headerInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.RecordsRelated.ResponseHandler.MasterModel = response.getObject();
            if (responseObject instanceof ZOHOCRMSDK.RecordsRelated.ResponseWrapper) {
                let records: ZOHOCRMSDK.Record.Record[] = responseObject.getData();
                for (let record of records) {
                    console.log("RelatedRecord ID: " + record.getId());
                    let createdBy: ZOHOCRMSDK.Users.MinifiedUser = record.getCreatedBy();
                    if (createdBy != null) {
                        console.log("RelatedRecord Created By User-ID: " + createdBy.getId());
                        console.log("RelatedRecord Created By User-Name: " + createdBy.getName());
                        console.log("RelatedRecord Created By User-Email: " + createdBy.getEmail());
                    }
                    console.log("RelatedRecord CreatedTime: " + record.getCreatedTime());
                    let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = record.getModifiedBy();
                    if (modifiedBy != null) {
                        console.log("RelatedRecord Modified By User-ID: " + modifiedBy.getId());
                        console.log("RelatedRecord Modified By User-Name: " + modifiedBy.getName());
                        console.log("RelatedRecord Modified By User-Email: " + modifiedBy.getEmail());
                    }
                    console.log("RelatedRecord ModifiedTime: " + record.getModifiedTime());
                    let tags: ZOHOCRMSDK.Tags.Tag[] = record.getTag();
                    if (tags != null) {
                        tags.forEach(tag => {
                            console.log("RelatedRecord Tag Name: " + tag.getName());
                            console.log("RelatedRecord Tag ID: " + tag.getId());
                        });
                    }
                    //To get particular field value
                    console.log("RelatedRecord Field Value: " + record.getKeyValue("Last_Name"));// FieldApiName
                    console.log("RelatedRecord KeyValues: ");
                    let keyValues: Map<string, any> = record.getKeyValues();
                    let keyArray: string[] = Array.from(keyValues.keys());
                    for (let keyName of keyArray) {
                        let value = keyValues.get(keyName);
                        if (Array.isArray(value)) {
                            if (value.length > 0) {
                                if (value[0] instanceof ZOHOCRMSDK.Record.FileDetails) {
                                    let fileDetails: ZOHOCRMSDK.Record.FileDetails[] = value;
                                    fileDetails.forEach(fileDetail => {
                                        console.log("Record FileDetails FileIds: " + fileDetail.getFileIdS());
                                        console.log("Record FileDetails FileNameS: " + fileDetail.getFileNameS());
                                        console.log("Record FileDetails SizeS: " + fileDetail.getSizeS());
                                        console.log("Record FileDetails Id: " + fileDetail.getId());
                                    });
                                }
                                else if (value[0] instanceof ZOHOCRMSDK.Choice) {
                                    let choiceArray: ZOHOCRMSDK.Choice<any>[] = value;
                                    console.log(keyName);
                                    console.log("Values");
                                    choiceArray.forEach(eachChoice => {
                                        console.log(eachChoice.getValue());
                                    });
                                }
                                else if (value[0] instanceof ZOHOCRMSDK.Tags.Tag) {
                                    let tags: ZOHOCRMSDK.Tags.Tag[] = value;
                                    tags.forEach(tag => {
                                        console.log("Record Tag Name: " + tag.getName());
                                        console.log("Record Tag ID: " + tag.getId());
                                    });
                                }
                                else if (value[0] instanceof ZOHOCRMSDK.Record.PricingDetails) {
                                    let pricingDetails: ZOHOCRMSDK.Record.PricingDetails[] = value;
                                    pricingDetails.forEach(pricingDetail => {
                                        console.log("Record PricingDetails ToRange: " + pricingDetail.getToRange().toString());
                                        console.log("Record PricingDetails Discount: " + pricingDetail.getDiscount().toString());
                                        console.log("Record PricingDetails ID: " + pricingDetail.getId());
                                        console.log("Record PricingDetails FromRange: " + pricingDetail.getFromRange().toString());
                                    });
                                }
                                else if (value[0] instanceof ZOHOCRMSDK.Record.Participants) {
                                    let participants: ZOHOCRMSDK.Record.Participants[] = value;
                                    participants.forEach(participant => {
                                        console.log("Record Participants Name: " + participant.getName());
                                        console.log("Record Participants Invited: " + participant.getInvited().toString());
                                        console.log("Record Participants ID: " + participant.getId());
                                        console.log("Record Participants Type: " + participant.getType());
                                        console.log("Record Participants Participant: " + participant.getParticipant());
                                        console.log("Record Participants Status: " + participant.getStatus());
                                    });
                                }
                                else if (value[0] instanceof ZOHOCRMSDK.Record.Record) {
                                    let recordArray: ZOHOCRMSDK.Record.Record[] = value;
                                    recordArray.forEach(record => {
                                        Array.from(record.getKeyValues().keys()).forEach(key => {
                                            console.log(key + ": " + record.getKeyValues().get(key));
                                        });
                                    });
                                }
                                else if (value[0] instanceof ZOHOCRMSDK.Record.LineTax) {
                                    let lineTaxes: ZOHOCRMSDK.Record.LineTax[] = value;
                                    lineTaxes.forEach(lineTax => {
                                        console.log("Record ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());
                                        console.log("Record ProductDetails LineTax Name: " + lineTax.getName());
                                        console.log("Record ProductDetails LineTax Id: " + lineTax.getId());
                                        console.log("Record ProductDetails LineTax Value: " + lineTax.getValue().toString());
                                    });
                                }
                                else if (value[0] instanceof ZOHOCRMSDK.Record.Comment) {
                                    let comments: ZOHOCRMSDK.Record.Comment[] = value;
                                    comments.forEach(comment => {
                                        console.log("Record Comment CommentedBy: " + comment.getCommentedBy());
                                        console.log("Record Comment CommentedTime: " + comment.getCommentedTime().toString());
                                        console.log("Record Comment CommentContent: " + comment.getCommentContent());
                                        console.log("Record Comment Id: " + comment.getId());
                                    });
                                }
                                else if (value[0] instanceof ZOHOCRMSDK.Attachments.Attachment) {
                                    let attachments: ZOHOCRMSDK.Attachments.Attachment[] = value;
                                    attachments.forEach(attachment => {
                                        console.log("Record Attachment ID: " + attachment.getId());
                                        let owner: ZOHOCRMSDK.Users.MinifiedUser = attachment.getOwner();
                                        if (owner != null) {
                                            console.log("Record Attachment Owner - Name: " + owner.getName());
                                            console.log("Record Attachment Owner ID: " + owner.getId());
                                            console.log("Record Attachment Owner Email: " + owner.getEmail());
                                        }
                                        console.log("Record Attachment Modified Time: " + attachment.getModifiedTime().toString());
                                        console.log("Record Attachment File Name: " + attachment.getFileName());
                                        console.log("Record Attachment Created Time: " + attachment.getCreatedTime());
                                        console.log("Record Attachment File Size: " + attachment.getSize());
                                        let parentId: ZOHOCRMSDK.Attachments.ParentId = attachment.getParentId();
                                        if (parentId != null) {
                                            console.log("Record Attachment parent record Name: " + parentId.getName());
                                            console.log("Record Attachment parent record ID: " + parentId.getId());
                                        }
                                        console.log("Record Attachment is Editable: " + attachment.getEditable().toString());
                                        console.log("Record Attachment File ID: " + attachment.getFileId());
                                        console.log("Record Attachment File Type: " + attachment.getType());
                                        console.log("Record Attachment seModule: " + attachment.getSeModule());
                                        let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = attachment.getModifiedBy();
                                        if (modifiedBy != null) {
                                            console.log("Record Attachment Modified By User-Name: " + modifiedBy.getName());
                                            console.log("Record Attachment Modified By User-ID: " + modifiedBy.getId());
                                            console.log("Record Attachment Modified By User-Email: " + modifiedBy.getEmail());
                                        }
                                        console.log("Record Attachment State: " + attachment.getState());
                                        let createdBy: ZOHOCRMSDK.Users.MinifiedUser = attachment.getCreatedBy();
                                        if (createdBy != null) {
                                            console.log("Record Attachment Created By User-Name: " + createdBy.getName());
                                            console.log("Record Attachment Created By User-ID: " + createdBy.getId());
                                            console.log("Record Attachment Created By User-Email: " + createdBy.getEmail());
                                        }
                                        console.log("Record Attachment LinkUrl: " + attachment.getLinkUrl());
                                    });
                                }
                                else if (value[0] instanceof ZOHOCRMSDK.Record.ImageUpload) {
                                    let imageUploads: ZOHOCRMSDK.Record.ImageUpload[] = value;
                                    imageUploads.forEach(imageUpload => {
                                        console.log("Record  Description: " + imageUpload.getDescriptionS());
                                        console.log("Record  FileIds: " + imageUpload.getFileIdS());
                                        console.log("Record  FileNameS: " + imageUpload.getFileNameS());
                                        console.log("Record PreviewIdS: " + imageUpload.getPreviewIdS());
                                        console.log("Record  SizeS: " + imageUpload.getSizeS());
                                        console.log("Record  States: " + imageUpload.getStateS());
                                        console.log("Record  ID: " + imageUpload.getId());
                                        console.log("Record  SequenceNumber: " + imageUpload.getSequenceNumberS());
                                    });
                                }
                                else if (value[0] instanceof ZOHOCRMSDK.Record.Reminder) {
                                    let reminders: ZOHOCRMSDK.Record.Reminder[] = value;
                                    reminders.forEach(reminder => {
                                        console.log("Reminder Period: " + reminder.getPeriod());
                                        console.log("Reminder Unit: " + reminder.getUnit());
                                    });
                                }
                                else {
                                    console.log(keyName + ": " + value);
                                }
                            }
                        }
                        else if (value instanceof ZOHOCRMSDK.Users.MinifiedUser) {
                            console.log("Record " + keyName + " User-ID: " + value.getId());
                            console.log("Record " + keyName + " User-Name: " + value.getName());
                            console.log("Record " + keyName + " User-Email: " + value.getEmail());
                        }
                        else if (value instanceof ZOHOCRMSDK.Layouts.Layouts) {
                            console.log(keyName + " ID: " + value.getId());
                            console.log(keyName + " Name: " + value.getName());
                        }
                        else if (value instanceof ZOHOCRMSDK.Record.Record) {
                            console.log(keyName + " Record ID: " + value.getId());
                            console.log(keyName + " Record Name: " + value.getKeyValue("name"));
                        }
                        else if (value instanceof ZOHOCRMSDK.Choice) {
                            console.log(keyName + ": " + value.getValue());
                        }
                        else if (value instanceof ZOHOCRMSDK.Record.RemindAt) {
                            console.log(keyName + ": " + value.getAlarm());
                        }
                        else if (value instanceof ZOHOCRMSDK.Record.RecurringActivity) {
                            console.log(keyName);
                            console.log("RRULE: " + value.getRrule());
                        }
                        else if (value instanceof ZOHOCRMSDK.Record.Consent) {
                            console.log("Record Consent ID: " + value.getId());
                            let owner: ZOHOCRMSDK.Users.MinifiedUser = value.getOwner();
                            if (owner != null) {
                                console.log("Record Consent Owner Name: " + owner.getName());
                                console.log("Record Consent Owner ID: " + owner.getId());
                                console.log("Record Consent Owner Email: " + owner.getEmail());
                            }
                            let consentCreatedBy: ZOHOCRMSDK.Users.MinifiedUser = value.getCreatedBy();
                            if (consentCreatedBy != null) {
                                console.log("Record Consent CreatedBy Name: " + consentCreatedBy.getName());
                                console.log("Record Consent CreatedBy ID: " + consentCreatedBy.getId());
                                console.log("Record Consent CreatedBy Email: " + consentCreatedBy.getEmail());
                            }
                            let consentModifiedBy: ZOHOCRMSDK.Users.MinifiedUser = value.getModifiedBy();
                            if (consentModifiedBy != null) {
                                console.log("Record Consent ModifiedBy Name: " + consentModifiedBy.getName());
                                console.log("Record Consent ModifiedBy ID: " + consentModifiedBy.getId());
                                console.log("Record Consent ModifiedBy Email: " + consentModifiedBy.getEmail());
                            }
                            console.log("Record Consent CreatedTime: " + value.getCreatedTime());
                            console.log("Record Consent ModifiedTime: " + value.getModifiedTime());
                            console.log("Record Consent ContactThroughEmail: " + value.getContactThroughEmail());
                            console.log("Record Consent ContactThroughSocial: " + value.getContactThroughSocial());
                            console.log("Record Consent ContactThroughSurvey: " + value.getContactThroughSurvey());
                            console.log("Record Consent ContactThroughPhone: " + value.getContactThroughPhone());
                            console.log("Record Consent MailSentTime: " + value.getMailSentTime().toString());
                            console.log("Record Consent ConsentDate: " + value.getConsentDate().toString());
                            console.log("Record Consent ConsentRemarks: " + value.getConsentRemarks());
                            console.log("Record Consent ConsentThrough: " + value.getConsentThrough());
                            console.log("Record Consent DataProcessingBasis: " + value.getDataProcessingBasis());
                            //To get custom values
                            console.log("Record Consent Lawful Reason: " + value.getKeyValue("Lawful_Reason"));
                        }
                        else if (value instanceof Map) {
                            console.log(keyName);
                            Array.from(value.keys()).forEach(key => {
                                console.log(key + ": " + value.get(key));
                            });
                        }
                        else {
                            console.log(keyName + ": " + value);
                        }
                    }
                }
                let info: ZOHOCRMSDK.Record.Info = responseObject.getInfo();
                if (info != null) {
                    if (info.getPerPage() != null) {
                        console.log("RelatedRecord Info PerPage: " + info.getPerPage().toString());
                    }
                    if (info.getCount() != null) {
                        console.log("RelatedRecord Info Count: " + info.getCount().toString());
                    }
                    if (info.getPage() != null) {
                        console.log("RelatedRecord Info Page: " + info.getPage().toString());
                    }
                    if (info.getMoreRecords() != null) {
                        console.log("RelatedRecord Info MoreRecords: " + info.getMoreRecords().toString());
                    }
                }
            }
            else if (responseObject instanceof ZOHOCRMSDK.RecordsRelated.APIException) {
                console.log("Status: " + responseObject.getStatus().getValue());
                console.log("Code: " + responseObject.getCode().getValue());
                console.log("Details");
                let details: Map<string, any> = responseObject.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseObject.getMessage().getValue());
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
        let moduleAPIName : string= "Leads";
        let exteralValue: string = "12345";
        let relatedListAPIName : string= "Notes";
        await GetRelatedRecordsUsingExternalId.getRelatedRecordsUsingExternalId(moduleAPIName, exteralValue, relatedListAPIName);
    }
}
GetRelatedRecordsUsingExternalId.initializeAndCall();
