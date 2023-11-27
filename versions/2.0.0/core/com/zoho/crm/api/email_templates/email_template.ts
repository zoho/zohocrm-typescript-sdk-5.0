import {Attachment} from "./attachment";
import {LastVersionStatistics} from "./last_version_statistics";
import {Folder} from "../inventory_templates/folder";
import {MinifiedModule} from "../modules/minified_module";
import {Template} from "../send_mail/template";
import {MinifiedUser} from "../users/minified_user";
import {InventoryTemplate} from "../inventory_templates/inventory_template";
import {Model} from "../../../../../../utils/util/model";

class EmailTemplate extends InventoryTemplate implements Model, Template{

	protected attachments: Array<Attachment>;
	protected subject: string;
	protected associated: boolean;
	protected consentLinked: boolean;
	protected description: string;
	protected lastVersionStatistics: LastVersionStatistics;
	protected category: string;
	protected createdTime: Date;
	protected modifiedTime: Date;
	protected lastUsageTime: Date;
	protected folder: Folder;
	protected module: MinifiedModule;
	protected createdBy: MinifiedUser;
	protected modifiedBy: MinifiedUser;
	protected name: string;
	protected id: bigint;
	protected editorMode: string;
	protected type: string;
	protected favorite: boolean;
	protected content: string;
	protected keyModified: Map<string, number> = new Map<string, number>();
	/**
	 * The method to get the attachments
	 * @returns An Array representing the attachments
	 */
	public getAttachments(): Array<Attachment>	{
		return this.attachments;

	}

	/**
	 * The method to set the value to attachments
	 * @param attachments An Array representing the attachments
	 */
	public setAttachments(attachments: Array<Attachment>): void	{
		this.attachments = attachments;
		this.keyModified.set("attachments", 1);

	}

	/**
	 * The method to get the subject
	 * @returns A String representing the subject
	 */
	public getSubject(): string	{
		return this.subject;

	}

	/**
	 * The method to set the value to subject
	 * @param subject A String representing the subject
	 */
	public setSubject(subject: string): void	{
		this.subject = subject;
		this.keyModified.set("subject", 1);

	}

	/**
	 * The method to get the associated
	 * @returns A Boolean representing the associated
	 */
	public getAssociated(): boolean	{
		return this.associated;

	}

	/**
	 * The method to set the value to associated
	 * @param associated A Boolean representing the associated
	 */
	public setAssociated(associated: boolean): void	{
		this.associated = associated;
		this.keyModified.set("associated", 1);

	}

	/**
	 * The method to get the consentLinked
	 * @returns A Boolean representing the consentLinked
	 */
	public getConsentLinked(): boolean	{
		return this.consentLinked;

	}

	/**
	 * The method to set the value to consentLinked
	 * @param consentLinked A Boolean representing the consentLinked
	 */
	public setConsentLinked(consentLinked: boolean): void	{
		this.consentLinked = consentLinked;
		this.keyModified.set("consent_linked", 1);

	}

	/**
	 * The method to get the description
	 * @returns A String representing the description
	 */
	public getDescription(): string	{
		return this.description;

	}

	/**
	 * The method to set the value to description
	 * @param description A String representing the description
	 */
	public setDescription(description: string): void	{
		this.description = description;
		this.keyModified.set("description", 1);

	}

	/**
	 * The method to get the lastVersionStatistics
	 * @returns An instance of LastVersionStatistics
	 */
	public getLastVersionStatistics(): LastVersionStatistics	{
		return this.lastVersionStatistics;

	}

	/**
	 * The method to set the value to lastVersionStatistics
	 * @param lastVersionStatistics An instance of LastVersionStatistics
	 */
	public setLastVersionStatistics(lastVersionStatistics: LastVersionStatistics): void	{
		this.lastVersionStatistics = lastVersionStatistics;
		this.keyModified.set("last_version_statistics", 1);

	}

	/**
	 * The method to get the category
	 * @returns A String representing the category
	 */
	public getCategory(): string	{
		return this.category;

	}

	/**
	 * The method to set the value to category
	 * @param category A String representing the category
	 */
	public setCategory(category: string): void	{
		this.category = category;
		this.keyModified.set("category", 1);

	}

	/**
	 * The method to get the createdTime
	 * @returns An instance of Date
	 */
	public getCreatedTime(): Date	{
		return this.createdTime;

	}

	/**
	 * The method to set the value to createdTime
	 * @param createdTime An instance of Date
	 */
	public setCreatedTime(createdTime: Date): void	{
		this.createdTime = createdTime;
		this.keyModified.set("created_time", 1);

	}

	/**
	 * The method to get the modifiedTime
	 * @returns An instance of Date
	 */
	public getModifiedTime(): Date	{
		return this.modifiedTime;

	}

	/**
	 * The method to set the value to modifiedTime
	 * @param modifiedTime An instance of Date
	 */
	public setModifiedTime(modifiedTime: Date): void	{
		this.modifiedTime = modifiedTime;
		this.keyModified.set("modified_time", 1);

	}

	/**
	 * The method to get the lastUsageTime
	 * @returns An instance of Date
	 */
	public getLastUsageTime(): Date	{
		return this.lastUsageTime;

	}

	/**
	 * The method to set the value to lastUsageTime
	 * @param lastUsageTime An instance of Date
	 */
	public setLastUsageTime(lastUsageTime: Date): void	{
		this.lastUsageTime = lastUsageTime;
		this.keyModified.set("last_usage_time", 1);

	}

	/**
	 * The method to get the folder
	 * @returns An instance of Folder
	 */
	public getFolder(): Folder	{
		return this.folder;

	}

	/**
	 * The method to set the value to folder
	 * @param folder An instance of Folder
	 */
	public setFolder(folder: Folder): void	{
		this.folder = folder;
		this.keyModified.set("folder", 1);

	}

	/**
	 * The method to get the module
	 * @returns An instance of MinifiedModule
	 */
	public getModule(): MinifiedModule	{
		return this.module;

	}

	/**
	 * The method to set the value to module
	 * @param module An instance of MinifiedModule
	 */
	public setModule(module: MinifiedModule): void	{
		this.module = module;
		this.keyModified.set("module", 1);

	}

	/**
	 * The method to get the createdBy
	 * @returns An instance of MinifiedUser
	 */
	public getCreatedBy(): MinifiedUser	{
		return this.createdBy;

	}

	/**
	 * The method to set the value to createdBy
	 * @param createdBy An instance of MinifiedUser
	 */
	public setCreatedBy(createdBy: MinifiedUser): void	{
		this.createdBy = createdBy;
		this.keyModified.set("created_by", 1);

	}

	/**
	 * The method to get the modifiedBy
	 * @returns An instance of MinifiedUser
	 */
	public getModifiedBy(): MinifiedUser	{
		return this.modifiedBy;

	}

	/**
	 * The method to set the value to modifiedBy
	 * @param modifiedBy An instance of MinifiedUser
	 */
	public setModifiedBy(modifiedBy: MinifiedUser): void	{
		this.modifiedBy = modifiedBy;
		this.keyModified.set("modified_by", 1);

	}

	/**
	 * The method to get the name
	 * @returns A String representing the name
	 */
	public getName(): string	{
		return this.name;

	}

	/**
	 * The method to set the value to name
	 * @param name A String representing the name
	 */
	public setName(name: string): void	{
		this.name = name;
		this.keyModified.set("name", 1);

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
	 * The method to get the editorMode
	 * @returns A String representing the editorMode
	 */
	public getEditorMode(): string	{
		return this.editorMode;

	}

	/**
	 * The method to set the value to editorMode
	 * @param editorMode A String representing the editorMode
	 */
	public setEditorMode(editorMode: string): void	{
		this.editorMode = editorMode;
		this.keyModified.set("editor_mode", 1);

	}

	/**
	 * The method to get the type
	 * @returns A String representing the type
	 */
	public getType(): string	{
		return this.type;

	}

	/**
	 * The method to set the value to type
	 * @param type A String representing the type
	 */
	public setType(type: string): void	{
		this.type = type;
		this.keyModified.set("type", 1);

	}

	/**
	 * The method to get the favorite
	 * @returns A Boolean representing the favorite
	 */
	public getFavorite(): boolean	{
		return this.favorite;

	}

	/**
	 * The method to set the value to favorite
	 * @param favorite A Boolean representing the favorite
	 */
	public setFavorite(favorite: boolean): void	{
		this.favorite = favorite;
		this.keyModified.set("favorite", 1);

	}

	/**
	 * The method to get the content
	 * @returns A String representing the content
	 */
	public getContent(): string	{
		return this.content;

	}

	/**
	 * The method to set the value to content
	 * @param content A String representing the content
	 */
	public setContent(content: string): void	{
		this.content = content;
		this.keyModified.set("content", 1);

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
	EmailTemplate as MasterModel,
	EmailTemplate as EmailTemplate
}
