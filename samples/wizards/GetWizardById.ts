import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetWizardById
{
    public static async getWizardById(wizardId: bigint, layoutId: string) {
        let wizardsOperations = new ZOHOCRMSDK.Wizards.WizardsOperations();
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.Wizards.GetWizardbyIDParam.LAYOUT_ID, layoutId);
        //Call getWizardById method that takes wizardId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Wizards.ResponseHandler.MasterModel> = await wizardsOperations.getWizardById(wizardId, paramInstance);
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
                            let chartData: ZOHOCRMSDK.Wizards.ChartData = container.getChartData();
                            if (chartData != null) {
                                let nodes: ZOHOCRMSDK.Wizards.Node[] = chartData.getNodes();
                                if (nodes != null) {
                                    nodes.forEach(async node => {
                                        console.log("Wizard Container ChartData Node PosY: " + node.getPosY());
                                        console.log("Wizard Container ChartData Node PosX: " + node.getPosX());
                                        console.log("Wizard Container ChartData Node StartNode: " + node.getStartNode());
                                        let screen: ZOHOCRMSDK.Wizards.Screen = await node.getScreen();
                                        if (screen != null) {
                                            console.log("Wizard Container ChartData Node Screen DisplayLabel: " + screen.getDisplayLabel());
                                            console.log("Wizard Container ChartData Node Screen ID: " + screen.getId());
                                        }
                                    });
                                }
                                let connections: ZOHOCRMSDK.Wizards.Connection[] = chartData.getConnections();
                                if (connections != null) {
                                    connections.forEach(async connection => {
                                        let sourceButton: ZOHOCRMSDK.Wizards.Button = connection.getSourceButton();
                                        if (sourceButton != null) {
                                            await this.printButton(sourceButton);
                                        }
                                        let targetScreen: ZOHOCRMSDK.Wizards.Screen = connection.getTargetScreen();
                                        if (targetScreen != null) {
                                            await this.printScreen(targetScreen);
                                        }
                                    });
                                }
                                console.log("Wizard Container ChartData CanvasWidth: " + chartData.getCanvasWidth());
                                console.log("Wizard Container ChartData CanvasHeight: " + chartData.getCanvasHeight());
                            }
                            let screens: ZOHOCRMSDK.Wizards.Screen[] = container.getScreens();
                            if (screens != null) {
                                screens.forEach(async screen => {
                                    await this.printScreen(screen);
                                });
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
                console.log("Status: " + responseObject.getStatus().getValue());
                console.log("Code: " + responseObject.getCode().getValue());
                console.log("Details");
                let details = responseObject.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseObject.getMessage().getValue());
            }
        }
    }
    static async printScreen(screen: ZOHOCRMSDK.Wizards.Screen) {
        console.log("Screen Id: " + screen.getId());
        console.log("Screen DisplayLabel: " + screen.getDisplayLabel());
        let segments: ZOHOCRMSDK.Wizards.Segment[] = screen.getSegments();
        if (segments != null) {
            segments.forEach(async segment => {
                await this.printSegment(segment);
            });
        }
    }
    static async printSegment(segment: ZOHOCRMSDK.Wizards.Segment) {
        console.log("Segment Id: " + segment.getId());
        console.log("Segment SequenceNumber: " + segment.getSequenceNumber());
        console.log("Segment DisplayLabel: " + segment.getDisplayLabel());
        console.log("Segment Type: " + segment.getType());
        console.log("Segment ColumnCount: " + segment.getColumnCount());
        let fields: ZOHOCRMSDK.Fields.Fields[] = segment.getFields();
        if (fields != null) {
            fields.forEach(field => {
                console.log("Segment Field SequenceNumber: " + field.getSequenceNumber());
                console.log("Segment Field APIName: " + field.getAPIName());
                console.log("Segment Field Id: " + field.getId());
            });
        }
        let buttons: ZOHOCRMSDK.Wizards.Button[] = segment.getButtons();
        if (buttons != null) {
            buttons.forEach(async button => {
                if (button != null) {
                    await this.printButton(button);
                }
            });
        }
    }
    static async printButton(button: ZOHOCRMSDK.Wizards.Button) {
        console.log("Button Id: " + button.getId());
        console.log("Button SequenceNumber: " + button.getSequenceNumber());
        console.log("Button DisplayLabel: " + button.getDisplayLabel());
        let criteria: ZOHOCRMSDK.Wizards.Criteria = button.getCriteria();
        if (criteria != null) {
            await this.printCriteria(criteria);
        }
        let targetScreen: ZOHOCRMSDK.Wizards.Screen = button.getTargetScreen();
        if (targetScreen != null) {
            console.log("Button TargetScreen DisplayLabel: " + targetScreen.getDisplayLabel());
            console.log("Button TargetScreen Id: " + targetScreen.getId());
        }
        console.log("Button Type: " + button.getType());
        console.log("Button Color: " + button.getColor());
        console.log("Button Shape: " + button.getShape());
        console.log("Button BackgroundColor: " + button.getBackgroundColor());
        console.log("Button Visibility: " + button.getVisibility());
        let transition: ZOHOCRMSDK.Wizards.Transition = button.getTransition();
        if (transition != null) {
            console.log("Button Transition Name: " + transition.getName());
            console.log("Button Transition Id: " + transition.getId());
        }
    }
    static async printCriteria(criteria: ZOHOCRMSDK.Wizards.Criteria) {
        if (criteria.getComparator() != null) {
            console.log("Criteria Comparator: " + criteria.getComparator());
        }
        let field1: ZOHOCRMSDK.Wizards.Field = criteria.getField();
        if (field1 != null) {
            console.log("Criteria Field: " + field1.getAPIName());
            console.log("Criteria Field: " + field1.getId());
        }
        console.log("Criteria Value: " + criteria.getValue());
        let criteriaGroup: ZOHOCRMSDK.Wizards.Criteria[] = criteria.getGroup();
        if (criteriaGroup != null) {
            criteriaGroup.forEach(async criteria1 => {
                this.printCriteria(criteria1);
            });
        }
        if (criteria.getGroupOperator() != null) {
            console.log("Criteria Group Operator: " + criteria.getGroupOperator());
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
        await GetWizardById.getWizardById(BigInt("3232434"), "3243234");
    }
}
GetWizardById.initializeAndCall();
