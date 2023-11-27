import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetBluePrint
{
    public static async getBlueprint(moduleAPIName: string, recordId: string) {
        //example
        // let moduleAPIName = "Leads";
        // let recordId = 34096432469044n;
        let bluePrintOperations: ZOHOCRMSDK.Blueprint.BlueprintOperations = new ZOHOCRMSDK.Blueprint.BlueprintOperations(recordId, moduleAPIName);
        //Call getBlueprint method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Blueprint.ResponseHandler.MasterModel> = await bluePrintOperations.getBlueprint();
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Blueprint.ResponseHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.Blueprint.ResponseWrapper) {
                    let bluePrint: ZOHOCRMSDK.Blueprint.BluePrint = responseObject.getBlueprint();
                    let processInfo: ZOHOCRMSDK.Blueprint.ProcessInfo = bluePrint.getProcessInfo();
                    if (processInfo !== null) {
                        console.log("ProcessInfo ID: " + processInfo.getId());
                        console.log("ProcessInfo Field-ID: " + processInfo.getFieldId());
                        console.log("ProcessInfo isContinuous: " + processInfo.getIsContinuous());
                        console.log("ProcessInfo API Name: " + processInfo.getAPIName());
                        console.log("ProcessInfo Continuous: " + processInfo.getContinuous());
                        console.log("ProcessInfo FieldLabel: " + processInfo.getFieldLabel());
                        console.log("ProcessInfo Name: " + processInfo.getName());
                        console.log("ProcessInfo ColumnName: " + processInfo.getColumnName());
                        console.log("ProcessInfo FieldValue: " + processInfo.getFieldValue());
                        console.log("ProcessInfo FieldName: " + processInfo.getFieldName());
                        console.log("ProcessInfo FieldName: " + processInfo.getEscalation());
                    }
                    let transitions: Array<ZOHOCRMSDK.Blueprint.Transition> = bluePrint.getTransitions();
                    // if(transitions !== undefined)
                    for (const transition of transitions) {
                        let nextTransitions: Array<ZOHOCRMSDK.Blueprint.NextTransition> = transition.getNextTransitions();
                        nextTransitions.forEach(nextTransition => {
                            console.log("NextTransition ID: " + nextTransition.getId());
                            console.log("NextTransition Name: " + nextTransition.getName());
                        });
                        console.log("Transition PercentPartialSave: " + transition.getPercentPartialSave());
                        let data: ZOHOCRMSDK.Record.Record = transition.getData();
                        if (data !== null) {
                            console.log("Record ID: " + data.getId());
                            let createdBy: ZOHOCRMSDK.Users.MinifiedUser = data.getCreatedBy();
                            if (createdBy !== null) {
                                console.log("Record Created By User-ID: " + createdBy.getId());
                                console.log("Record Created By User-Name: " + createdBy.getName());
                            }
                            if (data.getCreatedTime() !== null) {
                                console.log("Record Created Time: " + data.getCreatedTime().toString());
                            }
                            if (data.getModifiedTime() !== null) {
                                console.log("Record Modified Time: " + data.getModifiedTime().toString());
                            }
                            let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = data.getModifiedBy();
                            if (modifiedBy !== null) {
                                console.log("Record Modified By User-ID: " + modifiedBy.getId());
                                console.log("Record Modified By user-Name: " + modifiedBy.getName());
                            }
                            Array.from(data.getKeyValues().keys()).forEach(key => {
                                console.log(key + ": " + data.getKeyValues().get(key));
                            });
                        }
                        console.log("Transition NextFieldValue: " + transition.getNextFieldValue());
                        console.log("Transition Name: " + transition.getName());
                        console.log("Transition CriteriaMatched: " + transition.getCriteriaMatched().toString());
                        console.log("Transition ID: " + transition.getId());
                        if (transition.getExecutionTime() !== null) {
                            console.log("Transition Execution Time: " + transition.getExecutionTime());
                        }
                        let fields: Array<ZOHOCRMSDK.Blueprint.Field> = transition.getFields();
                        console.log("Transition Fields");
                        for (let field of fields) {
                            console.log("Webhook: " + field.getWebhook());
                            console.log("JsonType: " + field.getJsonType());
                            console.log("DisplayLabel: " + field.getDisplayLabel());
                            console.log("DataType: " + field.getDataType());
                            console.log("ColumnName: " + field.getColumnName());
                            console.log("PersonalityName: " + field.getPersonalityName());
                            console.log("ID: " + field.getId());
                            console.log("TransitionSequence: " + field.getTransitionSequence().toString());
                            if (field.getMandatory() !== null && field.getMandatory() !== undefined) {
                                console.log("Mandatory: " + field.getMandatory().toString());
                            }
                            let layout: ZOHOCRMSDK.Blueprint.Layout= await field.getLayouts();
                            if (layout != undefined && layout !== null) {
                                console.log("Layout ID: " + layout.getId());
                                console.log("Layout Name: " + layout.getName());
                            }
                            console.log("APIName: " + field.getAPIName());
                            console.log("Content: " + field.getContent());
                            if (field.getSystemMandatory() !== undefined && field.getSystemMandatory !== null) {
                                console.log("SystemMandatory: " + field.getSystemMandatory().toString());
                            }
                            console.log("Crypt: " + field.getCrypt());
                            if (field.getCrypt() !== undefined && field.getCrypt() !== null) {
                                let crypt: ZOHOCRMSDK.Blueprint.Crypt = field.getCrypt();
                                console.log("Crypt Mode: " + crypt.getMode());
                                console.log("Crypt Column: " + crypt.getColumn());
                                console.log("Crypt Table: " + crypt.getTable());
                                console.log("Crypt Status: " + crypt.getStatus());
                            }
                            console.log("FieldLabel: " + field.getFieldLabel());
                            let toolTip: ZOHOCRMSDK.Blueprint.ToolTip = field.getTooltip();
                            if (toolTip !== null && toolTip !== undefined) {
                                console.log("Tooltip Name: " + toolTip.getName());
                                console.log("Tooltip Value: " + toolTip.getValue());
                            }
                            console.log("CreatedSource: " + field.getCreatedSource());
                            if (field.getFieldReadOnly() !== null && field.getReadOnly() !== undefined) {
                                console.log("FieldReadOnly: " + field.getFieldReadOnly().toString());
                            }
                            if (field.getReadOnly() !== null && field.getReadOnly() !== undefined) {
                                console.log("ReadOnly: " + field.getReadOnly().toString());
                            }
                            console.log("AssociationDetails: " + field.getAssociationDetails());
                            console.log("DisplayLabel: " + field.getDisplayLabel());
                            if (field.getQuickSequenceNumber() !== null && field.getQuickSequenceNumber() !== undefined) {
                                console.log("QuickSequenceNumber: " + field.getQuickSequenceNumber().toString());
                            }
                            if (field.getCustomField() !== null && field.getCustomField() !== undefined) {
                                console.log("CustomField: " + field.getCustomField().toString());
                            }
                            if (field.getVisible() !== null && field.getVisible() !== undefined) {
                                console.log("Visible: " + field.getVisible().toString());
                            }
                            if (field.getLength() !== null && field.getLength() !== undefined) {
                                console.log("Length: " + field.getLength().toString());
                            }
                            console.log("DecimalPlace: " + field.getDecimalPlace());
                            let viewType: ZOHOCRMSDK.Blueprint.ViewType = field.getViewType();
                            if (viewType !== null && viewType !== undefined) {
                                console.log("View: " + viewType.getView().toString());
                                console.log("Edit: " + viewType.getEdit().toString());
                                console.log("Create: " + viewType.getCreate().toString());
                                console.log("QuickCreate: " + viewType.getQuickCreate().toString());
                            }
                            let pickListValues : ZOHOCRMSDK.Fields.PickListValue[] = field.getPickListValues();
                            if (pickListValues != null) {
                                pickListValues.forEach(pickListValue => {
                                    this.printPickListValue(pickListValue);
                                });
                            }
                            let multiSelectLookup: ZOHOCRMSDK.Blueprint.MultiSelectLookup = field.getMultiselectlookup();
                            if (multiSelectLookup != null && multiSelectLookup != undefined) {
                                console.log("DisplayLabel: " + multiSelectLookup.getDisplayLabel());
                                console.log("LinkingModule: " + multiSelectLookup.getLinkingModule());
                                console.log("LookupApiname: " + multiSelectLookup.getLookupApiname());
                                console.log("APIName: " + multiSelectLookup.getAPIName());
                                console.log("ConnectedlookupApiname: " + multiSelectLookup.getConnectedlookupApiname());
                                console.log("ID: " + multiSelectLookup.getId());
                            }
                            let autoNumber: ZOHOCRMSDK.Blueprint.AutoNumber = field.getAutoNumber();
                            if (autoNumber !== null && autoNumber !== undefined) {
                                console.log("Prefix: " + autoNumber.getPrefix());
                                console.log("Suffix: " + autoNumber.getSuffix());
                                if (autoNumber.getStartNumber() !== null && autoNumber.getStartNumber() !== undefined) {
                                    console.log("StartNumber: " + autoNumber.getStartNumber().toString());
                                }
                            }
                        }
                        console.log("Transition CriteriaMessage: " + transition.getCriteriaMessage());
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.Blueprint.APIException) {
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
            }
        }
    }
    static printPickListValue(pickListValue : ZOHOCRMSDK.Fields.PickListValue) {
        console.log("DisplayValue: " + pickListValue.getDisplayValue());
        console.log("SequenceNumber: " + pickListValue.getSequenceNumber().toString());
        console.log("ExpectedDataType: " + pickListValue.getExpectedDataType());
        console.log("ActualValue: " + pickListValue.getActualValue());
        console.log("SysRefName: " + pickListValue.getSysRefName());
        console.log("Type: " + pickListValue.getType());
        console.log("Id: " + pickListValue.getId());
        if (pickListValue.getMaps() != null) {
            pickListValue.getMaps().forEach(map => {
                let pickListValues : ZOHOCRMSDK.Fields.PickListValue[] = map.getPickListValues();
                if (pickListValues != null) {
                    pickListValues.forEach(pickListValue1 => {
                        this.printPickListValue(pickListValue1);
                    });
                }
            });
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
        await GetBluePrint.getBlueprint("Leads", "440280018301");
    }
}
GetBluePrint.initializeAndCall()
