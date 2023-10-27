import {ConversionOption} from "./conversion_option";
import {ResponseHandler} from "./response_handler";
import {Model} from "../../../../../../utils/util/model";

class ConversionOptionsResponseWrapper implements Model, ResponseHandler{

	private conversionoptions: ConversionOption;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the conversionoptions
	 * @returns An instance of ConversionOption
	 */
	public getConversionoptions(): ConversionOption	{
		return this.conversionoptions;

	}

	/**
	 * The method to set the value to conversionoptions
	 * @param conversionoptions An instance of ConversionOption
	 */
	public setConversionoptions(conversionoptions: ConversionOption): void	{
		this.conversionoptions = conversionoptions;
		this.keyModified.set("__conversion_options", 1);

	}

	/**
	 * The method to check if the user has modified the given key
	 * @param key A String representing the key
	 * @returns A number representing the modification
	 */
	public isKeyModified(key: string): number | null | undefined	{
		if(this.keyModified.has(key))	{
			return this.keyModified.get(key);
		}
		return null;

	}

	/**
	 * The method to mark the given key as modified
	 * @param key A String representing the key
	 * @param modification A number representing the modification
	 */
	public setKeyModified(key: string, modification: number): void	{
		this.keyModified.set(key, modification);

	}

}
export {
	ConversionOptionsResponseWrapper as MasterModel,
	ConversionOptionsResponseWrapper as ConversionOptionsResponseWrapper
}
