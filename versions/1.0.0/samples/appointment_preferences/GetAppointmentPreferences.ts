import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";

export class GetAppointmentPreferences
{
    public static async getAppointmentPreference()
    {
        let appointmentPreferenceOperations : ZOHOCRMSDK.AppointmentPreference.AppointmentPreferenceOperations = new ZOHOCRMSDK.AppointmentPreference.AppointmentPreferenceOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.AppointmentPreference.GetAppointmentPreferenceParam.INCLUDE, "");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.AppointmentPreference.ResponseHandler.MasterModel> = await appointmentPreferenceOperations.getAppointmentPreference(paramInstance);
        if (response != null)
        {
            console.log("Status code " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.AppointmentPreference.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.AppointmentPreference.ResponseWrapper) {
                let responseWrapper : ZOHOCRMSDK.AppointmentPreference.ResponseWrapper = responseHandler;
                let appointmentPreferences : ZOHOCRMSDK.AppointmentPreference.AppointmentPreference = responseWrapper.getAppointmentPreferences();
                if (appointmentPreferences != null) {
                    console.log("AppointmentPreference showJobSheet :" + appointmentPreferences.getShowJobSheet());
                    console.log("AppointmentPreference whenDurationExceeds :" + appointmentPreferences.getWhenDurationExceeds().getValue());
                    console.log("AppointmentPreference allowBookingOutsideServiceAvailability :" + appointmentPreferences.getAllowBookingOutsideServiceAvailability());
                    console.log("AppointmentPreference whenAppointmentCompleted :" + appointmentPreferences.getWhenAppointmentCompleted().getValue());
                    console.log("AppointmentPreference allowBookingOutsideBusinesshours :" + appointmentPreferences.getAllowBookingOutsideBusinesshours());
                    let dealRecordConfiguration : Map<string, any> = appointmentPreferences.getDealRecordConfiguration();
                    if (dealRecordConfiguration != null) {
                        Array.from(dealRecordConfiguration.keys()).forEach(key => {
                            if (key == "layout") {
                                let layout : ZOHOCRMSDK.AppointmentPreference.Layout = dealRecordConfiguration.get(key);
                                console.log("Layout ID : " + layout.getId());
                                console.log("LayoutName : " + layout.getAPIName());
                            }
                            if (key == "field_mappings") {
                                let fieldMappings : ZOHOCRMSDK.AppointmentPreference.FieldMappings[] = dealRecordConfiguration.get(key);
                                if (fieldMappings != null) {
                                    fieldMappings.forEach(function (fieldMapping) {
                                        console.log("FieldMappings Type: " + fieldMapping.getType().getValue());
                                        console.log("FieldMappings Value : " + fieldMapping.getValue());
                                        let field : ZOHOCRMSDK.AppointmentPreference.Field = fieldMapping.getField();
                                        if (field != null) {
                                            console.log("Field APIName : " + field.getAPIName());
                                            console.log("Field ID : " + field.getId());
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            } else if (responseHandler instanceof ZOHOCRMSDK.AppointmentPreference.APIException) {
                console.log("Status: " + responseHandler.getStatus().getValue());
                console.log("Code: " + responseHandler.getCode().getValue());
                console.log("Details");
                let details = responseHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseHandler.getMessage());
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
        await GetAppointmentPreferences.getAppointmentPreference()
    }
}
GetAppointmentPreferences.initializeAndCall()
