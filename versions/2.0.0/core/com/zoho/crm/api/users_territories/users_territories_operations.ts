import {ActionHandler} from "./action_handler";
import {BodyWrapper} from "./body_wrapper";
import {ResponseHandler} from "./response_handler";
import {TransferActionHandler} from "./transfer_action_handler";
import {TransferWrapper} from "./transfer_wrapper";
import {ValidationHandler} from "./validation_handler";
import {SDKException} from "../exception/sdk_exception";
import {APIResponse} from "../../../../../../routes/controllers/api_response";
import {CommonAPIHandler} from "../../../../../../routes/middlewares/common_api_handler";
import { Constants } from "../../../../../../utils/util/constants";

class UsersTerritoriesOperations{
	/**
	 * The method to get territories of user
	 * @param user A BigInt representing the user
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getTerritoriesOfUser(user: bigint): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users/");
		apiPath = apiPath.concat(user.toString());
		apiPath = apiPath.concat("/territories");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

	/**
	 * The method to associate territories to user
	 * @param user A BigInt representing the user
	 * @param request An instance of BodyWrapper
	 * @returns An instance of APIResponse<ActionHandler>
	 * @throws SDKException
	 */
	public async associateTerritoriesToUser(user: bigint, request: BodyWrapper): Promise<APIResponse<ActionHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users/");
		apiPath = apiPath.concat(user.toString());
		apiPath = apiPath.concat("/territories");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_PUT);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_CREATE);
		handlerInstance.setContentType("application/json");
		handlerInstance.setRequest(request);
		handlerInstance.setMandatoryChecker(true);
		let ActionHandler = require.resolve("./action_handler");
		return handlerInstance.apiCall<ActionHandler>(ActionHandler, "application/json");

	}

	/**
	 * The method to get territory of user
	 * @param territory A BigInt representing the territory
	 * @param user A BigInt representing the user
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getTerritoryOfUser(territory: bigint, user: bigint): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users/");
		apiPath = apiPath.concat(user.toString());
		apiPath = apiPath.concat("/territories/");
		apiPath = apiPath.concat(territory.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

	/**
	 * The method to validate before transfer for all territories
	 * @param user A BigInt representing the user
	 * @returns An instance of APIResponse<ValidationHandler>
	 * @throws SDKException
	 */
	public async validateBeforeTransferForAllTerritories(user: bigint): Promise<APIResponse<ValidationHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users/");
		apiPath = apiPath.concat(user.toString());
		apiPath = apiPath.concat("/territories/actions/validate_before_transfer");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_ACTION);
		let ValidationHandler = require.resolve("./validation_handler");
		return handlerInstance.apiCall<ValidationHandler>(ValidationHandler, "application/json");

	}

	/**
	 * The method to validate before transfer
	 * @param territory A BigInt representing the territory
	 * @param user A BigInt representing the user
	 * @returns An instance of APIResponse<ValidationHandler>
	 * @throws SDKException
	 */
	public async validateBeforeTransfer(territory: bigint, user: bigint): Promise<APIResponse<ValidationHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users/");
		apiPath = apiPath.concat(user.toString());
		apiPath = apiPath.concat("/territories/");
		apiPath = apiPath.concat(territory.toString());
		apiPath = apiPath.concat("/actions/validate_before_transfer");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_ACTION);
		let ValidationHandler = require.resolve("./validation_handler");
		return handlerInstance.apiCall<ValidationHandler>(ValidationHandler, "application/json");

	}

	/**
	 * The method to delink and transfer from all territories
	 * @param user A BigInt representing the user
	 * @param request An instance of TransferWrapper
	 * @returns An instance of APIResponse<TransferActionHandler>
	 * @throws SDKException
	 */
	public async delinkAndTransferFromAllTerritories(user: bigint, request: TransferWrapper): Promise<APIResponse<TransferActionHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users/");
		apiPath = apiPath.concat(user.toString());
		apiPath = apiPath.concat("/territories/actions/transfer_and_delink");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_PUT);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_ACTION);
		handlerInstance.setContentType("application/json");
		handlerInstance.setRequest(request);
		let TransferActionHandler = require.resolve("./transfer_action_handler");
		return handlerInstance.apiCall<TransferActionHandler>(TransferActionHandler, "application/json");

	}

	/**
	 * The method to delink and transfer from specific territory
	 * @param territory A BigInt representing the territory
	 * @param user A BigInt representing the user
	 * @param request An instance of TransferWrapper
	 * @returns An instance of APIResponse<TransferActionHandler>
	 * @throws SDKException
	 */
	public async delinkAndTransferFromSpecificTerritory(territory: bigint, user: bigint, request: TransferWrapper): Promise<APIResponse<TransferActionHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/users/");
		apiPath = apiPath.concat(user.toString());
		apiPath = apiPath.concat("/territories/");
		apiPath = apiPath.concat(territory.toString());
		apiPath = apiPath.concat("/actions/transfer_and_delink");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_PUT);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_ACTION);
		handlerInstance.setContentType("application/json");
		handlerInstance.setRequest(request);
		let TransferActionHandler = require.resolve("./transfer_action_handler");
		return handlerInstance.apiCall<TransferActionHandler>(TransferActionHandler, "application/json");

	}

}
export {
	UsersTerritoriesOperations as MasterModel,
	UsersTerritoriesOperations as UsersTerritoriesOperations
}
