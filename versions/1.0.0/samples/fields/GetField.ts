import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetField
{
    public static async getField(moduleAPIName: string, fieldId: bigint) {
        //example
        // let moduleAPIName = "Leads"
        // let fieldId = 34096432293043n
        let fieldsOperations: ZOHOCRMSDK.Fields.FieldsOperations = new ZOHOCRMSDK.Fields.FieldsOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.Fields.GetFieldParam.MODULE, moduleAPIName);
        //Call getField method which takes fieldId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Fields.ResponseHandler.MasterModel> = await fieldsOperations.getField(fieldId, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Fields.BodyWrapper) {
                    let fields : ZOHOCRMSDK.Fields.Fields[] = responseObject.getFields();
                    fields.forEach(field => {
                        console.log("Field SystemMandatory: " + field.getSystemMandatory().toString());
                        console.log("Field Webhook: " + field.getWebhook().toString());
                        console.log("Field JsonType: " + field.getJsonType());
                        let privateInfo : ZOHOCRMSDK.Fields.Private = field.getPrivate();
                        if (privateInfo != null) {
                            console.log("Private Details\n");
                            console.log("Field Private Type: " + privateInfo.getType());
                            console.log("Field Private Export: " + privateInfo.getExport());
                            console.log("Field Private Restricted: " + privateInfo.getRestricted());
                        }
                        let crypt : ZOHOCRMSDK.Fields.Crypt= field.getCrypt();
                        if (crypt != null) {
                            console.log("Field Crypt Mode: " + crypt.getMode());
                            console.log("Field Crypt Column: " + crypt.getColumn());
                            console.log("Field Crypt Table: " + crypt.getTable());
                            console.log("Field Crypt Status: " + crypt.getStatus().toString());
                            let encFldIds : string[] = crypt.getEncfldids();
                            if (encFldIds != null) {
                                console.log("EncFldIds : ");
                                encFldIds.forEach(encFldId => {
                                    console.log(encFldId);
                                });
                            }
                            console.log("Field Crypt Notify: " + crypt.getNotify());
                        }
                        console.log("Field FieldLabel: " + field.getFieldLabel());
                        let toolTip : ZOHOCRMSDK.Fields.Tooltip = field.getTooltip();
                        if (toolTip != null) {
                            console.log("Field ToolTip Name: " + toolTip.getName());
                            console.log("Field ToolTip Value: " + toolTip.getValue());
                        }
                        console.log("Field CreatedSource: " + field.getCreatedSource());
                        console.log("Field Type: " + field.getType());
                        console.log("Field FieldReadOnly: " + field.getFieldReadOnly().toString());
                        console.log("Field DisplayLabel: " + field.getDisplayLabel());
                        console.log("Field DisplayType: " + field.getDisplayType());
                        console.log("Field UIType: " + field.getUiType());
                        console.log("Field ReadOnly: " + field.getReadOnly().toString());
                        let associationDetails : ZOHOCRMSDK.Fields.AssociationDetails= field.getAssociationDetails();
                        if (associationDetails != null) {
                            let lookupField : ZOHOCRMSDK.Modules.MinifiedModule= associationDetails.getLookupField();
                            if (lookupField != null) {
                                console.log("Field AssociationDetails LookupField ID: " + lookupField.getId());
                                console.log("Field AssociationDetails LookupField Name: " + lookupField.getAPIName())
                            }
                            let relatedField : ZOHOCRMSDK.Modules.MinifiedModule = associationDetails.getRelatedField();
                            if (relatedField != null) {
                                console.log("Field AssociationDetails RelatedField ID: " + relatedField.getId());
                                console.log("Field AssociationDetails RelatedField Name: " + relatedField.getAPIName());
                            }
                        }
                        if (field.getQuickSequenceNumber() != null) {
                            console.log("Field QuickSequenceNumber: " + field.getQuickSequenceNumber().toString());
                        }
                        if (field.getBusinesscardSupported() != null) {
                            console.log("Field BusinesscardSupported: " + field.getBusinesscardSupported().toString());
                        }
                        let multiModuleLookup : ZOHOCRMSDK.Fields.MultiModuleLookup= field.getMultiModuleLookup();
                        if (multiModuleLookup != null) {
                            console.log("Field MultiModuleLookup Name: " + multiModuleLookup.getAPIName());
                            console.log("Field MultiModuleLookup DisplayLabel: " + multiModuleLookup.getDisplayLabel());
                            let module1 : ZOHOCRMSDK.Modules.MinifiedModule[] = multiModuleLookup.getModules();
                            if (module1 != null) {
                                module1.forEach(module=>{
                                    console.log("Field MultiModuleLookup Module APIName: " + module.getAPIName());
                                    console.log("Field MultiModuleLookup Module Id: " + module.getId());
                                });
                            }
                        }
                        let currency : ZOHOCRMSDK.Fields.Currency= field.getCurrency();
                        if (currency != null) {
                            console.log("Field Currency RoundingOption: " + currency.getRoundingOption());
                            if (currency.getPrecision() != null) {
                                console.log("Field Currency Precision: " + currency.getPrecision().toString());
                            }
                        }
                        console.log("Field ID: " + field.getId());
                        if (field.getCustomField() != null) {
                            console.log("Field CustomField: " + field.getCustomField().toString());
                        }
                        let lookup : ZOHOCRMSDK.Fields.Lookup= field.getLookup();
                        if (lookup != null) {
                            console.log("Field ModuleLookup DisplayLabel: " + lookup.getDisplayLabel());
                            console.log("Field ModuleLookup RevalidateFilterDuringEdit: " + lookup.getRevalidateFilterDuringEdit());
                            console.log("Field ModuleLookup APIName: " + lookup.getAPIName());
                            let module : ZOHOCRMSDK.Modules.MinifiedModule= lookup.getModule();
                            if (module != null)
                            {
                                console.log("Field ModuleLookup Module APIName: " + module.getAPIName());
                                console.log("Field ModuleLookup Module Id: " + module.getId());
                            }
                            let querydetails : ZOHOCRMSDK.Fields.QueryDetails= lookup.getQueryDetails();
                            if (querydetails != null)
                            {
                                console.log("Field ModuleLookup QueryDetails Query Id: " + querydetails.getQueryId());
                            }
                            if (lookup.getId() != null)
                            {
                                console.log("Field ModuleLookup ID: " + lookup.getId().toString());
                            }
                        }
                        console.log("Field Filterable: " + field.getFilterable());
                        if (field.getVisible() != null) {
                            console.log("Field Visible: " + field.getVisible().toString());
                        }
                        let profiles :  ZOHOCRMSDK.Fields.Profile[] = field.getProfiles();
                        if (profiles != null) {
                            profiles.forEach(profile => {
                                console.log("Field Profile PermissionType: " + profile.getPermissionType());
                                console.log("Field Profile Name: " + profile.getName());
                                console.log("Field Profile Id: " + profile.getId());
                            });
                        }
                        if (field.getLength() != null) {
                            console.log("Field Length: " + field.getLength().toString());
                        }
                        let viewType: ZOHOCRMSDK.Fields.ViewType = field.getViewType();
                        if (viewType != null) {
                            console.log("Field ViewType View: " + viewType.getView().toString());
                            console.log("Field ViewType Edit: " + viewType.getEdit().toString());
                            console.log("Field ViewType Create: " + viewType.getCreate().toString());
                            console.log("Field ViewType QuickCreate: " + viewType.getQuickCreate().toString());
                        }
                        if(field.getDisplayField() != null) {
                            //check if field is DisplayField
                            console.log("Field DisplayField " + field.getDisplayField());
                        }
                        console.log("Field PickListValuesSortedLexically: " + field.getPickListValuesSortedLexically());
                        console.log("Field Sortable: " + field.getSortable());
                        let subform :  ZOHOCRMSDK.Modules.MinifiedModule = field.getAssociatedModule();
                        if (subform != null) {
                            console.log("Field Subform Module: " + subform.getModule());
                            if (subform.getId() != null) {
                                console.log("Field Subform ID: " + subform.getId().toString());
                            }
                        }
                        if(field.getSequenceNumber() != null) {
                            //get UI type of field
                            console.log("Field sequence number " + field.getSequenceNumber());
                        }
                        let external: ZOHOCRMSDK.Fields.External = field.getExternal();
                        if (external != null) {
                            console.log("Field External Show: " + external.getShow());
                            console.log("Field External Type: " + external.getType());
                            console.log("Field External AllowMultipleConfig: " + external.getAllowMultipleConfig());
                        }
                        console.log("Field APIName: " + field.getAPIName().toString());
                        let unique : ZOHOCRMSDK.Fields.Unique = field.getUnique();
                        if (unique != null) {
                            console.log("Field Unique Casesensitive : " + unique.getCasesensitive());
                        }
                        if (field.getHistoryTracking() != null) {
                            let historytracking : ZOHOCRMSDK.Fields.HistoryTracking= field.getHistoryTracking();
                            let module : ZOHOCRMSDK.Fields.HistoryTrackingModule =  historytracking.getModule();
                            if (module != null) {
                                let moduleLayout : ZOHOCRMSDK.Layouts.Layouts= module.getLayout();
                                if (moduleLayout != null) {
                                    console.log("Module Layout ID" + moduleLayout.getId());
                                }
                                console.log("Module DisplayLabel" + module.getDisplayLabel());
                                console.log("Module APIName" + module.getAPIName());
                                console.log("Module ID" + module.getId());
                                console.log("Module Module" + module.getModule());
                                console.log("Module ModuleName"+module.getModuleName());
                            }
                            let durationConfigured : ZOHOCRMSDK.Modules.MinifiedModule= historytracking.getDurationConfiguredField();
                            if(durationConfigured != null) {
                                console.log("Historytracking duration configured field" + durationConfigured.getId());
                            }
                        }
                        console.log("Field DataType: " + field.getDataType().toString());
                        let formula : ZOHOCRMSDK.Fields.Formula= field.getFormula();
                        if (formula != null) {
                            console.log("Field Formula ReturnType : " + formula.getReturnType());
                            if (formula.getExpression() != null) {
                                console.log("Field Formula Expression : " + formula.getExpression().toString());
                            }
                        }
                        if (field.getDecimalPlace() != null) {
                            console.log("Field DecimalPlace: " + field.getDecimalPlace().toString());
                        }
                        console.log("Field MassUpdate: " + field.getMassUpdate());
                        if (field.getBlueprintSupported() != null) {
                            console.log("Field BlueprintSupported: " + field.getBlueprintSupported().toString());
                        }
                        let multiSelectLookup : ZOHOCRMSDK.Fields.Multiselectlookup= field.getMultiselectlookup();
                        if (multiSelectLookup != null) {
                            console.log("Field MultiSelectLookup DisplayLabel: " + multiSelectLookup.getDisplayLabel());
                            console.log("Field MultiSelectLookup LinkingModule: " + multiSelectLookup.getLinkingModule());
                            console.log("Field MultiSelectLookup LookupApiname: " + multiSelectLookup.getLookupApiname());
                            console.log("Field MultiSelectLookup APIName: " + multiSelectLookup.getAPIName());
                            console.log("Field MultiSelectLookup ConnectedlookupApiname: " + multiSelectLookup.getConnectedlookupApiname());
                            console.log("Field MultiSelectLookup ID: " + multiSelectLookup.getId());
                            console.log("Field MultiSelectLookup ConnectedModule: " + multiSelectLookup.getConnectedModule());
                        }
                        let pickListValues : ZOHOCRMSDK.Fields.PickListValue[] = field.getPickListValues();
                        if (pickListValues != null) {
                            pickListValues.forEach(async pickListValue => {
                                await this.printPickListValue(pickListValue);
                            });
                        }
                        let autoNumber : ZOHOCRMSDK.Fields.AutoNumber = field.getAutoNumber();
                        if (autoNumber != null) {
                            console.log("Field AutoNumber Prefix: " + autoNumber.getPrefix());
                            console.log("Field AutoNumber Suffix: " + autoNumber.getSuffix());
                            if (autoNumber.getStartNumber() != null) {
                                console.log("Field AutoNumber StartNumber: " + autoNumber.getStartNumber().toString());
                            }
                        }
                        if(field.getDefaultValue() != null) {
                            console.log("Field DefaultValue: " + field.getDefaultValue());
                        }
                        if (field.getConvertMapping() != null) {
                            let convertMapping :  ZOHOCRMSDK.Fields.ConvertMapping= field.getConvertMapping();
                            console.log("Field ConvertMapping Account : " + convertMapping.getAccounts());
                            console.log("Field ConvertMapping Contact : "+ convertMapping.getContacts());
                            console.log("Field ConvertMapping Account : "+ convertMapping.getDeals());
                        }
                        //get multi user lookup for field
                        if (field.getMultiuserlookup() != null) {
                            let multiuserlookup :  ZOHOCRMSDK.Fields.Multiselectlookup = field.getMultiuserlookup();
                            //get displaylabel of multiuser lookup
                            console.log("Field MultiUserLookup DisplayLabel" + multiuserlookup.getDisplayLabel());
                            //get linking module of multiuser lookup
                            console.log("Field MultiUserLookup LinkingModule" + multiuserlookup.getLinkingModule());
                            //get lookup apiname of multiuser lookup
                            console.log("Field MultiUserLookup LookupApiname" + multiuserlookup.getLookupApiname());
                            //get apiname of multiuser lookup
                            console.log("Field MultiUserLookup APIName" + multiuserlookup.getAPIName());
                            //get id of multiuser lookup
                            console.log("Field MultiUserLookup ID" + multiuserlookup.getId());
                            //get connected module of multiuser lookup
                            console.log("Field MultiUserLookup ConnectedModule" + multiuserlookup.getConnectedModule());
                            //get connected lookup apiname of multiuser lookup
                            console.log("Field MultiUserLookup ConnectedlookupApiname" + multiuserlookup.getConnectedlookupApiname());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Fields.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details = responseObject.getDetails();
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
    static async printPickListValue(pickListValue: ZOHOCRMSDK.Fields.PickListValue) {
        console.log("Field PickListValue DisplayValue: " + pickListValue.getDisplayValue());
        console.log(" Fields PickListValue Probability: " + pickListValue.getProbability());
        console.log(" Fields PickListValue ForecastCategory: " + pickListValue.getForecastCategory());
        if (pickListValue.getSequenceNumber() != null) {
            console.log("Field PickListValue SequenceNumber: " + pickListValue.getSequenceNumber().toString());
        }
        console.log("Field PickListValue ExpectedDataType: " + pickListValue.getExpectedDataType());
        console.log("Field PickListValue ActualValue: " + pickListValue.getActualValue());
        console.log("Field PickListValue SysRefName: " + pickListValue.getSysRefName());
        console.log("Field PickListValue Type: " + pickListValue.getType());
        console.log("Field PickListValue Id: " + pickListValue.getId());
        console.log(" Fields PickListValue ForecastType: " + pickListValue.getForecastType());
        if (pickListValue.getMaps() != null) {
            pickListValue.getMaps().forEach(map => {
                console.log("Field PickListValue Maps APIName: " + map.getAPIName());
                let pickListValues :  ZOHOCRMSDK.Fields.PickListValue[] = map.getPickListValues();
                if (pickListValues != null) {
                    pickListValues.forEach(async pickListValue1 => {
                        await this.printPickListValue(pickListValue1);
                    });
                }
            });
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
        await GetField.getField("Leads", BigInt("44028001408253"));
    }
}
GetField.initializeAndCall()
