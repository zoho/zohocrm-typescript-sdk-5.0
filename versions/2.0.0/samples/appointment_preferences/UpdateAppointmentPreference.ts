import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";

export class UpdateAppointmentPreference
{
    public static async updateAppointmentPreference()
    {
        let appointmentPreferenceOperations : ZOHOCRMSDK.AppointmentPreference.AppointmentPreferenceOperations = new ZOHOCRMSDK.AppointmentPreference.AppointmentPreferenceOperations();
        let request : ZOHOCRMSDK.AppointmentPreference.BodyWrapper = new ZOHOCRMSDK.AppointmentPreference.BodyWrapper();
        let appointmentPreferences : ZOHOCRMSDK.AppointmentPreference.AppointmentPreference= new ZOHOCRMSDK.AppointmentPreference.AppointmentPreference();
        appointmentPreferences.setAllowBookingOutsideBusinesshours(false);
        appointmentPreferences.setWhenAppointmentCompleted(new ZOHOCRMSDK.Choice("do_not_create_deal"));
        appointmentPreferences.setWhenDurationExceeds(new ZOHOCRMSDK.Choice("mark_as_complete"));
        appointmentPreferences.setShowJobSheet(false);
        let dealRecordConfiguration : Map<string, any> = new Map();
        let layout : ZOHOCRMSDK.AppointmentPreference.Layout = new ZOHOCRMSDK.AppointmentPreference.Layout();
        layout.setAPIName("Standard");
        layout.setId(BigInt("440280173"));
        dealRecordConfiguration.set("layout", layout);
        let mappings = [];
        let fieldMappings : ZOHOCRMSDK.AppointmentPreference.FieldMappings  = new ZOHOCRMSDK.AppointmentPreference.FieldMappings();
        fieldMappings.setType(new ZOHOCRMSDK.Choice("static"));
        fieldMappings.setValue("Closed Won");
        let field : ZOHOCRMSDK.AppointmentPreference.Field = new ZOHOCRMSDK.AppointmentPreference.Field();
        field.setAPIName("Stage");
        field.setId(BigInt("4402801324032"));
        await fieldMappings.setField(field);
        mappings.push(fieldMappings);
        dealRecordConfiguration.set("field_mappings", mappings);
        appointmentPreferences.setDealRecordConfiguration(dealRecordConfiguration);
        await request.setAppointmentPreferences(appointmentPreferences);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.AppointmentPreference.ActionHandler.MasterModel>= await appointmentPreferenceOperations.updateAppointmentPreference(request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject : ZOHOCRMSDK.AppointmentPreference.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.AppointmentPreference.ActionWrapper) {
                    let actionResponse : ZOHOCRMSDK.AppointmentPreference.ActionResponse.MasterModel = responseObject.getAppointmentPreferences();
                    if (actionResponse instanceof ZOHOCRMSDK.AppointmentPreference.SuccessResponse) {
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
                    } else if (actionResponse instanceof ZOHOCRMSDK.AppointmentPreference.APIException) {
                        console.log("Status: " + actionResponse.getStatus().getValue());
                        console.log("Code: " + actionResponse.getCode().getValue());
                        console.log("Details");
                        let details : Map<string, any> = actionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + actionResponse.getMessage());
                    }
                } else if (responseObject instanceof ZOHOCRMSDK.AppointmentPreference.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any> = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
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
        await UpdateAppointmentPreference.updateAppointmentPreference()
    }
}
UpdateAppointmentPreference.initializeAndCall()