import {ComposeSettings} from "./compose_settings";
import {Model} from "../../../../../../utils/util/model";

class User implements Model{

	private fullName: string;
	private email: string;
	private zuid: string;
	private zgid: string;
	private composeSettings: ComposeSettings;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the fullName
	 * @returns A String representing the fullName
	 */
	public getFullName(): string	{
		return this.fullName;

	}

	/**
	 * The method to set the value to fullName
	 * @param fullName A String representing the fullName
	 */
	public setFullName(fullName: string): void	{
		this.fullName = fullName;
		this.keyModified.set("full_name", 1);

	}

	/**
	 * The method to get the email
	 * @returns A String representing the email
	 */
	public getEmail(): string	{
		return this.email;

	}

	/**
	 * The method to set the value to email
	 * @param email A String representing the email
	 */
	public setEmail(email: string): void	{
		this.email = email;
		this.keyModified.set("email", 1);

	}

	/**
	 * The method to get the zuid
	 * @returns A String representing the zuid
	 */
	public getZuid(): string	{
		return this.zuid;

	}

	/**
	 * The method to set the value to zuid
	 * @param zuid A String representing the zuid
	 */
	public setZuid(zuid: string): void	{
		this.zuid = zuid;
		this.keyModified.set("zuid", 1);

	}

	/**
	 * The method to get the zgid
	 * @returns A String representing the zgid
	 */
	public getZgid(): string	{
		return this.zgid;

	}

	/**
	 * The method to set the value to zgid
	 * @param zgid A String representing the zgid
	 */
	public setZgid(zgid: string): void	{
		this.zgid = zgid;
		this.keyModified.set("zgid", 1);

	}

	/**
	 * The method to get the composeSettings
	 * @returns An instance of ComposeSettings
	 */
	public getComposeSettings(): ComposeSettings	{
		return this.composeSettings;

	}

	/**
	 * The method to set the value to composeSettings
	 * @param composeSettings An instance of ComposeSettings
	 */
	public setComposeSettings(composeSettings: ComposeSettings): void	{
		this.composeSettings = composeSettings;
		this.keyModified.set("compose_settings", 1);

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
	User as MasterModel,
	User as User
}
