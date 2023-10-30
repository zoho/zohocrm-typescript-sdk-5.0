import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetModuleByAPIName {
    /**
     * <h3> Get Module </h3>
     * This method is used to get metadata about single module with it's API Name and print the response.
     * @param {String} moduleAPIName The API Name of the module to obtain metadata
     */
    static async getModuleByAPIName(moduleAPIName : string) {
        let modulesOperations : ZOHOCRMSDK.Modules.ModulesOperations= new ZOHOCRMSDK.Modules.ModulesOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Modules.ResponseHandler.MasterModel>= await modulesOperations.getModuleByAPIName(moduleAPIName);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject :ZOHOCRMSDK.Modules.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Modules.ResponseWrapper) {
                    let modules : ZOHOCRMSDK.Modules.Modules[] = responseObject.getModules();
                    for (const module of modules) {
                        console.log("Module GlobalSearchSupported: " + module.getGlobalSearchSupported());
                        if (module.getKanbanView() != null) {
                            console.log("Module KanbanView: " + module.getKanbanView());
                        }
                        console.log("Module Deletable: " + module.getDeletable());
                        console.log("Module Description: " + module.getDescription());
                        console.log("Module Creatable: " + module.getCreatable());
                        if (module.getFilterStatus() != null) {
                            console.log("Module FilterStatus: " + module.getFilterStatus());
                        }
                        console.log("Module InventoryTemplateSupported: " + module.getInventoryTemplateSupported());
                        if (module.getModifiedTime() != null) {
                            console.log("Module ModifiedTime: " + module.getModifiedTime());
                        }
                        console.log("Module PluralLabel: " + module.getPluralLabel());
                        console.log("Module PresenceSubMenu: " + module.getPresenceSubMenu());
                        console.log("Module TriggersSupported: " + module.getTriggersSupported());
                        console.log("Module Id: " + module.getId());
                        console.log("Module IsBlueprintSupported: " + module.getIsblueprintsupported());
                        let relatedListProperties :  ZOHOCRMSDK.Modules.RelatedListProperties = module.getRelatedListProperties();
                        if (relatedListProperties != null) {
                            console.log("Module RelatedListProperties SortBy: " + relatedListProperties.getSortBy());
                            let fields : string[] = relatedListProperties.getFields();
                            if (fields != null) {
                                fields.forEach(fieldName => {
                                    console.log("Module RelatedListProperties Fields: " + fieldName);
                                });
                            }
                            console.log("Module RelatedListProperties SortOrder: " + relatedListProperties.getSortOrder());
                        }
                        console.log("Module PerPage: " + module.getPerPage());
                        let properties : string[] = module.getProperties();
                        if (properties != null) {
                            properties.forEach(fieldName => {
                                console.log("Module Properties Fields: " + fieldName);
                            });
                        }
                        console.log("Module visible: " + module.getVisible());
                        console.log("Module Visibility: " + module.getVisibility());
                        console.log("Module Convertable: " + module.getConvertable());
                        console.log("Module Editable: " + module.getEditable());
                        console.log("Module EmailtemplateSupport: " + module.getEmailtemplateSupport());
                        let profiles : ZOHOCRMSDK.Profiles.MinifiedProfile[] = module.getProfiles();
                        if (profiles != null) {
                            profiles.forEach(profile => {
                                console.log("Module Profile Name: " + profile.getName());
                                console.log("Module Profile Id: " + profile.getId());
                            });
                        }
                        console.log("Module FilterSupported: " + module.getFilterSupported());
                        let onDemandProperties : string[] = module.getOnDemandProperties();
                        if(onDemandProperties != null) {
                            onDemandProperties.forEach(fieldName => {
                                console.log("Module onDemandProperties Fields: " + fieldName);
                            });
                        }
                        console.log("Module DisplayField: " + module.getDisplayField());
                        let searchLayoutFields : string[] = module.getSearchLayoutFields();
                        if (searchLayoutFields != null) {
                            searchLayoutFields.forEach(fieldName => {
                                console.log("Module SearchLayoutFields Fields: " + fieldName);
                            });
                        }
                        if (module.getKanbanViewSupported() != null) {
                            console.log("Module KanbanViewSupported: " + module.getKanbanViewSupported());
                        }
                        console.log("Module ShowAsTab: " + module.getShowAsTab());
                        console.log("Module WebLink: " + module.getWebLink());
                        console.log("Module SequenceNumber: " + module.getSequenceNumber());
                        console.log("Module SingularLabel: " + module.getSingularLabel());
                        console.log("Module Viewable: " + module.getViewable());
                        console.log("Module APISupported: " + module.getAPISupported());
                        console.log("Module APIName: " + module.getAPIName());
                        console.log("Module QuickCreate: " + module.getQuickCreate());
                        let modifiedBy :  ZOHOCRMSDK.Users.MinifiedUser = module.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Module Modified By User-Name: " + modifiedBy.getName());
                            console.log("Module Modified By User-ID: " + modifiedBy.getId());
                        }
                        console.log("Module GeneratedType: " + module.getGeneratedType().getValue());
                        console.log("Module FeedsRequired: " + module.getFeedsRequired());
                        console.log("Module ScoringSupported: " + module.getScoringSupported());
                        console.log("Module WebformSupported: " + module.getWebformSupported());
                        let moduleArguments :  ZOHOCRMSDK.Modules.Argument[] = module.getArguments();
                        if (moduleArguments != null) {
                            moduleArguments.forEach(argument => {
                                console.log("Module Argument Name: " + argument.getName());
                                console.log("Module Argument Value: " + argument.getValue());
                            });
                        }
                        console.log("Module ModuleName: " + module.getModuleName());
                        console.log("Module BusinessCardFieldLimit: " + module.getBusinessCardFieldLimit());
                        let customView : ZOHOCRMSDK.CustomViews.CustomView = module.getCustomView();
                        if (customView != null) {
                            await this.printCustomView(customView);
                        }
                        let parentModule : ZOHOCRMSDK.Modules.MinifiedModule = module.getParentModule();
                        if (parentModule != null && parentModule.getAPIName() != null) {
                            console.log("Module Parent Module Name: " + parentModule.getAPIName());
                            console.log("Module Parent Module Id: " + parentModule.getId());
                        }
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.Modules.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any>  = responseObject.getDetails();
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
    static async printCustomView(customView: ZOHOCRMSDK.CustomViews.CustomView ) {
        console.log("CustomView DisplayValue: " + customView.getDisplayValue());
        if(customView.getCreatedTime() != null) {
            console.log("Module CustomView CreatedTime: " + customView.getCreatedTime());
        }
        console.log("Module CustomView AccessType: " + customView.getAccessType());
        let criteria : ZOHOCRMSDK.CustomViews.Criteria = customView.getCriteria();
        if (criteria != null) {
            await this.printCriteria(criteria);
        }
        console.log("CustomView SystemName: " + customView.getSystemName());
        console.log("CustomView SortBy: " + customView.getSortBy());
        let createdBy : ZOHOCRMSDK.CustomViews.Owner= customView.getCreatedBy();
        if(createdBy != null) {
            console.log("Module Created By User-Name: " + createdBy.getName());
            console.log("Module Created By User-ID: " + createdBy.getId());
        }
        let sharedToDetails: ZOHOCRMSDK.CustomViews.SharedTo[] = customView.getSharedTo();
        if(sharedToDetails != null) {
            sharedToDetails.forEach(sharedTo => {
                console.log("SharedDetails Name: " + sharedTo.getName());
                console.log("SharedDetails ID: " + sharedTo.getId());
                console.log("SharedDetails Type: " + sharedTo.getType());
                console.log("SharedDetails Subordinates: " + sharedTo.getSubordinates());
            });
        }
        console.log("CustomView Default: " + customView.getDefault());
        if(customView.getModifiedTime() != null) {
            console.log("Module CustomView ModifiedTime: " + customView.getModifiedTime());
        }
        console.log("CustomView Name: " + customView.getName());
        console.log("CustomView SystemDefined: " + customView.getSystemDefined());
        let modifiedBy : ZOHOCRMSDK.CustomViews.Owner = customView.getModifiedBy();
        if(modifiedBy != null) {
            console.log("Module Modified By User-Name: " + modifiedBy.getName());
            console.log("Module Modified By User-ID: " + modifiedBy.getId());
        }
        console.log("CustomView ID: " + customView.getId());
        let fields : ZOHOCRMSDK.CustomViews.Fields[]= customView.getFields();
        if (fields != null) {
            console.log("Fields");
            fields.forEach(field => {
                console.log("Module CustomView Field APIName: " + field.getAPIName());
                console.log("Module CustomView Field ID: " + field.getId());
            });
        }
        console.log("CustomView Category: " + customView.getCategory());
        if(customView.getLastAccessedTime() != null)
        {
            console.log("Module CustomView LastAccessedTime: " + customView.getLastAccessedTime());
        }
        if (customView.getFavorite() != null) {
            console.log("CustomView Favorite: " + customView.getFavorite());
        }
        if (customView.getSortOrder() != null) {
            console.log("CustomView SortOrder: " + customView.getSortOrder());
        }
    }
    static async printCriteria(criteria: ZOHOCRMSDK.CustomViews.Criteria) {
        if (criteria.getComparator() != null) {
            console.log("CustomView Criteria Comparator: " + criteria.getComparator());
        }
        if (criteria.getField() != null) {
            console.log("CustomView Criteria Field: " + criteria.getField());
        }
        let field : ZOHOCRMSDK.CustomViews.Field= criteria.getField();
        if (field != null) {
            console.log("CustomView Criteria Field APIName : " + field.getAPIName());
            console.log("CustomView Criteria Field Id: " + field.getId());
        }
        if (criteria.getValue() != null) {
            console.log("CustomView Criteria Value: " + criteria.getValue());
        }
        let criteriaGroup : ZOHOCRMSDK.CustomViews.Criteria[] = criteria.getGroup();
        if (criteriaGroup != null) {
           for (const eachCriteria of criteriaGroup)
           {
               await this.printCriteria(eachCriteria);
           }
        }
        if (criteria.getGroupOperator() != null) {
            console.log("CustomView Criteria Group Operator: " + criteria.getGroupOperator());
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
        let moduleAPIName: string = "leads"
        await GetModuleByAPIName.getModuleByAPIName(moduleAPIName);
    }
}
GetModuleByAPIName.initializeAndCall();
