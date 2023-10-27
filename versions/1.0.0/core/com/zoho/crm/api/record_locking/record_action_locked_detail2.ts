import {Model} from "../../../../../../utils/util/model";

class RecordActionLockedDetail2 implements Model{

	private id: bigint;
	private action: string;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the id
	 * @returns A BigInt representing the id
	 */
	public getId(): bigint	{
		return this.id;

	}

	/**
	 * The method to set the value to id
	 * @param id A BigInt representing the id
	 */
	public setId(id: bigint): void	{
		this.id = id;
		this.keyModified.set("id", 1);

	}

	/**
	 * The method to get the action
	 * @returns A String representing the action
	 */
	public getAction(): string	{
		return this.action;

	}

	/**
	 * The method to set the value to action
	 * @param action A String representing the action
	 */
	public setAction(action: string): void	{
		this.action = action;
		this.keyModified.set("action", 1);

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
	RecordActionLockedDetail2 as MasterModel,
	RecordActionLockedDetail2 as RecordActionLockedDetail2
}
