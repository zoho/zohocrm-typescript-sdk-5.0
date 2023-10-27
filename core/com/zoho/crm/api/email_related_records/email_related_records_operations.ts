import {ResponseHandler} from "./response_handler";
import {Param} from "../../../../../../routes/param";
import {ParameterMap} from "../../../../../../routes/parameter_map";
import {SDKException} from "../exception/sdk_exception";
import {APIResponse} from "../../../../../../routes/controllers/api_response";
import {CommonAPIHandler} from "../../../../../../routes/middlewares/common_api_handler";
import { Constants } from "../../../../../../utils/util/constants";

class EmailRelatedRecordsOperations{

	private moduleName: string;
	private recordId: bigint;
	/**
	 * Creates an instance of EmailRelatedRecordsOperations with the given parameters
	 * @param recordId A BigInt representing the recordId
	 * @param moduleName A String representing the moduleName
	 */
	constructor(recordId: bigint, moduleName: string){
		this.recordId = recordId;
		this.moduleName = moduleName;

	}

	/**
	 * The method to get emails related records
	 * @param paramInstance An instance of ParameterMap
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getEmailsRelatedRecords(paramInstance?: ParameterMap): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/");
		apiPath = apiPath.concat(this.moduleName.toString());
		apiPath = apiPath.concat("/");
		apiPath = apiPath.concat(this.recordId.toString());
		apiPath = apiPath.concat("/Emails");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		handlerInstance.setParam(paramInstance);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

	/**
	 * The method to get emails related record
	 * @param messageId A String representing the messageId
	 * @returns An instance of APIResponse<ResponseHandler>
	 * @throws SDKException
	 */
	public async getEmailsRelatedRecord(messageId: string): Promise<APIResponse<ResponseHandler>>	{
		let handlerInstance: CommonAPIHandler = new CommonAPIHandler();
		let apiPath: string = '';
		apiPath = apiPath.concat("/crm/v5/");
		apiPath = apiPath.concat(this.moduleName.toString());
		apiPath = apiPath.concat("/");
		apiPath = apiPath.concat(this.recordId.toString());
		apiPath = apiPath.concat("/Emails/");
		apiPath = apiPath.concat(messageId.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall<ResponseHandler>(ResponseHandler, "application/json");

	}

}
class GetEmailsRelatedRecordsParam{

	public static TYPE: Param<string> = new Param<string>("type", "com.zoho.crm.api.EmailRelatedRecords.GetEmailsRelatedRecordsParam");
	public static INDEX: Param<string> = new Param<string>("index", "com.zoho.crm.api.EmailRelatedRecords.GetEmailsRelatedRecordsParam");
	public static OWNER_ID: Param<bigint> = new Param<bigint>("owner_id", "com.zoho.crm.api.EmailRelatedRecords.GetEmailsRelatedRecordsParam");
}

export {
	GetEmailsRelatedRecordsParam as GetEmailsRelatedRecordsParam,
	EmailRelatedRecordsOperations as MasterModel,
	EmailRelatedRecordsOperations as EmailRelatedRecordsOperations
}
