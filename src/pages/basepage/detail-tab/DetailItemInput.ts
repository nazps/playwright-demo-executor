import { Locator, Page } from '@playwright/test';
import { DetailItem } from './DetailItemInterface';

export class DetailItemInput implements DetailItem{
  private page: Page;
  private fieldLabel: string;
  private fieldLocator: Locator;
  private valueLocator: Locator;
  private editButtonLocator: Locator;
  private saveButtonLocator: Locator;

  constructor(page: Page, fieldLabel: string) {
    this.page = page;
    this.fieldLabel = fieldLabel;

    // Locate the field item by the field label attribute
    this.fieldLocator = this.page.locator(`records-record-layout-item[field-label="${this.fieldLabel}"]`);

    // Locate the field value inside the fieldLocator
    this.valueLocator = this.fieldLocator.locator('lightning-formatted-text');

    // Locate the edit button inside the fieldLocator
    this.editButtonLocator = this.fieldLocator.locator('button[title^="Edit"]');
    this.saveButtonLocator = this.page.getByText('Save');
  }

  /**
   * Gets the current value of the field.
   * @returns {Promise<string>} The current value of the field.
   */
  async getFieldValue(): Promise<string> {
    // Extract the text from the lightning-formatted-text element
    const value = await this.valueLocator.textContent();
    return value?.trim() || '';
  }

  /**
   * Edits the field with a new value.
   * @param newValue {string} The new value to be entered.
   * @returns {Promise<void>}
   */
  async edit(newValue: string): Promise<void> {
    // Click the edit button to make the field editable
    await this.editButtonLocator.click();
  
    // Wait for the input field to appear and fill it with the new value
    const inputLocator = this.fieldLocator.locator('input');
    await inputLocator.fill(newValue);

    // Simulate pressing Enter or clicking Save to submit the change (this step may vary based on the application)
    await inputLocator.press('Enter'); // or click save button if necessary
    await this.saveButtonLocator.click();
  }
}