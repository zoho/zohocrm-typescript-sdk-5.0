import {ResponseHandler} from "./response_handler";
import {Param} from "../../../../../../routes/param";
import {SDKException} from "../exception/sdk_exception";
import {APIResponse} from "../../../../../../routes/controllers/api_response";
import {CommonAPIHandler} from "../../../../../../routes/middlewares/common_api_handler";
import { Constants } from "../../../../../../utils/util/constants";

class EntityScoresOperations{

	private fields?: string;
	/**
	 * Creates an instance of EntityScoresOperations with the given parameters
	 * @param fields A String representing the fields
	 */
	constructor(fields?: string){
		this.fields = fields;

	}

	/**
	 * The method to get module
	 * @param recordId A BigInt representing the recordId
	 * @param module A String representing the module
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getModule(recordId: bigint, module: string): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/");
		apiPath = apiPath.concat(module.toString());
		apiPath = apiPath.concat("/");
		apiPath = apiPath.concat(recordId.toString());
		apiPath = apiPath.concat("/Entity_Scores__s");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addParam(new Param<string>("fields", "com.zoho.crm.api.EntityScores.GetModuleParam"), this.fields);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

	/**
	 * The method to get modules
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getModules(): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/Entity_Scores__s");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addParam(new Param<string>("fields", "com.zoho.crm.api.EntityScores.GetModulesParam"), this.fields);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

}
class GetModuleParam{

}

class GetModulesParam{

}

export {
	GetModuleParam as GetModuleParam,
	GetModulesParam as GetModulesParam,
	EntityScoresOperations as MasterModel,
	EntityScoresOperations as EntityScoresOperations
}
