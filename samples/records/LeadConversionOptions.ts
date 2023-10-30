import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class LeadConversionOptions
{
    static async leadConversionOptions(recordId: bigint)
    {
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations = new ZOHOCRMSDK.Record.RecordOperations();
        let moduleAPIName = "Leads";
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.ResponseHandler.MasterModel>=await recordOperations.leadConversionOptions(recordId, moduleAPIName);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.Record.ResponseHandler.MasterModel= response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.Record.ConversionOptionsResponseWrapper)
            {
                let conversionOption :  ZOHOCRMSDK.Record.ConversionOption= responseHandler.getConversionoptions();
                let module:  ZOHOCRMSDK.Modules.Modules = conversionOption.getModulePreference();
                if (module != null)
                {
                    console.log("ConversionOptions ModulePreference API-Name: " + module.getAPIName());
                    console.log("ConversionOptions ModulePreference ID: " + module.getId());
                }
                let contacts :  ZOHOCRMSDK.Record.Record[] = conversionOption.getContacts();
                if (contacts != null)
                {
                    contacts.forEach(contact => {
                        console.log("Record ID : " + contact.getId());
                        console.log("Record keyValues : ");
                        Array.from(contact.getKeyValues().keys()).forEach(key => {
                            let keyName = key;
                            let value = (contact.getKeyValues()).get(key);
                            if (Array.isArray(value))
                            {
                                console.log("Record KeyName : " + keyName);
                                let dataList = value;
                                dataList.forEach(data => {
                                    if (data instanceof Map)
                                    {
                                        console.log("Record KeyName : " + keyName + " - Value : ");
                                        Array.from(data.keys()).forEach(key => {
                                            console.log(key + " : " + data.get(key));
                                        });
                                    }
                                    else
                                    {
                                        console.log(data);
                                    }
                                });
                            }
                            else if (value instanceof Map)
                            {
                                console.log("Record KeyName : " + keyName + " - value :");
                                Array.from(value.keys()).forEach(key => {
                                    console.log(key + " : "+ value.get(key));
                                });
                            }
                            else
                            {
                                console.log("Record KeyName : " + keyName + " - Value : " + value);
                            }
                        });
                    });
                }
                let preferenceFieldMatchedValue :  ZOHOCRMSDK.Record.PreferenceFieldMatchedValue = conversionOption.getPreferenceFieldMatchedValue();
                if (preferenceFieldMatchedValue != null)
                {
                    let contactsPreferenceField :  ZOHOCRMSDK.Record.Record[] = preferenceFieldMatchedValue.getContacts();
                    if (contactsPreferenceField != null)
                    {
                        contactsPreferenceField.forEach(contact => {
                            console.log("Record ID: " + contact.getId());
                            console.log("Record KeyValues: ");
                            Array.from(contact.getKeyValues().keys()).forEach(key => {
                                let keyName = key;
                                let value = contact.getKeyValues().get(key);
                                if (value instanceof Map)
                                {
                                    console.log("Record KeyName : " + keyName + " - Value : ");
                                    Array.from(value.keys()).forEach(key => {
                                        console.log(key + " : " + value.get(key));
                                    });
                                }
                                else
                                {
                                    console.log("Record KeyName : " + keyName + " : Value : " + value);
                                }
                            });
                        });
                    }
                    let accountsPreferenceField :  ZOHOCRMSDK.Record.Record[] = preferenceFieldMatchedValue.getAccounts();
                    if (accountsPreferenceField != null)
                    {
                        accountsPreferenceField.forEach(account => {
                            console.log("Record ID: " + account.getId());
                            console.log("Record KeyValues: ");
                            Array.from(account.getKeyValues().keys()).forEach(key => {
                                let keyName = key;
                                let value = account.getKeyValues().get(key);
                                if (value instanceof Map)
                                {
                                    console.log("Record KeyName : " + keyName + " - Value : ");
                                    Array.from(value.keys()).forEach(key => {
                                        console.log(key + " : " + value.get(key));
                                    });
                                }
                                else
                                {
                                    console.log("Record KeyName : " + keyName + " : Value : " + value);
                                }
                            });
                        });
                    }
                    let dealsPreferenceField :  ZOHOCRMSDK.Record.Record[] = preferenceFieldMatchedValue.getDeals();
                    if (dealsPreferenceField != null)
                    {
                        dealsPreferenceField.forEach(deal => {
                            console.log("Record ID: " + deal.getId());
                            console.log("Record KeyValues: ");
                            Array.from(deal.getKeyValues().keys()).forEach(key => {
                                let keyName = key;
                                let value = deal.getKeyValues().get(key);
                                if (value instanceof Map)
                                {
                                    console.log("Record KeyName : " + keyName + " - Value : ");
                                    Array.from(value.keys()).forEach(key => {
                                        console.log(key + " : " + value.get(key));
                                    });
                                }
                                else
                                {
                                    console.log("Record KeyName : " + keyName + " : Value : " + value);
                                }
                            });
                        });
                    }
                }
                let accounts :  ZOHOCRMSDK.Record.Record[] = conversionOption.getAccounts();
                if (accounts != null)
                {
                    accounts.forEach(account => {
                        console.log("Record ID : " + account.getId());
                        console.log("Record KeyValues : ");
                        Array.from(account.getKeyValues().keys()).forEach(key => {
                            let keyName = key;
                            let value = (account.getKeyValues()).get(key);
                            if (Array.isArray(value))
                            {
                                console.log("Record KeyName : " + keyName);
                                let dataList = value;
                                dataList.forEach(data => {
                                    if (data instanceof Map)
                                    {
                                        console.log("Record KeyName : " + keyName + " - Value : ");
                                        Array.from(data.keys()).forEach(key => {
                                            console.log(key + " : " + data.get(key));
                                        });
                                    }
                                    else
                                    {
                                        console.log(data);
                                    }
                                });
                            }
                            else if (value instanceof Map)
                            {
                                console.log("Record KeyName : " + keyName + " - value :");
                                Array.from(value.keys()).forEach(key => {
                                    console.log(key + " : "+ value.get(key));
                                });
                            }
                            else
                            {
                                console.log("Record KeyName : " + keyName + " - Value : " + value);
                            }
                        });
                    });
                }
                let deals = conversionOption.getDeals();
                if (deals != null)
                {
                    deals.forEach(deal => {
                        console.log("Record ID : " + deal.getId());
                        console.log("Record KeyValues : ");
                        Array.from(deal.getKeyValues().keys()).forEach(key => {
                            let keyName = key;
                            let value = (deal.getKeyValues()).get(key);
                            if (Array.isArray(value))
                            {
                                console.log("Record KeyName : " + keyName);
                                let dataList = value;
                                dataList.forEach(data => {
                                    if (data instanceof Map)
                                    {
                                        console.log("Record KeyName : " + keyName + " - Value : ");
                                        Array.from(data.keys()).forEach(key => {
                                            console.log(key + " : " + data.get(key));
                                        });
                                    }
                                    else
                                    {
                                        console.log(data);
                                    }
                                });
                            }
                            else if (value instanceof Map)
                            {
                                console.log("Record KeyName : " + keyName + " - value :");
                                Array.from(value.keys()).forEach(key => {
                                    console.log(key + " : "+ value.get(key));
                                });
                            }
                            else
                            {
                                console.log("Record KeyName : " + keyName + " - Value : " + value);
                            }
                        });
                    });
                }
                let modulesWithMultipleLayouts :  ZOHOCRMSDK.Modules.Modules[] = conversionOption.getModulesWithMultipleLayouts();
                if (modulesWithMultipleLayouts != null)
                {
                    modulesWithMultipleLayouts.forEach(module1 => {
                        console.log("ConversionOptions ModulesWithMultipleLayouts API-Name: " + module1.getAPIName());
                        console.log("ConversionOptions ModulesWithMultipleLayouts ID: " + module1.getId());
                    });
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.Record.APIException) {
                console.log("Status: " + responseHandler.getStatus().getValue());
                console.log("Code: " + responseHandler.getCode().getValue());
                console.log("Details");
                let details = responseHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseHandler.getMessage().getValue());
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
        await LeadConversionOptions.leadConversionOptions(BigInt("44028001787377"));
    }
}
LeadConversionOptions.initializeAndCall();
