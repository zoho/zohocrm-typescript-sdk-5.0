import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetInventoryTemplateById
{
    static async getInventoryTemplateById(Id: bigint) {
        let inventoryTemplatesOperations: ZOHOCRMSDK.InventoryTemplates.InventoryTemplatesOperations = new ZOHOCRMSDK.InventoryTemplates.InventoryTemplatesOperations();
        //Call getInventoryTemplateById method that takes Id as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.InventoryTemplates.ResponseHandler.MasterModel> = await inventoryTemplatesOperations.getInventoryTemplate(Id);
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseWrapper: ZOHOCRMSDK.InventoryTemplates.ResponseHandler.MasterModel = response.getObject();
            if (responseWrapper instanceof ZOHOCRMSDK.InventoryTemplates.ResponseWrapper) {
                let inventoryTemplates: ZOHOCRMSDK.InventoryTemplates.InventoryTemplate[] = responseWrapper.getInventoryTemplates();
                inventoryTemplates.forEach(inventoryTemplate => {
                    console.log("InventoryTemplate CreatedTime: " + inventoryTemplate.getCreatedTime());
                    let module: ZOHOCRMSDK.Modules.MinifiedModule = inventoryTemplate.getModule();
                    if (module != null) {
                        console.log("InventoryTemplate Module API Name : " + module.getAPIName());
                        console.log("InventoryTemplate Module ID : " + module.getId());
                    }
                    console.log("InventoryTemplate Type: " + inventoryTemplate.getType());
                    let createdBy: ZOHOCRMSDK.Users.MinifiedUser = inventoryTemplate.getCreatedBy();
                    if (createdBy != null) {
                        console.log("InventoryTemplate Created By User-ID: " + createdBy.getId());
                        console.log("InventoryTemplate Created By User-Name: " + createdBy.getName());
                    }
                    console.log("InventoryTemplate ModifiedTime: " + inventoryTemplate.getModifiedTime());
                    let folder: ZOHOCRMSDK.InventoryTemplates.Folder = inventoryTemplate.getFolder();
                    if (folder != null) {
                        console.log("InventoryTemplate Folder Id: " + folder.getId());
                        console.log("InventoryTemplate Folder Name: " + folder.getName());
                    }
                    console.log("InventoryTemplate LastUsageTime: " + inventoryTemplate.getLastUsageTime());
                    console.log("InventoryTemplate Name: " + inventoryTemplate.getName());
                    let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = inventoryTemplate.getModifiedBy();
                    if (modifiedBy != null) {
                        console.log("InventoryTemplate Modified By User-ID: " + modifiedBy.getId());
                        console.log("InventoryTemplate Modified By User-Name: " + modifiedBy.getName());
                    }
                    console.log("InventoryTemplate ID: " + inventoryTemplate.getId());
                    console.log("InventoryTemplate EditorMode: " + inventoryTemplate.getEditorMode());
                    console.log("InventoryTemplate Content: " + inventoryTemplate.getContent());
                    console.log("InventoryTemplate Favorite: " + inventoryTemplate.getFavorite());
                });
            }
            else if (responseWrapper instanceof ZOHOCRMSDK.InventoryTemplates.APIException) {
                console.log("Status: " + responseWrapper.getStatus().getValue());
                console.log("Code: " + responseWrapper.getCode().getValue());
                console.log("Details");
                let details : Map<string, any>= responseWrapper.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseWrapper.getMessage());
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
        await GetInventoryTemplateById.getInventoryTemplateById(BigInt("440280258279"));
    }
}
GetInventoryTemplateById.initializeAndCall()
