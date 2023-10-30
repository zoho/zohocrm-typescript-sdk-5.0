import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateBusinessHours
{
    static async updateBusinessHours()
    {
        let businessHoursOperations : ZOHOCRMSDK.BusinessHours.BusinessHoursOperations= new ZOHOCRMSDK.BusinessHours.BusinessHoursOperations('44028020813');
        let request : ZOHOCRMSDK.BusinessHours.BodyWrapper= new ZOHOCRMSDK.BusinessHours.BodyWrapper();
        let businessHours : ZOHOCRMSDK.BusinessHours.BusinessHours= new ZOHOCRMSDK.BusinessHours.BusinessHours();
        businessHours.setId(BigInt("44028001017425"));
        businessHours.setSameAsEveryday(false);
        let businessDays : ZOHOCRMSDK.Choice[]= [];
        businessDays.push(new ZOHOCRMSDK.Choice("Monday"));
        businessDays.push(new ZOHOCRMSDK.Choice("Tuesday"));
        businessDays.push(new ZOHOCRMSDK.Choice("Wednesday"));
        // businessDays.push(new ZOHOCRMSDK.Choice("Thursday"));
        // businessDays.push(new ZOHOCRMSDK.Choice("Friday"));
        businessHours.setBusinessDays(businessDays);
        businessHours.setWeekStartsOn(new ZOHOCRMSDK.Choice("Monday"));
        let bhct : ZOHOCRMSDK.BusinessHours.BreakHoursCustomTiming= new ZOHOCRMSDK.BusinessHours.BreakHoursCustomTiming();
        bhct.setDays(new ZOHOCRMSDK.Choice("Monday"));
        let businessTiming : string[] = [];
        businessTiming.push("09:00");
        businessTiming.push("17:00");
        bhct.setBusinessTiming(businessTiming);
        let bhct1 : ZOHOCRMSDK.BusinessHours.BreakHoursCustomTiming = new ZOHOCRMSDK.BusinessHours.BreakHoursCustomTiming();
        bhct1.setDays(new ZOHOCRMSDK.Choice("Tuesday"));
        let businessTiming1 : string[] = [];
        businessTiming1.push("09:00");
        businessTiming1.push("17:00");
        bhct1.setBusinessTiming(businessTiming1);
        let bhct2 : ZOHOCRMSDK.BusinessHours.BreakHoursCustomTiming = new ZOHOCRMSDK.BusinessHours.BreakHoursCustomTiming();
        bhct2.setDays(new ZOHOCRMSDK.Choice("Wednesday"));
        let businessTiming2 : string[]= [];
        businessTiming2.push("09:00");
        businessTiming2.push("17:00");
        bhct2.setBusinessTiming(businessTiming2);
        let customTiming : ZOHOCRMSDK.BusinessHours.BreakHoursCustomTiming[]= [];
        customTiming.push(bhct);
        customTiming.push(bhct1);
        customTiming.push(bhct2);
        businessHours.setCustomTiming(customTiming);
        // when sameAsEveryDay is true
        let dailyTiming : string[]= [];
        dailyTiming.push("10:00");
        dailyTiming.push("19:00");
        businessHours.setDailyTiming(dailyTiming);
        //
        businessHours.setType(new ZOHOCRMSDK.Choice("custom"));
        await request.setBusinessHours(businessHours);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.BusinessHours.ActionHandler.MasterModel>= await businessHoursOperations.updateBusinessHours(request);
        if (response != null)
        {
            console.log("Status code : " + response.getStatusCode() + "\n");
            let actionHandler = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.BusinessHours.ActionWrapper)
            {
                let actionWrapper = actionHandler;
                let actionResponse = actionWrapper.getBusinessHours();
                if (actionResponse instanceof ZOHOCRMSDK.BusinessHours.BusinessHoursCreated)
                {
                    let successResponse : ZOHOCRMSDK.BusinessHours.BusinessHoursCreated= actionResponse;
                    console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                    console.log("Code: " + successResponse.getCode().getValue() + "\n");
                    console.log("Details: ");
                    let details : Map<string, any>= actionResponse.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key) + "\n");
                        });
                    }
                    console.log("Message: " + successResponse.getMessage());
                }
                if (actionResponse instanceof ZOHOCRMSDK.BusinessHours.APIException)
                {
                    let exception : ZOHOCRMSDK.BusinessHours.APIException= actionResponse;
                    console.log("Status: " + exception.getStatus().getValue() + "\n");
                    console.log("Code: " + exception.getCode().getValue() + "\n");
                    console.log("Details: ");
                    let details : Map<string, any>= exception.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key) + "\n");
                        });
                    }
                    console.log("Message: " + exception.getMessage().getValue());
                }
            }
            else if (actionHandler instanceof ZOHOCRMSDK.BusinessHours.APIException)
            {
                let exception : ZOHOCRMSDK.BusinessHours.APIException = actionHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any>= exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " + exception.getMessage().getValue());
            }
        }
    }
    static async initializeAndCall(){
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
        await UpdateBusinessHours.updateBusinessHours();
    }
}
UpdateBusinessHours.initializeAndCall();
