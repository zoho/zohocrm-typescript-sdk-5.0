import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateNotes
{
    public static async updateNotes() {
        let notesOperations: ZOHOCRMSDK.Notes.NotesOperations = new ZOHOCRMSDK.Notes.NotesOperations();
        let request: ZOHOCRMSDK.Notes.BodyWrapper = new ZOHOCRMSDK.Notes.BodyWrapper();
        //Array to hold Note instances
        let notesArray: ZOHOCRMSDK.Notes.Note[] = [];
        let note: ZOHOCRMSDK.Notes.Note = new ZOHOCRMSDK.Notes.Note();
        note.setId(BigInt("347706109296004"));
        note.setNoteTitle("Contacted12");
        note.setNoteContent("Need to do further tracking12");
        //Add Note instance to the array
        notesArray.push(note);
        note = new ZOHOCRMSDK.Notes.Note();
        note.setId(BigInt("34770619295004"));
        note.setNoteTitle("Contacted13");
        note.setNoteContent("Need to do further tracking13");
        //Add Note instance to the array
        notesArray.push(note);
        request.setData(notesArray);
        //Call updateNotes method that takes BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Notes.ActionHandler.MasterModel> = await notesOperations.updateNotes(request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Notes.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Notes.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.Notes.ActionResponse.MasterModel[] = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Notes.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.Notes.APIException) {
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
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Notes.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage().getValue());
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
        await UpdateNotes.updateNotes();
    }
}
UpdateNotes.initializeAndCall();
