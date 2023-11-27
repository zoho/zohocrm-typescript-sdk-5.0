import {Param} from "../../../../../../routes/param";
import {ParameterMap} from "../../../../../../routes/parameter_map";
import {ActionHandler} from "./action_handler";
import {BodyWrapper} from "./body_wrapper";
import {ErrorHandler} from "./error_handler";
import {ResponseHandler} from "./response_handler";
import {SDKException} from "../exception/sdk_exception";
import {APIResponse} from "../../../../../../routes/controllers/api_response";
import {CommonAPIHandler} from "../../../../../../routes/middlewares/common_api_handler";
import { Constants } from "../../../../../../utils/util/constants";

class RecordLockingOperations{
	/**
	 * The method to get record lock information
	 * @param recordId A BigInt representing the recordId
	 * @param moduleName A String representing the moduleName
	 * @param paramInstance An instance of ParameterMap
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getRecordLockInformation(recordId: bigint, moduleName: string, paramInstance?: ParameterMap): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/");
		apiPath = apiPath.concat(moduleName.toString());
		apiPath = apiPath.concat("/");
		apiPath = apiPath.concat(recordId.toString());
		apiPath = apiPath.concat("/Locking_Information__s");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		handlerInstance.setParam(paramInstance);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

	/**
	 * The method to lock a record
	 * @param recordId A BigInt representing the recordId
	 * @param moduleName A String representing the moduleName
	 * @param request An instance of BodyWrapper
	 * @returns An instance of APIResponse<ActionHandler>
	 * @throws SDKException
	 */
	public async lockARecord(recordId: bigint, moduleName: string, request: BodyWrapper): Promise<APIResponse<ActionHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/");
		apiPath = apiPath.concat(moduleName.toString());
		apiPath = apiPath.concat("/");
		apiPath = apiPath.concat(recordId.toString());
		apiPath = apiPath.concat("/Locking_Information__s");
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
	 * The method to get record lock information_by_id
	 * @param lockId A BigInt representing the lockId
	 * @param recordId A BigInt representing the recordId
	 * @param moduleName A String representing the moduleName
	 * @param paramInstance An instance of ParameterMap
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getRecordLockInformation_by_id(lockId: bigint, recordId: bigint, moduleName: string, paramInstance?: ParameterMap): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/");
		apiPath = apiPath.concat(moduleName.toString());
		apiPath = apiPath.concat("/");
		apiPath = apiPath.concat(recordId.toString());
		apiPath = apiPath.concat("/Locking_Information__s/");
		apiPath = apiPath.concat(lockId.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		handlerInstance.setParam(paramInstance);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

	/**
	 * The method to update lock reason of a record
	 * @param lockId A BigInt representing the lockId
	 * @param recordId A BigInt representing the recordId
	 * @param moduleName A String representing the moduleName
	 * @param request An instance of BodyWrapper
	 * @returns An instance of APIResponse<ActionHandler>
	 * @throws SDKException
	 */
	public async updateLockReasonOfARecord(lockId: bigint, recordId: bigint, moduleName: string, request: BodyWrapper): Promise<APIResponse<ActionHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/");
		apiPath = apiPath.concat(moduleName.toString());
		apiPath = apiPath.concat("/");
		apiPath = apiPath.concat(recordId.toString());
		apiPath = apiPath.concat("/Locking_Information__s/");
		apiPath = apiPath.concat(lockId.toString());
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
	 * The method to remove lock for a record
	 * @param lockId A BigInt representing the lockId
	 * @param recordId A BigInt representing the recordId
	 * @param moduleName A String representing the moduleName
	 * @returns An instance of APIResponse<ActionHandler>
	 * @throws SDKException
	 */
	public async removeLockForARecord(lockId: bigint, recordId: bigint, moduleName: string): Promise<APIResponse<ActionHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/");
		apiPath = apiPath.concat(moduleName.toString());
		apiPath = apiPath.concat("/");
		apiPath = apiPath.concat(recordId.toString());
		apiPath = apiPath.concat("/Locking_Information__s/");
		apiPath = apiPath.concat(lockId.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_DELETE);
		handlerInstance.setCategoryMethod(Constants.REQUEST_METHOD_DELETE);
		let ActionHandler = require.resolve("./action_handler");
		return handlerInstance.apiCall<ActionHandler>(ActionHandler, "application/json");

	}

}
class getrecordlockinformationParam{

	public static FIELDS: Param<string> = new Param<string>("fields", "com.zoho.crm.api.RecordLocking.getrecordlockinformationParam");
}

class getrecordlockinformation_by_idParam{

	public static FIELDS: Param<string> = new Param<string>("fields", "com.zoho.crm.api.RecordLocking.getrecordlockinformation_by_idParam");
}

export {
	RecordLockingOperations as MasterModel,
	RecordLockingOperations as RecordLockingOperations,
	getrecordlockinformation_by_idParam as getrecordlockinformation_by_idParam,
	getrecordlockinformationParam as getrecordlockinformationParam
}
