import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DisableNotification
{
    public static async disableNotification() {
        let notificationOperations: ZOHOCRMSDK.Notifications.NotificationsOperations = new ZOHOCRMSDK.Notifications.NotificationsOperations();
        let bodyWrapper: ZOHOCRMSDK.Notifications.BodyWrapper = new ZOHOCRMSDK.Notifications.BodyWrapper();
        //Array of Notification instances
        let notificationsArray: ZOHOCRMSDK.Notifications.Notification[] = [];
        let notification: ZOHOCRMSDK.Notifications.Notification = new ZOHOCRMSDK.Notifications.Notification();
        notification.setChannelId("10068002");
        let events: string[] = ["Accounts.edit"];
        //To subscribe based on particular operations on given modules.
        notification.setEvents(events);
        notification.setDeleteevents(new ZOHOCRMSDK.Choice<boolean>(true));
        //Add Notification instance to the array
        notificationsArray.push(notification);
        bodyWrapper.setWatch(notificationsArray);
        //Call disableNotification which takes BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Notifications.ActionHandler.MasterModel> = await notificationOperations.disableNotification(bodyWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Notifications.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Notifications.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.Notifications.ActionResponse.MasterModel[] = responseObject.getWatch();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Notifications.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
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
                    });
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
        await DisableNotification.disableNotification();
    }
}
DisableNotification.initializeAndCall();
