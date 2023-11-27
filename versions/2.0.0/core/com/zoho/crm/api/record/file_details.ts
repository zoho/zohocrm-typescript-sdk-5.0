import {Model} from "../../../../../../utils/util/model";

class FileDetails implements Model{

	private fileNameS: string;
	private sizeS: string;
	private id: bigint;
	private fileIdS: string;
	private delete1: string;
	private keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the fileNameS
	 * @returns A String representing the fileNameS
	 */
	public getFileNameS(): string	{
		return this.fileNameS;

	}

	/**
	 * The method to set the value to fileNameS
	 * @param fileNameS A String representing the fileNameS
	 */
	public setFileNameS(fileNameS: string): void	{
		this.fileNameS = fileNameS;
		this.keyModified.set("File_Name__s", 1);

	}

	/**
	 * The method to get the sizeS
	 * @returns A String representing the sizeS
	 */
	public getSizeS(): string	{
		return this.sizeS;

	}

	/**
	 * The method to set the value to sizeS
	 * @param sizeS A String representing the sizeS
	 */
	public setSizeS(sizeS: string): void	{
		this.sizeS = sizeS;
		this.keyModified.set("Size__s", 1);

	}

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
	 * The method to get the fileIdS
	 * @returns A String representing the fileIdS
	 */
	public getFileIdS(): string	{
		return this.fileIdS;

	}

	/**
	 * The method to set the value to fileIdS
	 * @param fileIdS A String representing the fileIdS
	 */
	public setFileIdS(fileIdS: string): void	{
		this.fileIdS = fileIdS;
		this.keyModified.set("File_Id__s", 1);

	}

	/**
	 * The method to get the delete
	 * @returns A String representing the delete1
	 */
	public getDelete(): string	{
		return this.delete1;

	}

	/**
	 * The method to set the value to delete
	 * @param delete1 A String representing the delete1
	 */
	public setDelete(delete1: string): void	{
		this.delete1 = delete1;
		this.keyModified.set("_delete", 1);

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
	FileDetails as MasterModel,
	FileDetails as FileDetails
}
