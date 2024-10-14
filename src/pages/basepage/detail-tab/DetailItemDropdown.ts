import { Locator, Page } from '@playwright/test';
import { DetailItem } from './DetailItemInterface';
import { sleep } from '../../../helpers/waitHelpers';

export class DetailItemDropdown implements DetailItem {
  private page: Page;
  private fieldLabel: string;
  private dropdownButton: Locator;
  private dropdownList: Locator;
  private saveButtonLocator: Locator;
  private editButtonLocator: Locator;

  constructor(page: Page, fieldLabel: string) {
    this.page = page;
    this.fieldLabel = fieldLabel;

    // Locate the records-record-layout-item by field-label attribute
    const fieldContainer = this.page.locator(`records-record-layout-item[field-label="${this.fieldLabel}"]`);

    // Locate the dropdown button within the field container
    this.dropdownButton = fieldContainer.locator('button.slds-combobox__input');

    // Locate the dropdown list within the field container
    this.dropdownList = fieldContainer.locator('div[role="listbox"]');
    this.saveButtonLocator = this.page.getByText('Save');
    this.editButtonLocator = fieldContainer.locator('button[title^="Edit"]');
  }

  /**
   * Expands the dropdown by clicking the button.
   * @returns {Promise<void>}
   */
  async expandDropdown(): Promise<void> {
    await this.saveButtonLocator.isHidden()
    await this.editButtonLocator.click();
    await this.dropdownButton.click();
  }

  /**
   * Selects an option from the dropdown list based on visible text.
   * @param optionText {string} The text of the option to select.
   * @returns {Promise<void>}
   */
  async edit(optionText: string): Promise<void> {
    // Ensure the dropdown is expanded
    await this.expandDropdown();

    // Wait for the dropdown list to be visible
    await this.dropdownList.waitFor();

    // Select the option by its visible text
    const optionLocator = this.page.locator(`span.slds-truncate:has-text("${optionText}")`);
    await optionLocator.click();
    await this.saveButtonLocator.click();
  }

  /**
   * Gets the currently selected value in the dropdown.
   * @returns {Promise<string>} The currently selected option value.
   */
  async getFieldValue(): Promise<string> {
    await this.saveButtonLocator.isHidden();
    return (await this.dropdownButton.textContent())?.trim() || '';
  }
}