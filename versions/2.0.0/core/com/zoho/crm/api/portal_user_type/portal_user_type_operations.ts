import {Param} from "../../../../../../routes/param";
import {ParameterMap} from "../../../../../../routes/parameter_map";
import {ResponseHandler} from "./response_handler";
import {SDKException} from "../exception/sdk_exception";
import {APIResponse} from "../../../../../../routes/controllers/api_response";
import {CommonAPIHandler} from "../../../../../../routes/middlewares/common_api_handler";
import { Constants } from "../../../../../../utils/util/constants";

class PortalUserTypeOperations{

	private portal: string;
	/**
	 * Creates an instance of PortalUserTypeOperations with the given parameters
	 * @param portal A String representing the portal
	 */
	constructor(portal: string){
		this.portal = portal;

	}

	/**
	 * The method to get user types
	 * @param paramInstance An instance of ParameterMap
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getUserTypes(paramInstance?: ParameterMap): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/settings/portals/");
		apiPath = apiPath.concat(this.portal.toString());
		apiPath = apiPath.concat("/user_type");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		handlerInstance.setParam(paramInstance);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

	/**
	 * The method to get user type
	 * @param userTypeId A String representing the userTypeId
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getUserType(userTypeId: string): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/settings/portals/");
		apiPath = apiPath.concat(this.portal.toString());
		apiPath = apiPath.concat("/user_type/");
		apiPath = apiPath.concat(userTypeId.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

}
class GetUserTypesParam{

	public static INCLUDE: Param<string> = new Param<string>("include", "com.zoho.crm.api.PortalUserType.GetUserTypesParam");
}

export {
	GetUserTypesParam as GetUserTypesParam,
	PortalUserTypeOperations as MasterModel,
	PortalUserTypeOperations as PortalUserTypeOperations
}
