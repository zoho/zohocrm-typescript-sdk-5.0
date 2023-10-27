import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateBluePrint
{
    public static async updateBlueprint(moduleAPIName: string, recordId: string, transitionId: string) {
        //example
        // let moduleAPIName = "Leads";
        // let recordId = "3409643246904";
        // let transitionId = "34096431172075";
        let bluePrintOperations: ZOHOCRMSDK.Blueprint.BlueprintOperations = new ZOHOCRMSDK.Blueprint.BlueprintOperations(recordId, moduleAPIName);
        let bodyWrapper: ZOHOCRMSDK.Blueprint.BodyWrapper = new ZOHOCRMSDK.Blueprint.BodyWrapper();
        //Array to contain BluePrint instances
        let bluePrintArray: ZOHOCRMSDK.Blueprint.BluePrint[] = [];
        let bluePrint: ZOHOCRMSDK.Blueprint.BluePrint = new ZOHOCRMSDK.Blueprint.BluePrint();
        bluePrint.setTransitionId(transitionId);
        let data: ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        let lookup = new Map();
        lookup.set("Phone", "8940372937");
        lookup.set("id", "8940372937");
        // data.addKeyValue("Data_3", lookup);
        data.addKeyValue("Phone", "8940372937");
        data.addKeyValue("Notes", "Updated via blueprint");
        let checkLists = [];
        let checkListItem = new Map();
        checkListItem.set("list 1", true);
        checkLists.push(checkListItem);
        checkListItem = new Map();
        checkListItem.set("list 2", true);
        checkLists.push(checkListItem);
        checkListItem = new Map();
        checkListItem.set("list 3", true);
        checkLists.push(checkListItem);
        // data.addKeyValue("CheckLists", checkLists);
        bluePrint.setData(data);
        //Add BluePrint instance to the array
        bluePrintArray.push(bluePrint);
        bodyWrapper.setBlueprint(bluePrintArray);
        //Call updateBluePrint method that takes BodyWrapper instance
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Blueprint.ActionHandler.MasterModel> = await bluePrintOperations.updateBlueprint(bodyWrapper);
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Blueprint.ActionHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.Blueprint.SuccessResponse) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details !== null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
                else if (responseObject instanceof ZOHOCRMSDK.Blueprint.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details = responseObject.getDetails();
                    if (details !== null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
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
        await UpdateBluePrint.updateBlueprint("Leads", "44028001629014", "440280258363");
    }
}
UpdateBluePrint.initializeAndCall()
