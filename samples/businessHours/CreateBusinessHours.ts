import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class CreateBusinessHours
{
    static async createBusinessHours()
    {
        let businessHoursOperations : ZOHOCRMSDK.BusinessHours.BusinessHoursOperations = new ZOHOCRMSDK.BusinessHours.BusinessHoursOperations('');
        let request : ZOHOCRMSDK.BusinessHours.BodyWrapper= new ZOHOCRMSDK.BusinessHours.BodyWrapper();
        let businessHours : ZOHOCRMSDK.BusinessHours.BusinessHours = new ZOHOCRMSDK.BusinessHours.BusinessHours();
        let businessDays : ZOHOCRMSDK.Choice[] = [];
        businessDays.push(new ZOHOCRMSDK.Choice("Monday"));
        businessHours.setBusinessDays(businessDays);
        businessHours.setWeekStartsOn(new ZOHOCRMSDK.Choice("Monday"));
        let bhct : ZOHOCRMSDK.BusinessHours.BreakHoursCustomTiming = new ZOHOCRMSDK.BusinessHours.BreakHoursCustomTiming();
        bhct.setDays(new ZOHOCRMSDK.Choice("Monday"));
        let businessTiming : string[] = [];
        businessTiming.push("10:00");
        businessTiming.push("11:00");
        bhct.setBusinessTiming(businessTiming);
        let customTiming : ZOHOCRMSDK.BusinessHours.BreakHoursCustomTiming[]= [];
        customTiming.push(bhct);
        businessHours.setCustomTiming(customTiming);
        businessHours.setSameAsEveryday(false);
        // when sameAsEveryDay is true
        let dailyTiming : string[] = [];
        dailyTiming.push("10:00");
        dailyTiming.push("11:00");
        //
        businessHours.setType(new ZOHOCRMSDK.Choice("custom"));
        await request.setBusinessHours(businessHours);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.BusinessHours.ActionHandler.MasterModel> = await businessHoursOperations.createBusinessHours(request);
        if (response != null)
        {
            console.log("Status code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.BusinessHours.ActionHandler.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.BusinessHours.ActionWrapper)
            {
                let actionWrapper : ZOHOCRMSDK.BusinessHours.ActionWrapper = actionHandler;
                let actionResponse = actionWrapper.getBusinessHours();
                if (actionResponse instanceof ZOHOCRMSDK.BusinessHours.BusinessHoursCreated)
                {
                    let successResponse : ZOHOCRMSDK.BusinessHours.BusinessHoursCreated = actionResponse;
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
                    let exception:ZOHOCRMSDK.BusinessHours.APIException = actionResponse;
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
                console.log("Message: " + exception.getMessage());
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
        await CreateBusinessHours.createBusinessHours();
    }
}
CreateBusinessHours.initializeAndCall();
