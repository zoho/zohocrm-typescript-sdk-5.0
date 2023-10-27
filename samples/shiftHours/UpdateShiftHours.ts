import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
import * as moment from "moment-timezone";
class UpdateShiftHours
{
    static async updateShiftHours()
    {
        let shiftHoursOerations : ZOHOCRMSDK.HoursShift.ShiftHoursOperations= new ZOHOCRMSDK.HoursShift.ShiftHoursOperations("44020813");
        let request : ZOHOCRMSDK.HoursShift.BodyWrapper = new ZOHOCRMSDK.HoursShift.BodyWrapper();
        let shiftHours : ZOHOCRMSDK.HoursShift.ShiftHours[] = [];
        let shiftHour : ZOHOCRMSDK.HoursShift.ShiftHours = new ZOHOCRMSDK.HoursShift.ShiftHours();
        await shiftHour.setTimezone(moment.tz.zone('Asia/Kolkata'));
        shiftHour.setName("Shift hours");
        shiftHour.setId(BigInt("34234234123"))
        shiftHour.setSameAsEveryday(false);
        let shiftDays :string[] = [];
        shiftDays.push("Monday");
        shiftDays.push("Tuesday");
        shiftHour.setShiftDays(shiftDays);
        // if Same_as_EveryDay is true
        let dailyTiming :string[] = [];
        dailyTiming.push("10:00");
        dailyTiming.push("19:00");
        shiftHour.setDailyTiming(dailyTiming);
        // if same_as_everyday is false
        let customTimings : ZOHOCRMSDK.HoursShift.ShiftCustomTiming[] = [];
        let customTiming: ZOHOCRMSDK.HoursShift.ShiftCustomTiming = new ZOHOCRMSDK.HoursShift.ShiftCustomTiming();
        let shifttiming : string[] = [];
        shifttiming.push("10:00");
        shifttiming.push("19:00");
        customTiming.setShiftTiming(shifttiming);
        customTiming.setDays("Monday");
        customTimings.push(customTiming);
        let customTiming1 : ZOHOCRMSDK.HoursShift.ShiftCustomTiming = new ZOHOCRMSDK.HoursShift.ShiftCustomTiming();
        let shifttiming1 : string[] = [];
        shifttiming1.push("10:00");
        shifttiming1.push("19:00");
        customTiming1.setShiftTiming(shifttiming1);
        customTiming1.setDays("Tuesday");
        customTimings.push(customTiming1);
        shiftHour.setCustomTiming(customTimings);
        //
        let breakHours : ZOHOCRMSDK.HoursShift.BreakHours[] = [];
        let breakHour : ZOHOCRMSDK.HoursShift.BreakHours  = new ZOHOCRMSDK.HoursShift.BreakHours();
        let breakDays :string[] = [];
        breakDays.push("Monday");
        breakDays.push("Tuesday");
        breakHour.setBreakDays(breakDays);
        // if same_as_everyDay is true
        breakHour.setSameAsEveryday(true);
        let dailyTimingForBreakHours : string[] = [];
        dailyTimingForBreakHours.push("11:00");
        dailyTimingForBreakHours.push("11:00");
        breakHour.setDailyTiming(dailyTimingForBreakHours);
        breakHours.push(breakHour);
        shiftHour.setBreakHours(breakHours);
        // if same_as_EveryDay is false
        breakHour.setSameAsEveryday(false);
        let customTimingForBreakHours : ZOHOCRMSDK.HoursShift.BreakCustomTiming[] = [];
        let customTimingForBreakHour : ZOHOCRMSDK.HoursShift.BreakCustomTiming = new ZOHOCRMSDK.HoursShift.BreakCustomTiming();
        let breaktimings : string[] = [];
        breaktimings.push("12:00");
        breaktimings.push("12:15");
        customTimingForBreakHour.setBreakTiming(breaktimings);
        customTimingForBreakHour.setDays("Monday");
        customTimingForBreakHours.push(customTimingForBreakHour);
        let customTimingForBreakHour1 : ZOHOCRMSDK.HoursShift.BreakCustomTiming = new ZOHOCRMSDK.HoursShift.BreakCustomTiming();
        let breaktimings1 : string[] = [];
        breaktimings1.push("12:00");
        breaktimings1.push("12:15");
        customTimingForBreakHour1.setBreakTiming(breaktimings1);
        customTimingForBreakHour1.setDays("Tuesday");
        customTimingForBreakHours.push(customTimingForBreakHour1);
        breakHour.setCustomTiming(customTimingForBreakHours);
        breakHours.push(breakHour);
        shiftHour.setBreakHours(breakHours);
        //
        let users : ZOHOCRMSDK.HoursShift.Users[] = [];
        let user : ZOHOCRMSDK.HoursShift.Users = new ZOHOCRMSDK.HoursShift.Users();
        user.setId(BigInt("403424243242432"));
        user.setEffectiveFrom(new Date(2020, 12, 12));
        users.push(user);
        shiftHour.setUsers(users);
        let holidays : ZOHOCRMSDK.HoursShift.Holidays[] = [];
        let holiday : ZOHOCRMSDK.HoursShift.Holidays = new ZOHOCRMSDK.HoursShift.Holidays();
        holiday.setDate(new Date(2020, 12, 12));
        // holiday.setId(4043241233231233n);
        holiday.setName("holi");
        holiday.setYear(2020);
        holidays.push(holiday);
        shiftHour.setHolidays(holidays);
        shiftHours.push(shiftHour);
        request.setShiftHours(shiftHours);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.HoursShift.ActionHandler.MasterModel>= await shiftHoursOerations.updateShiftHours(request);
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.HoursShift.ActionHandler.MasterModel= response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.HoursShift.ActionWrapper)
            {
                let actionWrapper : ZOHOCRMSDK.HoursShift.ActionWrapper = actionHandler;
                let actionResponses : ZOHOCRMSDK.HoursShift.ActionResponse.MasterModel[] = actionWrapper.getShiftHours();
                if (actionResponses != null)
                {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.HoursShift.SuccessResponse)
                        {
                            let successResponse : ZOHOCRMSDK.HoursShift.SuccessResponse = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details  \n");
                            let details : Map<string, any>  = successResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + successResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.HoursShift.APIException)
                        {
                            let exception : ZOHOCRMSDK.HoursShift.APIException = actionResponse;
                            console.log("Status: " + exception.getStatus().getValue() +"\n");
                            console.log("Code: " + exception.getCode().getValue() + "\n");
                            console.log("Details \n");
                            let details : Map<string, any> = exception.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " +  exception.getMessage());
                        }
                    });
                }
            }
            else if (actionHandler instanceof ZOHOCRMSDK.HoursShift.APIException)
            {
                let exception :ZOHOCRMSDK.HoursShift.APIException = actionHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details \n");
                let details : Map<string, any> = exception.getDetails();
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
        await UpdateShiftHours.updateShiftHours();
    }
}
UpdateShiftHours.initializeAndCall();
