import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetUserType
{
    static async getUserType(portalName: any, usertypeId: string)
    {
        let userTypeOperations : ZOHOCRMSDK.PortalTypeUser.PortalUserTypeOperations= new ZOHOCRMSDK.PortalTypeUser.PortalUserTypeOperations(portalName);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.PortalTypeUser.ResponseHandler.MasterModel>= await userTypeOperations.getUserType(usertypeId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.PortalTypeUser.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.PortalTypeUser.ResponseWrapper) {
                let responseWrapper : ZOHOCRMSDK.PortalTypeUser.ResponseWrapper = responseHandler;
                let userType : ZOHOCRMSDK.PortalTypeUser.UserType[] = responseWrapper.getUserType();
                if (userType != null)
                {
                    userType.forEach(userType1=> {
                        console.log("UserType Default : " + userType1.getDefault() + '\n');
                        let personalityModule : ZOHOCRMSDK.PortalTypeUser.PersonalityModule = userType1.getPersonalityModule();
                        if (personalityModule != null) {
                            console.log("UserType PersonalityModule-ID: " + personalityModule.getId() + "\n");
                            console.log("UserType PersonalityModule-APIName: " + personalityModule.getAPIName() + "\n");
                            console.log("UserType PersonalityModule-PluralLabel: " + personalityModule.getPluralLabel() + "\n");
                        }
                        console.log("UserType Name : " + userType1.getName() + "\n");
                        console.log("UserType Active : " + userType1.getActive() + "\n");
                        console.log("UserType Id : " + userType1.getId() + "\n");
                        console.log("UserType NoOfUsers: " + userType1.getNoOfUsers() + "\n");
                        let modules : ZOHOCRMSDK.PortalTypeUser.Modules[] = userType1.getModules();
                        if (modules != null) {
                            modules.forEach(module => {
                                console.log("UserType Modules PluralLabel: " + module.getPluralLabel() + "\n");
                                console.log("UserType Modules SharedType: " + module.getSharedType().getValue() + "\n");
                                console.log("UserType Modules APIName: " + module.getAPIName() + "\n");
                                let permissions :  ZOHOCRMSDK.PortalTypeUser.Permissions = module.getPermissions();
                                if (permissions != null) {
                                    console.log("UserType Modules Permissions View: " + permissions.getView().getValue() + "\n");
                                    console.log("UserType Modules Permissions Edit: " + permissions.getEdit() + "\n");
                                    console.log("UserType Modules Permissions EditSharedRecords: " + permissions.getEditSharedRecords() + "\n");
                                    console.log("UserType Modules Permissions Create: " + permissions.getCreate() + "\n");
                                    console.log("UserType Modules Permissions Delete: " + permissions.getDelete() + "\n");
                                }
                                console.log("UserType Modules Id : " + module.getId() + "\n");
                                let filters : ZOHOCRMSDK.PortalTypeUser.Filters[]= module.getFilters();
                                if (filters != null) {
                                    filters.forEach(filter => {
                                        console.log("UserType Modules filters APIName : " + filter.getAPIName() + "\n");
                                        console.log("UserType Modules filters DisplayLabel : " + filter.getDisplayLabel() + "\n");
                                        console.log("UserType Modules filters Id : " + filter.getId() + "\n");
                                    });
                                }
                                let fields : ZOHOCRMSDK.PortalTypeUser.Fields[]= module.getFields();
                                if (fields != null) {
                                    fields.forEach(field => {
                                        console.log("UserType Modules field APIName : " + field.getAPIName() + "\n");
                                        console.log("UserType Modules field ReadOnly : " + field.getReadOnly() + "\n");
                                        console.log("UserType Modules field Id : " + field.getId() + "\n");
                                    });
                                }
                                let layouts:  ZOHOCRMSDK.PortalTypeUser.Layouts[] = module.getLayouts();
                                if (layouts != null) {
                                    layouts.forEach(layout => {
                                        console.log("UserType Modules Layouts Name : " + layout.getName() + "\n");
                                        console.log("UserType Modules Layouts DisplayLabel : " + layout.getDisplayLabel() + "\n");
                                        console.log("UserType Modules Layouts Id : " + layout.getId() + "\n");
                                    });
                                }
                                let view : ZOHOCRMSDK.PortalTypeUser.Views = module.getViews();
                                if (view != null) {
                                    console.log("UserType Modules Views Name : " + view.getName() + "\n");
                                    console.log("UserType Modules Views DisplayLabel : " + view.getDisplayLabel() + "\n");
                                    console.log("UserType Modules Views Id : " + view.getId() + "\n");
                                    console.log("UserType Modules Permissions type : " + view.getType() + "\n");
                                }
                            });
                        }
                    });
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.PortalTypeUser.APIException) {
                let exception : ZOHOCRMSDK.PortalTypeUser.APIException = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details \n");
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
        await GetUserType.getUserType("PortalAPITest", "44028001304019");
    }
}
GetUserType.initializeAndCall();