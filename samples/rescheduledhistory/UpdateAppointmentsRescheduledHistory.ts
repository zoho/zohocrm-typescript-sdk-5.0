import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class UpdateAppointmentsRescheduledHistory
{
    static  async updateAppointmentsRescheduledHistory()
    {
        let rescheduleHistoryOperations : ZOHOCRMSDK.HistoryReschedule.RescheduleHistoryOperations = new ZOHOCRMSDK.HistoryReschedule.RescheduleHistoryOperations();
        let request : ZOHOCRMSDK.HistoryReschedule.BodyWrapper = new ZOHOCRMSDK.HistoryReschedule.BodyWrapper();
        let data: ZOHOCRMSDK.HistoryReschedule.RescheduleHistory[] = [];
        let rescheduleHistory : ZOHOCRMSDK.HistoryReschedule.RescheduleHistory = new ZOHOCRMSDK.HistoryReschedule.RescheduleHistory();
        rescheduleHistory.setId(BigInt("3342342423"));
        let appointmentName : ZOHOCRMSDK.HistoryReschedule.AppointmentName = new ZOHOCRMSDK.HistoryReschedule.AppointmentName();
        appointmentName.setName("test");
        appointmentName.setId(BigInt("40248394031"));
        await rescheduleHistory.setAppointmentName(appointmentName);
        let rescheduledBy : ZOHOCRMSDK.HistoryReschedule.User = new ZOHOCRMSDK.HistoryReschedule.User();
        rescheduledBy.setId(44028004001n);
        // rescheduledBy.setName("userName");
        await rescheduleHistory.setRescheduledBy(rescheduledBy);
        await rescheduleHistory.setRescheduledFrom(new Date('July 15, 2023 05:35:32'));
        await rescheduleHistory.setRescheduledTo(new Date('July 15, 2023 06:35:32'));
        await rescheduleHistory.setRescheduledTime(new Date());
        await rescheduleHistory.setRescheduleNote("Customer unavailable");
        await rescheduleHistory.setRescheduleReason("By Customer");
        data.push(rescheduleHistory);
        request.setData(data);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.HistoryReschedule.ActionHandler.MasterModel>= await rescheduleHistoryOperations.updateAppointmentsRescheduledHistory(request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject : ZOHOCRMSDK.HistoryReschedule.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.HistoryReschedule.ActionWrapper) {
                    let actionResponses : ZOHOCRMSDK.HistoryReschedule.ActionResponse.MasterModel[]  = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.HistoryReschedule.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.HistoryReschedule.APIException) {
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
                else if (responseObject instanceof ZOHOCRMSDK.HistoryReschedule.APIException) {
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
        await UpdateAppointmentsRescheduledHistory.updateAppointmentsRescheduledHistory();
    }
}
UpdateAppointmentsRescheduledHistory.initializeAndCall();
