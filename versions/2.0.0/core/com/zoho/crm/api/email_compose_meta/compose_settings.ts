import {DefaultForm} from "./default_form";
import {Model} from "../../../../../../utils/util/model";

class ComposeSettings implements Model{

	private defaultFromAddress: DefaultForm;
	private fontSize: number;
	private fontFamily: string;
	private emailSignatures: Array<any>;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the defaultFromAddress
	 * @returns An instance of DefaultForm
	 */
	public getDefaultFromAddress(): DefaultForm	{
		return this.defaultFromAddress;

	}

	/**
	 * The method to set the value to defaultFromAddress
	 * @param defaultFromAddress An instance of DefaultForm
	 */
	public setDefaultFromAddress(defaultFromAddress: DefaultForm): void	{
		this.defaultFromAddress = defaultFromAddress;
		this.keyModified.set("default_from_address", 1);

	}

	/**
	 * The method to get the fontSize
	 * @returns A number representing the fontSize
	 */
	public getFontSize(): number	{
		return this.fontSize;

	}

	/**
	 * The method to set the value to fontSize
	 * @param fontSize A number representing the fontSize
	 */
	public setFontSize(fontSize: number): void	{
		this.fontSize = fontSize;
		this.keyModified.set("font_size", 1);

	}

	/**
	 * The method to get the fontFamily
	 * @returns A String representing the fontFamily
	 */
	public getFontFamily(): string	{
		return this.fontFamily;

	}

	/**
	 * The method to set the value to fontFamily
	 * @param fontFamily A String representing the fontFamily
	 */
	public setFontFamily(fontFamily: string): void	{
		this.fontFamily = fontFamily;
		this.keyModified.set("font_family", 1);

	}

	/**
	 * The method to get the emailSignatures
	 * @returns An Array representing the emailSignatures
	 */
	public getEmailSignatures(): Array<any>	{
		return this.emailSignatures;

	}

	/**
	 * The method to set the value to emailSignatures
	 * @param emailSignatures An Array representing the emailSignatures
	 */
	public setEmailSignatures(emailSignatures: Array<any>): void	{
		this.emailSignatures = emailSignatures;
		this.keyModified.set("email_signatures", 1);

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
	ComposeSettings as MasterModel,
	ComposeSettings as ComposeSettings
}
