import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class CreateHolidays
{
    static async createHolidays()
    {
        let holidaysOperations : ZOHOCRMSDK.Holidays.HolidaysOperations= new ZOHOCRMSDK.Holidays.HolidaysOperations("");
        let request : ZOHOCRMSDK.Holidays.CreateBusinessHoliday = new ZOHOCRMSDK.Holidays.CreateBusinessHoliday();
        let holidays : ZOHOCRMSDK.Holidays.BusinessHoliday[] = [];
        let  holiday : ZOHOCRMSDK.Holidays.BusinessHoliday = new ZOHOCRMSDK.Holidays.BusinessHoliday();
        holiday.setName("Holiday 2");
        holiday.setDate(new Date(2023, 10, 23));
        holiday.setType(new ZOHOCRMSDK.Choice("business_holiday"));
        holidays.push(holiday);
        request.setHolidays(holidays);
        // when type is Shift_holiday
        let request1 : ZOHOCRMSDK.Holidays.CreateShiftHoliday = new ZOHOCRMSDK.Holidays.CreateShiftHoliday();
        let shiftholidays : ZOHOCRMSDK.Holidays.ShiftHoliday[] = [];
        let shiftholiday : ZOHOCRMSDK.Holidays.ShiftHoliday = new ZOHOCRMSDK.Holidays.ShiftHoliday();
        let shifthour : ZOHOCRMSDK.Holidays.ShiftHour = new ZOHOCRMSDK.Holidays.ShiftHour();
        shifthour.setName("shift hour for TX");
        shifthour.setId(BigInt("44028001830029"));
        await shiftholiday.setShiftHour(shifthour);
        shiftholiday.setName("shiftholiday");
        shiftholiday.setType(new ZOHOCRMSDK.Choice("shift_holiday"));
        shiftholiday.setDate(new Date(2023, 11, 12));
        shiftholidays.push(shiftholiday);
        request1.setHolidays(shiftholidays);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Holidays.ActionHandler.MasterModel>=await holidaysOperations.createHolidays(request1);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.Holidays.ActionHandler.MasterModel= response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.Holidays.ActionWrapper) {
                let actionWrapper: ZOHOCRMSDK.Holidays.ActionWrapper = actionHandler;
                let actionResponses :ZOHOCRMSDK.Holidays.ActionResponse.MasterModel[] = actionWrapper.getHolidays();
                if (actionResponses != null) {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Holidays.SuccessResponse) {
                            let successResponse : ZOHOCRMSDK.Holidays.SuccessResponse = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details: ");
                            let details : Map<string, any>= actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " +  successResponse.getMessage());
                        }
                        if (actionResponse instanceof ZOHOCRMSDK.Holidays.APIException) {
                            let exception : ZOHOCRMSDK.Holidays.APIException = actionResponse;
                            console.log("Status: " + exception.getStatus().getValue() + "\n");
                            console.log("Code: " + exception.getCode().getValue() + "\n");
                            console.log("Details: ");
                            let details : Map<string, any>= exception.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + exception.getMessage());
                        }
                    });
                }
            } else if (actionHandler instanceof ZOHOCRMSDK.Holidays.APIException) {
                let exception : ZOHOCRMSDK.Holidays.APIException = actionHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " + exception.getMessage());
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
        await CreateHolidays.createHolidays();
    }
}
CreateHolidays.initializeAndCall();