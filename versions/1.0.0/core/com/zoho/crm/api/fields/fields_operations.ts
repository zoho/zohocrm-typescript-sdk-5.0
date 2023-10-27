import {ResponseHandler} from "./response_handler";
import {Param} from "../../../../../../routes/param";
import {ParameterMap} from "../../../../../../routes/parameter_map";
import {SDKException} from "../exception/sdk_exception";
import {APIResponse} from "../../../../../../routes/controllers/api_response";
import {CommonAPIHandler} from "../../../../../../routes/middlewares/common_api_handler";
import { Constants } from "../../../../../../utils/util/constants";

class FieldsOperations{
	/**
	 * The method to get fields
	 * @param paramInstance An instance of ParameterMap
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getFields(paramInstance?: ParameterMap): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/settings/fields");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		handlerInstance.setParam(paramInstance);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

	/**
	 * The method to get field
	 * @param field A BigInt representing the field
	 * @param paramInstance An instance of ParameterMap
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getField(field: bigint, paramInstance?: ParameterMap): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/settings/fields/");
		apiPath = apiPath.concat(field.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		handlerInstance.setParam(paramInstance);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

}
class GetFieldsParam{

	public static MODULE: Param<string> = new Param<string>("module", "com.zoho.crm.api.Fields.GetFieldsParam");
	public static DATA_TYPE: Param<string> = new Param<string>("data_type", "com.zoho.crm.api.Fields.GetFieldsParam");
	public static TYPE: Param<string> = new Param<string>("type", "com.zoho.crm.api.Fields.GetFieldsParam");
	public static INCLUDE: Param<string> = new Param<string>("include", "com.zoho.crm.api.Fields.GetFieldsParam");
	public static FEATURE_NAME: Param<string> = new Param<string>("feature_name", "com.zoho.crm.api.Fields.GetFieldsParam");
	public static COMPONENT: Param<string> = new Param<string>("component", "com.zoho.crm.api.Fields.GetFieldsParam");
	public static LAYOUT_ID: Param<bigint> = new Param<bigint>("layout_id", "com.zoho.crm.api.Fields.GetFieldsParam");
}

class GetFieldParam{

	public static MODULE: Param<string> = new Param<string>("module", "com.zoho.crm.api.Fields.GetFieldParam");
	public static INCLUDE: Param<string> = new Param<string>("include", "com.zoho.crm.api.Fields.GetFieldParam");
}

export {
	GetFieldsParam as GetFieldsParam,
	GetFieldParam as GetFieldParam,
	FieldsOperations as MasterModel,
	FieldsOperations as FieldsOperations
}
