import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateNotification
{
    public static async updateNotification() {
        let notificationOperations: ZOHOCRMSDK.Notifications.NotificationsOperations = new ZOHOCRMSDK.Notifications.NotificationsOperations();
        let bodyWrapper: ZOHOCRMSDK.Notifications.BodyWrapper = new ZOHOCRMSDK.Notifications.BodyWrapper();
        //Array of Notification instances
        let notificationsArray: ZOHOCRMSDK.Notifications.Notification[] = [];
        let notification1: ZOHOCRMSDK.Notifications.Notification = new ZOHOCRMSDK.Notifications.Notification();
        notification1.setChannelId("1006800211");
        let events: string[] = ["Price_Books.delete"];
        //To subscribe based on particular operations on given modules.
        notification1.setEvents(events);
        notification1.setChannelExpiry(new Date());
        //To ensure that the notification is sent from Zoho CRM, by sending back the given value in notification URL body.
        //By using this value, user can validate the notifications.
        notification1.setToken("TOKEN_FOR_VERIFICATION_OF_10068002");
        //URL to be notified (POST request)
        notification1.setNotifyUrl("https://www.zohoapis.com");
        //Add Notification instance to the array
        notificationsArray.push(notification1);
        bodyWrapper.setWatch(notificationsArray);
        //Call updateNotification method that takes BodyWrapper instance as parameters
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Notifications.ActionHandler.MasterModel> = await notificationOperations.updateNotification(bodyWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Notifications.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Notifications.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.Notifications.ActionResponse.MasterModel[] = responseObject.getWatch();
                    for (let actionResponse of actionResponses) {
                        if (actionResponse instanceof ZOHOCRMSDK.Notifications.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            details.forEach((value: any, key: string) => {
                                if (Array.isArray(value)) {
                                    if (value.length > 0 && value[0] instanceof ZOHOCRMSDK.Notifications.Notification) {
                                        for (let event of value) {
                                            console.log("Notification ChannelExpiry: " + event.getChannelExpiry());
                                            console.log("Notification ResourceUri: " + event.getResourceUri());
                                            console.log("Notification ResourceId: " + event.getResourceId());
                                            console.log("Notification ResourceName: " + event.getResourceName());
                                            console.log("Notification ChannelId: " + event.getChannelId());
                                        }
                                    }
                                }
                                else {
                                    console.log(key + " : " + value);
                                }
                            });
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.Notifications.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.Notifications.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
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
        await UpdateNotification.updateNotification();
    }
}
UpdateNotification.initializeAndCall();
