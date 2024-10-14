import { Locator, Page, expect } from "@playwright/test";
import { SObjectInterface } from "../../../api/sobjects/SobjectInterface";
import { Account } from "../../../api/sobjects/account/Account";
import { AccountDetailsTab } from "../../account/AccountDetailsTab";
import { Tab } from "./Tab";



export enum Tabs {
    Related = 'Related',
    Details = 'Details',
  }

export class TabsSwitcher<T extends SObjectInterface<T>> {
    tablist:Locator;

    constructor(page:Page){
        this.tablist = page.getByRole('tablist');
    }

    async switchToTab(tab: Tabs) {
        // Select the tab based on the enum value
        const tabToSelect: Locator = this.tablist.getByRole('tab', { name: tab });
        
        // Check if the tab is already selected via aria-selected
        const isSelected = await tabToSelect.getAttribute('aria-selected');
        
        if (isSelected === 'true') {
          console.log(`${tab} tab is already selected.`);
        } else {
          console.log(`Switching to ${tab} tab.`);
          await tabToSelect.click();
          await expect(tabToSelect).toHaveAttribute('aria-selected', 'true');
        }

    }
}