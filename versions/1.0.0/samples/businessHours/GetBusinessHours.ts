import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetBusinessHours
{
    static async getBusinessHours()
    {
        let businessHoursOperations : ZOHOCRMSDK.BusinessHours.BusinessHoursOperations = new ZOHOCRMSDK.BusinessHours.BusinessHoursOperations("44028813");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.BusinessHours.ResponseHandler.MasterModel> = await businessHoursOperations.getBusinessHours();
        if (response != null)
        {
            console.log('Status Code: ' + response.getStatusCode());
            if (response.getStatusCode() == 204 || response.getStatusCode() == 304)
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject : ZOHOCRMSDK.BusinessHours.ResponseHandler.MasterModel = response.getObject();
            if (responseObject instanceof ZOHOCRMSDK.BusinessHours.ResponseWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.BusinessHours.ResponseWrapper = responseObject;
                let businessHours = responseWrapper.getBusinessHours();
                let businessDays = businessHours.getBusinessDays();
                if (businessDays != null)
                {
                    console.log("BusinessDays : " );
                    businessDays.forEach(businessDay => {
                        console.log(businessDay.getValue());
                    });
                }
                else
                {
                    console.log("BusinmessDays : null");
                }
                let customToiming = businessHours.getCustomTiming();
                if (customToiming != null)
                {
                    console.log("CustomTiming : ");
                    customToiming.forEach(bhct =>
                    {
                        console.log("days: " + bhct.getDays().getValue());
                        let businessTimings= bhct.getBusinessTiming();
                        businessTimings.forEach(businessTiming =>
                        {
                            console.log("Businesstiming : " + businessTiming );
                        });
                    });
                }
                else
                {
                    console.log("Custom_Timing : null " );
                }
                let dailyTimings = businessHours.getDailyTiming();
                if (dailyTimings != null)
                {
                    console.log("dailyTimings : " );
                    dailyTimings.forEach(dailyTiming => {
                        console.log(dailyTiming );
                    });
                }
                else
                {
                    console.log("dailyTiming : null" );
                }
                console.log("Week_starts_on: " + businessHours.getWeekStartsOn().getValue() );
                console.log("same_as_every_day : " + businessHours.getSameAsEveryday() );
                console.log("businessHours_Id: " + businessHours.getId() );
                console.log("businessHours_type: " + businessHours.getType().getValue());
            }
            else if (responseObject instanceof ZOHOCRMSDK.BusinessHours.APIException)
            {
                let exception : ZOHOCRMSDK.BusinessHours.APIException = responseObject;
                console.log("Status: " + exception.getStatus().getValue() );
                console.log("Code: " + exception.getCode().getValue() );
                console.log("Details: ");
                let details : Map<string, any> = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) );
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
        await GetBusinessHours.getBusinessHours();
    }
}
GetBusinessHours.initializeAndCall();
