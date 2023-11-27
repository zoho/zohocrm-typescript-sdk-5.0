import {Model} from "../../../../../../utils/util/model";

class RegexDetails implements Model{

	private apiName: string;
	private jsonPath: string;
	private regex: string;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the apiName
	 * @returns A String representing the apiName
	 */
	public getAPIName(): string	{
		return this.apiName;

	}

	/**
	 * The method to set the value to apiName
	 * @param apiName A String representing the apiName
	 */
	public setAPIName(apiName: string): void	{
		this.apiName = apiName;
		this.keyModified.set("api_name", 1);

	}

	/**
	 * The method to get the jsonPath
	 * @returns A String representing the jsonPath
	 */
	public getJsonPath(): string	{
		return this.jsonPath;

	}

	/**
	 * The method to set the value to jsonPath
	 * @param jsonPath A String representing the jsonPath
	 */
	public setJsonPath(jsonPath: string): void	{
		this.jsonPath = jsonPath;
		this.keyModified.set("json_path", 1);

	}

	/**
	 * The method to get the regex
	 * @returns A String representing the regex
	 */
	public getRegex(): string	{
		return this.regex;

	}

	/**
	 * The method to set the value to regex
	 * @param regex A String representing the regex
	 */
	public setRegex(regex: string): void	{
		this.regex = regex;
		this.keyModified.set("regex", 1);

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
	RegexDetails as MasterModel,
	RegexDetails as RegexDetails
}
