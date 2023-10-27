import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetShiftHours
{
    static async getShiftHours()
    {
        let shiftHoursOperations : ZOHOCRMSDK.HoursShift.ShiftHoursOperations = new ZOHOCRMSDK.HoursShift.ShiftHoursOperations("440280020813");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.HoursShift.ResponseHandler.MasterModel>=await shiftHoursOperations.getShiftHours();
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject : ZOHOCRMSDK.HoursShift.ResponseHandler.MasterModel = response.getObject();
            if (responseObject instanceof ZOHOCRMSDK.HoursShift.ResponseWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.HoursShift.ResponseWrapper = responseObject;
                let shiftcount :  ZOHOCRMSDK.HoursShift.ShiftCount = responseWrapper.getShiftCount();
                if (shiftcount != null)
                {
                    console.log("Shift_Count : " + "\n");
                    console.log("total_Shift_with_user : " + shiftcount.getTotalShiftWithUser() + "\n");
                    console.log("total_Shift : " + shiftcount.getTotalShift() + "\n");
                }
                let shiftHours :  ZOHOCRMSDK.HoursShift.ShiftHours[] = responseWrapper.getShiftHours();
                if (shiftHours != null)
                {
                    shiftHours.forEach(shiftHour => {
                        console.log("name: " + shiftHour.getName() + "\n");
                        console.log("ShiftHour ID : " + shiftHour.getId() +  "\n");
                        console.log("same_as_everyday : " + shiftHour.getSameAsEveryday() + "\n");
                        console.log("Users_count : " + shiftHour.getUsersCount() + "\n");
                        console.log("timeZone : " + shiftHour.getTimezone()!.name + "\n");
                        let shiftDays : string[] = shiftHour.getShiftDays();
                        if (shiftDays != null)
                        {
                            console.log("ShiftDays : " +"\n");
                            shiftDays.forEach(shiftDay => {
                                console.log(shiftDay + "\n");
                            });
                        }
                        let dailyTimings : string[] = shiftHour.getDailyTiming();
                        if (dailyTimings != null)
                        {
                            console.log("DailyTiming : \n");
                            dailyTimings.forEach(dailyTiming => {
                                console.log(dailyTiming + "\n");
                            });
                        }
                        let customTimings :  ZOHOCRMSDK.HoursShift.ShiftCustomTiming[] = shiftHour.getCustomTiming();
                        if (customTimings != null)
                        {
                            console.log("Custom_Timing : \n");
                            customTimings.forEach(customTiming => {
                                let shiftTiming = customTiming.getShiftTiming();
                                console.log("shift_Timing : \n");
                                shiftTiming.forEach(shifttimng => {
                                    console.log(shifttimng + "\n");
                                });
                                console.log("days : " + customTiming.getDays() + "\n");
                            });
                        }
                        let holidays : ZOHOCRMSDK.HoursShift.Holidays[]= shiftHour.getHolidays();
                        if (holidays != null)
                        {
                            console.log("Holidays : \n");
                            holidays.forEach(holiday => {
                                console.log("date: " + holiday.getDate().toString() + "\n");
                                console.log("year: " + holiday.getYear().toString() + "\n");
                                console.log("name: " + holiday.getName() + "\n");
                                console.log("Id: " + holiday.getId() + "\n");
                            });
                        }
                        let users :  ZOHOCRMSDK.HoursShift.Users[] = shiftHour.getUsers();
                        if (users != null)
                        {
                            console.log("Users : \n");
                            users.forEach(user => {
                                console.log("User-Id : " + user.getId() + "\n");
                                console.log("User-Name : " + user.getName() + "\n");
                                console.log("User-Mail : " + user.getEmail() + "\n");
                                let role = user.getRole();
                                if (role != null)
                                {
                                    console.log("Role Name : " + role.getName() + "\n");
                                    console.log("Role ID : " + role.getId() + "\n");
                                }
                                console.log("user-ZUID : " + user.getZuid() + "\n");
                                console.log("effective_from : " + user.getEffectiveFrom() + "\n");
                            });
                        }
                        let breakHours :  ZOHOCRMSDK.HoursShift.BreakHours[] = shiftHour.getBreakHours();
                        if (breakHours != null)
                        {
                            breakHours.forEach(breakHour => {
                                console.log("BreakHour_Id: " + breakHour.getId() + "\n");
                                console.log("same_as_Everyday: " + breakHour.getSameAsEveryday() + "\n");
                                let breakDays : string[] = breakHour.getBreakDays();
                                if (breakDays != null)
                                {
                                    breakDays.forEach(breakDay => {
                                        console.log("BreakDays: " + breakDay +"\n");
                                    });
                                }
                                let dailyTimings : string[] = breakHour.getDailyTiming();
                                if (dailyTimings != null)
                                {
                                    dailyTimings.forEach(dailyTiming=>{
                                        console.log("daily_timing : " + dailyTiming + "\n");
                                    });
                                }
                                let breakHoursCustomTimings :  ZOHOCRMSDK.HoursShift.BreakCustomTiming[] = breakHour.getCustomTiming();
                                if (breakHoursCustomTimings != null)
                                {
                                    breakHoursCustomTimings.forEach(breakHoursCustomTiming => {
                                        console.log("CustomTimin : \n");
                                        let breakTimings : string[] = breakHoursCustomTiming.getBreakTiming();
                                        if (breakTimings != null)
                                        {
                                            breakTimings.forEach(breakTiming => {
                                                console.log("breakTiming : " + breakTiming + "\n");
                                            });
                                            console.log("days : " + breakHoursCustomTiming.getDays() + "\n");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
            else if (responseObject instanceof ZOHOCRMSDK.HoursShift.APIException)
            {
                let exception : ZOHOCRMSDK.HoursShift.APIException = responseObject;
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
        await GetShiftHours.getShiftHours();
    }
}
GetShiftHours.initializeAndCall();