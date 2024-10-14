import { Page } from "@playwright/test";
import { Tab } from "../basepage/record-page/Tab";
import { DetailItemInput } from "../basepage/detail-tab/DetailItemInput";
import { DetailItem } from "../basepage/detail-tab/DetailItemInterface";
import { DetailItemDropdown } from "../basepage/detail-tab/DetailItemDropdown";
import { sleep } from "../../helpers/waitHelpers";

export class AccountDetailsTab implements Tab {
    private fields: Map<string, DetailItem>;
    private page:Page
    
    constructor(page:Page){
        this.page = page;
        this.fields = new Map<string, DetailItem>([
            ['Account Name', new DetailItemInput(this.page, 'Account Name')],
            ['Account Site', new DetailItemInput(this.page, 'Account Site')],
            ['Type', new DetailItemDropdown(this.page, 'Type')],
            ['Industry', new DetailItemDropdown(this.page, 'Industry')],
          ]);
        
        
    }

    /**
     * Gets the value of a field by its label.
     * @param fieldLabel {string} The label of the field to get the value for.
     * @returns {Promise<string>} The current value of the field.
     */
    async getFieldValue(fieldLabel: string): Promise<string> {
        const field = this.fields.get(fieldLabel);
        if (!field) throw new Error(`Field with label "${fieldLabel}" not found.`);
        return field.getFieldValue();
    }

    /**
     * Edits a field by its label.
     * @param fieldLabel {string} The label of the field to edit.
     * @param newValue {string} The new value to set.
     * @returns {Promise<void>}
     */
    async editFieldValue(fieldLabel: string, newValue: string): Promise<string> {
        const field = this.fields.get(fieldLabel);
        if (!field) throw new Error(`Field with label "${fieldLabel}" not found.`);
        await field.edit(newValue);
        return await this.getFieldValue(fieldLabel)
    }
}