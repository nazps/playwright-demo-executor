import { Locator, Page } from '@playwright/test';

export class PlatformActionsComponent {
  private page: Page;

  // Locators for visible actions
  private newContactButton: Locator;
  private newCaseButton: Locator;
  private newNoteButton: Locator;

  // Locator for the additional actions dropdown
  private moreActionsButton: Locator;
  private moreActionsDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locating the action buttons using their `name` or `title` attribute
    this.newContactButton = this.page.locator('button[name="Global.NewContact"]');
    this.newCaseButton = this.page.locator('button[name="Global.NewCase"]');
    this.newNoteButton = this.page.locator('button[name="Global.NewNote"]');

    // Locating the "more actions" dropdown button and the menu
    this.moreActionsButton = this.page.locator('button.slds-button_icon-border-filled');
    this.moreActionsDropdown = this.page.locator('lightning-button-menu[aria-expanded="true"]'); // Menu visible when expanded
  }

  /**
   * Clicks on the "New Contact" button.
   */
  async clickNewContact(): Promise<void> {
    await this.newContactButton.click();
  }

  /**
   * Clicks on the "New Case" button.
   */
  async clickNewCase(): Promise<void> {
    await this.newCaseButton.click();
  }

  /**
   * Clicks on the "New Note" button.
   */
  async clickNewNote(): Promise<void> {
    await this.newNoteButton.click();
  }

  /**
   * Clicks on the "Show more actions" dropdown button.
   */
  async openMoreActions(): Promise<void> {
    await this.moreActionsButton.click();
  }

  /**
   * Selects an action from the "Show more actions" dropdown by visible text.
   * @param actionName The name of the action (e.g., "New Opportunity").
   */
  async selectMoreAction(actionName: string): Promise<void> {
    await this.openMoreActions();

    // Wait for the dropdown to be visible
    await this.moreActionsDropdown.waitFor();

    // Select the option based on its text content
    const actionLocator = this.page.locator(`button:has-text("${actionName}")`);
    await actionLocator.click();
  }

  /**
   * Get all visible action names.
   * @returns A list of all the visible action button names.
   */
  async getVisibleActions(): Promise<string[]> {
    const visibleActions: Locator = this.page.locator('ul.slds-button-group-list li.visible button');
    const actionTexts = await visibleActions.allTextContents();
    return actionTexts;
  }
}