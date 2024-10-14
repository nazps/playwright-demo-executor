import { expect, type Locator, type Page } from '@playwright/test';
import { SObjectInterface } from '../../../api/sobjects/SobjectInterface';
import { TabsSwitcher } from './TabsSwitcher';
import { PlatformActionsComponent } from '../global/PlatformActionsComponent';
import { log } from 'console';

export class RecordPage<T extends SObjectInterface<T>>{
    readonly url: string = process.env.ORG_URL ? process.env.ORG_URL : '';
    readonly page: Page;
    sobject:T;
    tabsSwitcher: TabsSwitcher<T>;
    platformActionsComponent: PlatformActionsComponent

    constructor (page: Page, sobject:T){
        this.sobject = sobject;
        this.page = page;
        this.tabsSwitcher = new TabsSwitcher(page)
        this.platformActionsComponent = new PlatformActionsComponent(page);
    }

    async goto() : Promise<RecordPage<T>> {
        if(this.sobject.id){
        await this.page.goto(`${this.url}/${this.sobject.id}`);
        await this.page.waitForURL(`**/${this.sobject.id}/view`)
        } else {
            throw new Error(`'Missing Id for ${this.sobject.constructor.name}'`)
        }
        return this
      }
    tabsStwitcher():TabsSwitcher<T> {
        log
        return this.tabsSwitcher;
    }
    platformActions():PlatformActionsComponent{
        return this.platformActionsComponent;
    }

}