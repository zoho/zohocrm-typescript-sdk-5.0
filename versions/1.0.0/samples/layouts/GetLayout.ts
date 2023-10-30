import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetLayout
{
    public static async getLayout(moduleAPIName: string, layoutId: bigint) {
        //example
        //let moduleAPIName = "module_api_name";
        //let layoutId = 091055n
        let layoutsOperations : ZOHOCRMSDK.Layouts.LayoutsOperations= new ZOHOCRMSDK.Layouts.LayoutsOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.Layouts.GetLayoutParam.MODULE, moduleAPIName);
        //Call getLayout method
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Layouts.ResponseHandler.MasterModel>= await layoutsOperations.getLayout(layoutId, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject : ZOHOCRMSDK.Layouts.ResponseHandler.MasterModel= response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Layouts.ResponseWrapper) {
                    let layouts : ZOHOCRMSDK.Layouts.Layouts[] = responseObject.getLayouts();
                    layouts.forEach(layout => {
                        if (layout.getCreatedTime() != null) {
                            console.log("Layout CreatedTime: " + layout.getCreatedTime().toString());
                        }
                        console.log("Layout Visible: " + layout.getVisible().toString());
                        let createdFor:  ZOHOCRMSDK.Users.MinifiedUser = layout.getCreatedFor();
                        if (createdFor != null) {
                            console.log("Layout CreatedFor User-Name: " + createdFor.getName());
                            console.log("Layout CreatedFor User-ID: " + createdFor.getId());
                            console.log("Layout CreatedFor User-Email: " + createdFor.getEmail());
                        }
                        let profiles : ZOHOCRMSDK.Layouts.Profiles[]= layout.getProfiles();
                        if (profiles != null) {
                            profiles.forEach(profile => {
                                console.log("Layout Profile Default: " + profile.getDefault().toString());
                                console.log("Layout Profile Name: " + profile.getName().toString());
                                console.log("Layout Profile ID: " + profile.getId().toString());
                                let defaultView : ZOHOCRMSDK.Layouts.DefaultView= profile.getDefaultview();
                                if (defaultView != null) {
                                    console.log("Layout Profile DefaultView Name: " + defaultView.getName());
                                    console.log("Layout Profile DefaultView ID: " + defaultView.getId());
                                    console.log("Layout Profile DefaultView Type: " + defaultView.getType());
                                }
                            });
                        }
                        let createdBy : ZOHOCRMSDK.Users.MinifiedUser= layout.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Layout CreatedBy User-Name: " + createdBy.getName());
                            console.log("Layout CreatedBy User-ID: " + createdBy.getId());
                            console.log("Layout CreatedBy User-Email: " + createdBy.getEmail());
                        }
                        let sections : ZOHOCRMSDK.Layouts.Sections[]= layout.getSections();
                        if (sections != null) {
                            sections.forEach(section => {
                                console.log("Layout Section DisplayLabel: " + section.getDisplayLabel());
                                console.log("Layout Section SequenceNumber: " + section.getSequenceNumber().toString());
                                console.log("Layout Section Issubformsection: " + section.getIssubformsection().toString());
                                console.log("Layout Section TabTraversal: " + section.getTabTraversal().toString());
                                console.log("Layout Section APIName: " + section.getAPIName());
                                console.log("Layout Section ColumnCount: " + section.getColumnCount().toString());
                                console.log("Layout Section Name: " + section.getName());
                                console.log("Layout Section GeneratedType: " + section.getGeneratedType());
                                console.log("Layout Section Type: " + section.getType());
                                let fields :  ZOHOCRMSDK.Layouts.SectionField[] = section.getFields();
                                if (fields != null) {
                                    fields.forEach(async field => {
                                        await this.printField(field);
                                    });
                                }
                                let properties : ZOHOCRMSDK.Layouts.Properties= section.getProperties();
                                if (properties != null) {
                                    console.log("Layout Section Properties ReorderRows: " + properties.getReorderRows().toString());
                                    let tooltip : ZOHOCRMSDK.Layouts.Tooltip= properties.getTooltip();
                                    if (tooltip != null) {
                                        console.log("Layout Section Properties ToolTip Name: " + tooltip.getName().toString());
                                        console.log("Layout Section Properties ToolTip Value: " + tooltip.getValue().toString());
                                    }
                                    console.log("Layout Section Properties MaximumRows: " + properties.getMaximumRows().toString());
                                }
                            });
                        }
                        console.log("Layout ShowBusinessCard: " + layout.getShowBusinessCard());
                        if (layout.getModifiedTime() != null) {
                            console.log("Layout ModifiedTime: " + layout.getModifiedTime());
                        }
                        console.log("Layout Name: " + layout.getName());
                        let modifiedBy : ZOHOCRMSDK.Users.MinifiedUser= layout.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Layout ModifiedBy User-Name: " + modifiedBy.getName());
                            console.log("Layout ModifiedBy User-ID: " + modifiedBy.getId());
                            console.log("Layout ModifiedBy User-Email: " + modifiedBy.getEmail());
                        }
                        console.log("Layout ID: " + layout.getId());
                        console.log("Layout Status: " + layout.getStatus());
                        console.log("Layout DisplayType : " + layout.getDisplayType());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Layouts.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any> = responseObject.getDetails();
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
    public static async printField(field:  ZOHOCRMSDK.Layouts.SectionField) {
        console.log("Field SystemMandatory: " + field.getSystemMandatory().toString());
        console.log("Field Webhook: " + field.getWebhook().toString());
        console.log("Field JsonType: " + field.getJsonType());
        let privateInfo :ZOHOCRMSDK.Fields.Private= field.getPrivate();
        if (privateInfo != null) {
            console.log("Private Details\n");
            console.log("Field Private Type: " + privateInfo.getType());
            console.log("Field Private Export: " + privateInfo.getExport());
            console.log("Field Private Restricted: " + privateInfo.getRestricted());
        }
        let crypt : ZOHOCRMSDK.Fields.Crypt= field.getCrypt();
        if (crypt != null) {
            console.log("Crypt Details");
            console.log("Field Crypt Mode: " + crypt.getMode());
            console.log("Field Crypt Column: " + crypt.getColumn());
            console.log("Field Crypt Table: " + crypt.getTable());
            console.log("Field Crypt Status: " + crypt.getStatus().toString());
            let encFldIds : string[]= crypt.getEncfldids();
            if (encFldIds != null) {
                console.log("EncFldIds : ");
                encFldIds.forEach(encFldId => {
                    console.log(encFldId);
                });
            }
            console.log("Field Crypt Notify: " + crypt.getNotify());
        }
        console.log("Field FieldLabel: " + field.getFieldLabel());
        let toolTip : ZOHOCRMSDK.Fields.Tooltip= field.getTooltip();
        if (toolTip != null) {
            console.log("Field ToolTip Name: " + toolTip.getName());
            console.log("Field ToolTip Value: " + toolTip.getValue());
        }
        console.log("Field CreatedSource: " + field.getCreatedSource());
        console.log("Field FieldReadOnly: " + field.getFieldReadOnly().toString());
        console.log("Field DisplayLabel: " + field.getDisplayLabel());
        console.log("Field ReadOnly: " + field.getReadOnly().toString());
        let associationDetails :  ZOHOCRMSDK.Fields.AssociationDetails = field.getAssociationDetails();
        if (associationDetails != null) {
            let lookupField: ZOHOCRMSDK.Modules.MinifiedModule = associationDetails.getLookupField();
            if (lookupField != null) {
                console.log("Field AssociationDetails LookupField ID: " + lookupField.getId());
                console.log("Field AssociationDetails LookupField Name: " + lookupField.getAPIName())
            }
            let relatedField : ZOHOCRMSDK.Modules.MinifiedModule= associationDetails.getRelatedField();
            if (relatedField != null) {
                console.log("Field AssociationDetails RelatedField ID: " + relatedField.getId());
                console.log("Field AssociationDetails RelatedField Name: " + relatedField.getAPIName());
            }
        }
        console.log("Field Filterable: "+ field.getFilterable() );
        if(field.getHistoryTracking() != null)
        {
            let historytracking :  ZOHOCRMSDK.Fields.HistoryTracking = field.getHistoryTracking();
            let module :  ZOHOCRMSDK.Fields.HistoryTrackingModule =  historytracking.getModule();
            if (module != null) {
                let moduleLayout : ZOHOCRMSDK.Layouts.Layouts = module.getLayout();
                if (moduleLayout != null) {
                    console.log("Module Layout ID" + moduleLayout.getId());
                }
                console.log("Module Layout Module DisplayLabe" + module.getDisplayLabel());
                console.log("Module Layout Module APIName" + module.getAPIName());
                console.log("Module Layout Module ID" + module.getId());
                console.log("Module Layout Module" + module.getModule());
                console.log("Module Layout Module Name" + module.getModuleName());
            }
            let durationConfigured :  ZOHOCRMSDK.Modules.MinifiedModule = historytracking.getDurationConfiguredField();
            if(durationConfigured != null) {
                console.log("historytracking duration configured field" + durationConfigured.getId());
            }
        }
        if (field.getBusinesscardSupported() != null) {
            console.log("Field BusinesscardSupported: " + field.getBusinesscardSupported().toString());
        }
        let currency :  ZOHOCRMSDK.Fields.Currency = field.getCurrency();
        if (currency != null) {
            console.log("Field Currency RoundingOption: " + currency.getRoundingOption());
            if (currency.getPrecision() != null) {
                console.log("Field Currency Precision: " + currency.getPrecision().toString());
            }
        }
        if (field.getQuickSequenceNumber() != null) {
            console.log("Field QuickSequenceNumber: " + field.getQuickSequenceNumber().toString());
        }
        console.log("Field ID: " + field.getId().toString());
        if (field.getCustomField() != null) {
            console.log("Field CustomField: " + field.getCustomField().toString());
        }
        let lookup :  ZOHOCRMSDK.Fields.Lookup = field.getLookup();
        if (lookup != null) {
            console.log("Field Lookup DisplayLabel: " + lookup.getDisplayLabel());
            console.log("Field Lookup APIName: " + lookup.getAPIName());
            console.log("Field Lookup Module: " + lookup.getModule());
            if (lookup.getId() != null) {
                console.log("Field Lookup ID: " + lookup.getId().toString());
            }
        }
        if (field.getVisible() != null) {
            console.log("Field Visible: " + field.getVisible().toString());
        }
        console.log("Field PickListValuesSortedLexically: " + field.getPickListValuesSortedLexically());
        console.log("Field Sortable: " + field.getSortable());
        console.log("Field UIType: " + field.getUiType());
        if (field.getSequenceNumber() != null) {
            console.log("Field PickListValue SequenceNumber: " + field.getSequenceNumber().toString());
        }
        let profiles : ZOHOCRMSDK.Fields.Profile[] = field.getProfiles();
        if (profiles != null) {
            profiles.forEach(profile => {
                console.log("Field Profile PermissionType: " + profile.getPermissionType());
                console.log("Field Profile Name: " + profile.getName());
                console.log("Field Profile Id: " + profile.getId());
            });
        }
        if(field.getLength() != null) {
            console.log("Field Length: " + field.getLength().toString());
        }
        let viewType :  ZOHOCRMSDK.Fields.ViewType = field.getViewType();
        if (viewType != null) {
            console.log("Field ViewType View: " + viewType.getView().toString());
            console.log("Field ViewType Edit: " + viewType.getEdit().toString());
            console.log("Field ViewType Create: " + viewType.getCreate().toString());
            console.log("Field ViewType QuickCreate: " + viewType.getQuickCreate().toString());
        }
        let subform :  ZOHOCRMSDK.Modules.MinifiedModule = field.getAssociatedModule();
        if (subform != null)
        {
            console.log("Field Subform Module: " + subform.getModule());
            console.log("Field Subform ID: " + subform.getId().toString());
        }
        console.log("Field APIName: " + field.getAPIName().toString());
        let unique : ZOHOCRMSDK.Fields.Unique = field.getUnique();
        if (unique != null) {
            console.log("Field Unique Casesensitive : " + unique.getCasesensitive());
        }
        console.log("Field DataType: " + field.getDataType().toString());
        let formula: ZOHOCRMSDK.Fields.Formula = field.getFormula();
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
            console.log("Field MultiSelectLookup ConnectedModule: " + multiSelectLookup.getConnectedModule());
            console.log("Field MultiSelectLookup ConnectedlookupApiname: " + multiSelectLookup.getConnectedlookupApiname());
            console.log("Field MultiSelectLookup ID: " + multiSelectLookup.getId());
        }
        let pickListValues : ZOHOCRMSDK.Fields.PickListValue[] = field.getPickListValues();
        if (pickListValues != null) {
            for (const pickListValue of pickListValues) {
                await this.printPickListValue(pickListValue);
            }
        }
        let autoNumber :  ZOHOCRMSDK.Fields.AutoNumber = field.getAutoNumber();
        if (autoNumber != null) {
            console.log("Field AutoNumber Prefix: " + autoNumber.getPrefix());
            console.log("Field AutoNumber Suffix: " + autoNumber.getSuffix());
            if (autoNumber.getStartNumber() != null) {
                console.log("Field AutoNumber StartNumber: " + autoNumber.getStartNumber().toString());
            }
        }
        if(field.getDefaultValue() != null){
            console.log("Field DefaultValue: " + field.getDefaultValue().toString());
        }
        console.log("Field DisplayType: " + field.getDisplayType());
        if(field.getValidationRule() != null) {
            console.log("Field ValidationRule: \n");
            Array.from(field.getValidationRule().keys()).forEach(key => {
                console.log(key + ": " + field.getValidationRule().get(key));
            });
        }
        console.log("Get field type" + field.getType());
        let external : ZOHOCRMSDK.Fields.External = field.getExternal();
        if (external != null) {
            console.log("Field External Show: " + external.getShow());
            console.log("Field External Type: " + external.getType());
            console.log("Field External AllowMultipleConfig: " + external.getAllowMultipleConfig());
        }
        //get multi user lookup for field
        if (field.getMultiuserlookup() != null) {
            let multiuserlookup : ZOHOCRMSDK.Fields.Multiselectlookup= field.getMultiuserlookup();
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
    }
    public static async printPickListValue(pickListValue:  ZOHOCRMSDK.Fields.PickListValue) {
        console.log("Field PickListValue DisplayValue: " + pickListValue.getDisplayValue());
        if (pickListValue.getSequenceNumber() != null) {
            console.log("Field PickListValue SequenceNumber: " + pickListValue.getSequenceNumber().toString());
        }
        console.log("Field PickListValue ExpectedDataType: " + pickListValue.getExpectedDataType());
        if (pickListValue.getMaps() != null) {
            pickListValue.getMaps().forEach(map => {
                console.log("Field PickListValue Maps APIName: " + map.getAPIName());
                let pickListValues : ZOHOCRMSDK.Fields.PickListValue[]= map.getPickListValues();
                if (pickListValues != null) {
                    pickListValues.forEach(async pickListValue1 => {
                        await this.printPickListValue(pickListValue1);
                    });
                }
            });
        }
        console.log("Field PickListValue ActualValue: " + pickListValue.getActualValue());
        console.log("Field PickListValue SysRefName: " + pickListValue.getSysRefName());
        console.log("Field PickListValue Type: " + pickListValue.getType());
        console.log("Field PickListValue Id: " + pickListValue.getId());
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
        await GetLayout.getLayout("Leads", BigInt('440280167'));
    }
}
GetLayout.initializeAndCall()
