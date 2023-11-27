import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetWizards
{
    public static async getWizards() {
        let wizardsOperations: ZOHOCRMSDK.Wizards.WizardsOperations = new ZOHOCRMSDK.Wizards.WizardsOperations();
        //Call getWizards method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Wizards.ResponseHandler.MasterModel> = await wizardsOperations.getWizards();
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Wizards.ResponseHandler.MasterModel = response.getObject();
            if (responseObject instanceof ZOHOCRMSDK.Wizards.ResponseWrapper) {
                let wizards: ZOHOCRMSDK.Wizards.Wizard[] = responseObject.getWizards();
                wizards.forEach(wizard => {
                    console.log("Wizard CreatedTime: " + wizard.getCreatedTime());
                    console.log("Wizard ModifiedTime: " + wizard.getModifiedTime());
                    let module: ZOHOCRMSDK.Modules.Modules = wizard.getModule();
                    if (module != null) {
                        console.log("Wizard Module APIName: " + module.getAPIName());
                        console.log("Wizard Module Id: " + module.getId());
                    }
                    console.log("Wizard Name: " + wizard.getName());
                    let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = wizard.getModifiedBy();
                    if (modifiedBy != null) {
                        console.log("Wizard Modified By User-Name: " + modifiedBy.getName());
                        console.log("Wizard Modified By User-ID: " + modifiedBy.getId());
                    }
                    let profiles: ZOHOCRMSDK.Profiles.Profile[] = wizard.getProfiles();
                    if (profiles != null) {
                        profiles.forEach(profile => {
                            console.log("Wizard Profile Name: " + profile.getName());
                            console.log("Wizard Profile ID: " + profile.getId());
                        });
                    }
                    console.log("Wizard Active: " + wizard.getActive());
                    let containers: ZOHOCRMSDK.Wizards.Container[] = wizard.getContainers();
                    if (containers != null) {
                        containers.forEach(container => {
                            let layout: ZOHOCRMSDK.Layouts.Layouts = container.getLayout();
                            if (layout != null) {
                                console.log("Wizard Container Layout Name: " + layout.getName());
                                console.log("Wizard Container Layout ID: " + layout.getId());
                            }
                            console.log("Wizard Container ID: " + container.getId());
                        });
                    }
                    console.log("Wizard ID: " + wizard.getId());
                    let createdBy: ZOHOCRMSDK.Users.MinifiedUser = wizard.getCreatedBy();
                    if (createdBy != null) {
                        console.log("Wizard Created By User-Name: " + createdBy.getName());
                        console.log("Wizard Created By User-ID: " + createdBy.getId());
                    }
                });
            }
            else if (responseObject instanceof ZOHOCRMSDK.Wizards.APIException) {
                console.log("Status: "+ responseObject.getStatus().getValue());
                console.log("Code: "+ responseObject.getCode().getValue());
                console.log("Details: ");
                let details = responseObject.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: "+ responseObject.getMessage().getValue());
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
        await GetWizards.getWizards();
    }
}
GetWizards.initializeAndCall();
