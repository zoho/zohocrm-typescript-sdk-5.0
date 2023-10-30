import {Backup} from "./backup";
import {ResponseHandler} from "./response_handler";
import {Model} from "../../../../../../utils/util/model";

class BodyWrapper implements Model, ResponseHandler{

	private backup: Backup;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the backup
	 * @returns An instance of Backup
	 */
	public getBackup(): Backup	{
		return this.backup;

	}

	/**
	 * The method to set the value to backup
	 * @param backup An instance of Backup
	 */
	public setBackup(backup: Backup): void	{
		this.backup = backup;
		this.keyModified.set("backup", 1);

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
	BodyWrapper as MasterModel,
	BodyWrapper as BodyWrapper
}
