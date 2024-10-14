import { Locator, Page } from "@playwright/test";

const { expect } = require('@playwright/test');

export class CreateCaseModal {
  page: Page;
  modalTitle: Locator;
  contactInput: Locator;
  contactOption: (contactName: string) => Locator;
  statusDropdown: Locator;
  statusOption: (status: string) => Locator;
  subjectInput: Locator;
  descriptionInput: Locator;
  saveButton: Locator;
  cancelButton: Locator;
  modal: Locator;
    
  constructor(page:Page) {
    this.page = page;

    this.modal = this.page.locator('div.windowViewMode-normal.isModal.active.lafPageHost');

    // Selectors within the active modal using getByRole
    this.modalTitle = this.modal.getByRole('heading', { name: 'New Case' });
    this.contactInput = this.modal.locator('input[placeholder="Search Contacts..."]');
    this.contactOption = (contactName) => this.modal.locator(`li >> text=${contactName}`);
    this.statusDropdown = this.modal.getByRole('combobox', { name: 'Status' });
    this.statusOption = (status) => this.modal.getByRole('option', { name: status });
    this.subjectInput = this.modal.getByRole('textbox', { name: 'Subject' });
    this.descriptionInput = this.modal.getByRole('textbox', { name: 'Description' });
    this.saveButton = this.modal.getByRole('button', { name: 'Save' });
    this.cancelButton = this.modal.getByRole('button', { name: 'Cancel' });

  }

  // Check that the modal is open
  async isModalOpen() {
    await expect(this.modalTitle).toHaveText('New Case');
  }

  // Select a contact
  async selectContact(contactName:string) {
    await this.contactInput.fill(contactName);
    await this.page.waitForTimeout(1000); // Wait for suggestions to appear
    await this.contactOption(contactName).click();
    await this.page.waitForTimeout(1000); //wait for selecting contact
  }

  // Select a status
  async selectStatus(statu:string) {
    await this.statusDropdown.first().click();
    await this.statusOption(statu).first().click();
  }

  // Fill the case details (Subject and Description)
  async fillCaseDetails(subject:string, description:string) {
    await this.subjectInput.click();
    await this.subjectInput.fill(subject);
    await this.descriptionInput.click();
    await this.descriptionInput.fill(description);
  }

  // Save the case
  async saveCase() {
    await this.saveButton.click();
  }

  // Cancel the case creation
  async cancelCaseCreation() {
    await this.cancelButton.click();
  }
}