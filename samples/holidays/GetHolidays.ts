import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetHolidays
{
    static async getHolidays()
    {
        let holidaysOperations: ZOHOCRMSDK.Holidays.HolidaysOperations = new ZOHOCRMSDK.Holidays.HolidaysOperations("324234");
        let paramInstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.Holidays.GetHolidaysParam.YEAR, 2023);
        // await paramInstance.add(ZOHOCRMSDK.Holidays.GetHolidaysParam.SHIFT_ID, 44028001629099n);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Holidays.ResponseHandler.MasterModel>= await holidaysOperations.getHolidays(paramInstance);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler :ZOHOCRMSDK.Holidays.ResponseHandler.MasterModel= response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.Holidays.ResponseWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.Holidays.ResponseWrapper = responseHandler;
                let holidays : ZOHOCRMSDK.Holidays.Holiday[]= responseWrapper.getHolidays();
                if (holidays != null)
                {
                    console.log("Holidays : " + "\n");
                    holidays.forEach(holiday=> {
                        console.log("Holiday Id : " + holiday.getId() + "\n");
                        console.log("Holiday Name : " + holiday.getName() + "\n");
                        console.log("Holiday Date : " + holiday.getDate().toString() + "\n");
                        console.log("Holiday Year : " + holiday.getYear() + "\n");
                        console.log("Holiday Type : " + holiday.getType() + "\n");
                        let shiftHour = holiday.getShiftHour();
                        if (shiftHour != null) {
                            console.log("ShiftHour : " + "\n");
                            console.log("Name: " + shiftHour.getName() + "\n");
                            console.log("ShiftHour Id : " + shiftHour.getId() + "\n");
                        }
                    });
                }
                let info = responseWrapper.getInfo();
                if (info != null)
                {
                    console.log("Info : " + "\n");
                    console.log("PerPage : " + info.getPerPage() + "\n");
                    console.log("Count : " + info.getCount() + "\n");
                    console.log("Page : " + info.getPage() + "\n");
                    console.log("more Record : " + info.getMoreRecords() + '\n');
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.Holidays.APIException)
            {
                let exception : ZOHOCRMSDK.Holidays.APIException = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
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
        await GetHolidays.getHolidays();
    }
}
GetHolidays.initializeAndCall();
