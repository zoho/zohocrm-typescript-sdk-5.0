import {Param} from "../../../../../../routes/param";
import {ParameterMap} from "../../../../../../routes/parameter_map";
import {ResponseHandler} from "./response_handler";
import {SDKException} from "../exception/sdk_exception";
import {APIResponse} from "../../../../../../routes/controllers/api_response";
import {CommonAPIHandler} from "../../../../../../routes/middlewares/common_api_handler";
import { Constants } from "../../../../../../utils/util/constants";

class UserTypeUsersOperations{
	/**
	 * The method to get users of user type
	 * @param userTypeId A BigInt representing the userTypeId
	 * @param portalName A String representing the portalName
	 * @param paramInstance An instance of ParameterMap
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getUsersOfUserType(userTypeId: bigint, portalName: string, paramInstance?: ParameterMap): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/settings/portals/");
		apiPath = apiPath.concat(portalName.toString());
		apiPath = apiPath.concat("/user_type/");
		apiPath = apiPath.concat(userTypeId.toString());
		apiPath = apiPath.concat("/users");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		handlerInstance.setParam(paramInstance);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

}
class GetUsersofUserTypeParam{

	public static FILTERS: Param<string> = new Param<string>("filters", "com.zoho.crm.api.UserTypeUsers.GetUsersofUserTypeParam");
	public static TYPE: Param<string> = new Param<string>("type", "com.zoho.crm.api.UserTypeUsers.GetUsersofUserTypeParam");
}

export {
	GetUsersofUserTypeParam as GetUsersofUserTypeParam,
	UserTypeUsersOperations as MasterModel,
	UserTypeUsersOperations as UserTypeUsersOperations
}
