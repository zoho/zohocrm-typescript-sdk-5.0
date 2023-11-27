import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";

class MassConvert
{
    static async massConvert()
    {
        let massconvertoperations : ZOHOCRMSDK.ConvertMass.MassConvertOperations= new ZOHOCRMSDK.ConvertMass.MassConvertOperations();
        let bodyWrapper : ZOHOCRMSDK.ConvertMass.Convert= new ZOHOCRMSDK.ConvertMass.Convert();
        bodyWrapper.setIds([BigInt("440241629121")]);
        let deals : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        await deals.addFieldValue(ZOHOCRMSDK.Record.Field.Deals.AMOUNT, 100.0);
        await deals.addFieldValue(ZOHOCRMSDK.Record.Field.Deals.DEAL_NAME, 'SDK');
        await deals.addFieldValue(ZOHOCRMSDK.Record.Field.Deals.CLOSING_DATE, new Date(2023, 10, 12));
        await deals.addFieldValue(ZOHOCRMSDK.Record.Field.Deals.PIPELINE, new ZOHOCRMSDK.Choice("Standard (Standard)"));
        await deals.addFieldValue(ZOHOCRMSDK.Record.Field.Deals.STAGE, new ZOHOCRMSDK.Choice("Closed Won"));
        await bodyWrapper.setDeals(deals);
        let carryOvertags : ZOHOCRMSDK.ConvertMass.MoveAttachmentsTo = new ZOHOCRMSDK.ConvertMass.MoveAttachmentsTo();
        carryOvertags.setAPIName("Deals");
        // carryOvertags.setId(44028509050n)
        bodyWrapper.setCarryOverTags([carryOvertags]);
        let relatedModules : ZOHOCRMSDK.ConvertMass.RelatedModule[] = [];
        let relatedModule : ZOHOCRMSDK.ConvertMass.RelatedModule = new ZOHOCRMSDK.ConvertMass.RelatedModule();
        relatedModule.setAPIName("Tasks");
        relatedModule.setId(BigInt("440281438054"));
        relatedModules.push(relatedModule);
        relatedModule = new ZOHOCRMSDK.ConvertMass.RelatedModule();
        relatedModule.setAPIName("Tasks");
        relatedModule.setId(BigInt('40032424343'));
        relatedModules.push(relatedModule);
        bodyWrapper.setRelatedModules(relatedModules);
        let assignTo : ZOHOCRMSDK.ConvertMass.AssignTo= new ZOHOCRMSDK.ConvertMass.AssignTo();
        assignTo.setId(BigInt("44028254001"));
        await bodyWrapper.setAssignTo(assignTo);
        let move_attachmnets_to: ZOHOCRMSDK.ConvertMass.MoveAttachmentsTo = new ZOHOCRMSDK.ConvertMass.MoveAttachmentsTo();
        move_attachmnets_to.setAPIName("Contacts");
        move_attachmnets_to.setId(BigInt("439999999234232"));
        await bodyWrapper.setMoveAttachmentsTo(move_attachmnets_to);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ConvertMass.ActionResponse.MasterModel>= await massconvertoperations.massConvert(bodyWrapper);
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.ConvertMass.ActionResponse.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.ConvertMass.SuccessResponse)
            {
                let successResponse : ZOHOCRMSDK.ConvertMass.SuccessResponse = actionHandler;
                console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                console.log("Code: " + successResponse.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any> = successResponse.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " + successResponse.getMessage());
            }
            else if (actionHandler instanceof ZOHOCRMSDK.ConvertMass.APIException)
            {
                let exception :ZOHOCRMSDK.ConvertMass.APIException= actionHandler;
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
        await MassConvert.massConvert();
    }
}
MassConvert.initializeAndCall();