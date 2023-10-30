import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetAppointmentRescheduledHistory
{
    static async getAppointmentRescheduledHistory(id:bigint)
    {
        let rescheduleHistoryOperations : ZOHOCRMSDK.HistoryReschedule.RescheduleHistoryOperations = new ZOHOCRMSDK.HistoryReschedule.RescheduleHistoryOperations();
        let parameterInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await parameterInstance.add(ZOHOCRMSDK.HistoryReschedule.GetAppointmentRescheduledHistoryParam.FIELDS, "id");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.HistoryReschedule.ResponseHandler.MasterModel> = await rescheduleHistoryOperations.getAppointmentRescheduledHistory(id, parameterInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject : ZOHOCRMSDK.HistoryReschedule.ResponseHandler.MasterModel = response.getObject();
            if (responseObject instanceof ZOHOCRMSDK.HistoryReschedule.ResponseWrapper)
            {
                let data : ZOHOCRMSDK.HistoryReschedule.RescheduleHistory[]  = responseObject.getData();
                if (data != null)
                {
                    data.forEach(history => {
                        console.log("CurrencySymbol: " + history.getCurrencySymbol());
                        console.log("reviewProcess: " + history.getReviewProcess());
                        console.log("rescheduleReason: " + history.getRescheduleReason());
                        console.log("sharingPermission: " + history.getSharingPermission());
                        console.log("Name: " + history.getName());
                        console.log("Review: " + history.getReview());
                        console.log("State: " + history.getState());
                        console.log("canvasId: " + history.getCanvasId());
                        console.log("processFlow: " + history.getProcessFlow());
                        console.log("Id: " + history.getId());
                        console.log("ziaVisions: " + history.getZiaVisions());
                        console.log("approved: " + history.getApproved());
                        console.log("ziaVisions: " + history.getZiaVisions());
                        console.log("editable: " + history.getEditable());
                        console.log("orchestration: " + history.getOrchestration());
                        console.log("inMerge: " + history.getInMerge());
                        console.log("approvalState: " + history.getApprovalState());
                        console.log("rescheduleNote: " + history.getRescheduleNote());
                        console.log("rescheduledTo: " + history.getRescheduledTo());
                        console.log("rescheduledTime: " + history.getRescheduledTime());
                        console.log("rescheduledFrom: " + history.getRescheduledFrom());
                        let appointmentName :  ZOHOCRMSDK.HistoryReschedule.AppointmentName = history.getAppointmentName();
                        if (appointmentName != null)
                        {
                            console.log("Appointment Name :"+ appointmentName.getName());
                            console.log("Appointment Id : " + appointmentName.getId());
                        }
                        let approval: ZOHOCRMSDK.HistoryReschedule.Approval = history.getApproval();
                        if (approval != null)
                        {
                            console.log("delegate : " + approval.getDelegate());
                            console.log("approve : " + approval.getApprove());
                            console.log("Reject : " + approval.getReject());
                            console.log("resubmit : " + approval.getResubmit());
                        }
                        let modifiedBy : ZOHOCRMSDK.HistoryReschedule.User
                            = history.getModifiedBy();
                        if (modifiedBy != null)
                        {
                            console.log("modifiedBy : " + modifiedBy.getId());
                            console.log("modifiedBy : " + modifiedBy.getName());
                            console.log("modifiedBy : " + modifiedBy.getEmail());
                        }
                        let rescheduledBy : ZOHOCRMSDK.HistoryReschedule.User = history.getRescheduledBy();
                        if (rescheduledBy != null)
                        {
                            console.log("rescheduledBy : " + rescheduledBy.getId());
                            console.log("rescheduledBy : " + rescheduledBy.getName());
                            console.log("rescheduledBy" + rescheduledBy.getEmail());
                        }
                        let createdBy : ZOHOCRMSDK.HistoryReschedule.User = history.getCreatedBy();
                        if (createdBy != null)
                        {
                            console.log("createdBy : " + createdBy.getId());
                            console.log("createdBy : " + createdBy.getName());
                            console.log("createdBy : " + createdBy.getEmail());
                        }
                    });
                }
                let info: ZOHOCRMSDK.HistoryReschedule.Info[] = responseObject.getInfo();
                if (info != null) {
                    info.forEach(info1 => {
                        if (info1 != null) {
                            if (info1.getPerPage() != null) {
                                console.log("RelatedRecord Info PerPage: " + info1.getPerPage().toString());
                            }
                            if (info1.getCount() != null) {
                                console.log("RelatedRecord Info Count: " + info1.getCount().toString());
                            }
                            if (info1.getPage() != null) {
                                console.log("RelatedRecord Info Page: " + info1.getPage().toString());
                            }
                            if (info1.getMoreRecords() != null) {
                                console.log("RelatedRecord Info MoreRecords: " + info1.getMoreRecords().toString());
                            }
                        }
                    });
                }
            }
            else if (responseObject instanceof ZOHOCRMSDK.AppointmentPreference.APIException) {
                console.log("Status: " + responseObject.getStatus().getValue());
                console.log("Code: " + responseObject.getCode().getValue());
                console.log("Details");
                let details: Map<string, any>  = responseObject.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseObject.getMessage());
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
        await GetAppointmentRescheduledHistory.getAppointmentRescheduledHistory(BigInt("44028001631048"));
    }
}
GetAppointmentRescheduledHistory.initializeAndCall();
