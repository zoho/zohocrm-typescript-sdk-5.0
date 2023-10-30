import {Header} from "../../../../../../routes/header";
import {HeaderMap} from "../../../../../../routes/header_map";
import {Param} from "../../../../../../routes/param";
import {ParameterMap} from "../../../../../../routes/parameter_map";
import {ActionHandler} from "./action_handler";
import {BodyWrapper} from "./body_wrapper";
import {ResponseHandler} from "./response_handler";
import {SDKException} from "../exception/sdk_exception";
import {APIResponse} from "../../../../../../routes/controllers/api_response";
import {CommonAPIHandler} from "../../../../../../routes/middlewares/common_api_handler";
import { Constants } from "../../../../../../utils/util/constants";

class UsersOperations{
	/**
	 * The method to get users
	 * @param paramInstance An instance of ParameterMap
	 * @param headerInstance An instance of HeaderMap
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getUsers(paramInstance?: ParameterMap, headerInstance?: HeaderMap): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		handlerInstance.setParam(paramInstance);
		handlerInstance.setHeader(headerInstance);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

	/**
	 * The method to create users
	 * @param request An instance of BodyWrapper
	 * @returns An instance of APIResponse<ActionHandler>
	 * @throws SDKException
	 */
	public async createUsers(request: BodyWrapper): Promise<APIResponse<ActionHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_POST);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_CREATE);
		handlerInstance.setContentType("application/json");
		handlerInstance.setRequest(request);
		handlerInstance.setMandatoryChecker(true);
		let ActionHandler = require.resolve("./action_handler");
		return handlerInstance.apiCall<ActionHandler>(ActionHandler, "application/json");

	}

	/**
	 * The method to update users
	 * @param request An instance of BodyWrapper
	 * @returns An instance of APIResponse<ActionHandler>
	 * @throws SDKException
	 */
	public async updateUsers(request: BodyWrapper): Promise<APIResponse<ActionHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_PUT);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_UPDATE);
		handlerInstance.setContentType("application/json");
		handlerInstance.setRequest(request);
		handlerInstance.setMandatoryChecker(true);
		let ActionHandler = require.resolve("./action_handler");
		return handlerInstance.apiCall<ActionHandler>(ActionHandler, "application/json");

	}

	/**
	 * The method to get user
	 * @param user A BigInt representing the user
	 * @param headerInstance An instance of HeaderMap
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getUser(user: bigint, headerInstance?: HeaderMap): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users/");
		apiPath = apiPath.concat(user.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		handlerInstance.setHeader(headerInstance);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

	/**
	 * The method to update user
	 * @param user A BigInt representing the user
	 * @param request An instance of BodyWrapper
	 * @returns An instance of APIResponse<ActionHandler>
	 * @throws SDKException
	 */
	public async updateUser(user: bigint, request: BodyWrapper): Promise<APIResponse<ActionHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users/");
		apiPath = apiPath.concat(user.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_PUT);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_UPDATE);
		handlerInstance.setContentType("application/json");
		handlerInstance.setRequest(request);
		handlerInstance.setMandatoryChecker(true);
		let ActionHandler = require.resolve("./action_handler");
		return handlerInstance.apiCall<ActionHandler>(ActionHandler, "application/json");

	}

	/**
	 * The method to delete user
	 * @param user A BigInt representing the user
	 * @returns An instance of APIResponse<ActionHandler>
	 * @throws SDKException
	 */
	public async deleteUser(user: bigint): Promise<APIResponse<ActionHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users/");
		apiPath = apiPath.concat(user.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_DELETE);
		handlerInstance.setCategoryMethod(Constants.REQUEST_METHOD_DELETE);
		let ActionHandler = require.resolve("./action_handler");
		return handlerInstance.apiCall<ActionHandler>(ActionHandler, "application/json");

	}

	/**
	 * The method to get associated groups
	 * @param user A BigInt representing the user
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getAssociatedGroups(user: bigint): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users/");
		apiPath = apiPath.concat(user.toString());
		apiPath = apiPath.concat("/actions/associated_groups");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

}
class GetUsersParam{

	public static TYPE: Param<string> = new Param<string>("type", "com.zoho.crm.api.Users.GetUsersParam");
	public static PAGE: Param<number> = new Param<number>("page", "com.zoho.crm.api.Users.GetUsersParam");
	public static PER_PAGE: Param<number> = new Param<number>("per_page", "com.zoho.crm.api.Users.GetUsersParam");
	public static IDS: Param<string> = new Param<string>("ids", "com.zoho.crm.api.Users.GetUsersParam");
}

class GetUsersHeader{

	public static IF_MODIFIED_SINCE: Header<Date> = new Header<Date>("If-Modified-Since", "com.zoho.crm.api.Users.GetUsersHeader");
}

class GetUserHeader{

	public static IF_MODIFIED_SINCE: Header<Date> = new Header<Date>("If-Modified-Since", "com.zoho.crm.api.Users.GetUserHeader");
}

export {
	UsersOperations as MasterModel,
	UsersOperations as UsersOperations,
	GetUsersHeader as GetUsersHeader,
	GetUsersParam as GetUsersParam,
	GetUserHeader as GetUserHeader
}
