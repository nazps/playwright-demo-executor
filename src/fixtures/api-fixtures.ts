import { test as base } from '@playwright/test'
import { Connection } from 'jsforce';
import { RecordsManager } from '../api/force_api/RecordsManager';
type Api = {
    sfApi: Connection;
  };

export const test = base.extend<Api>({
  //usage of sfApi deletes apiCreated records after each usage (test, beforeAll, etc.)
  sfApi: async ({}, use) => {
    // Set up the fixture.
    const connection = new Connection({
      loginUrl: 'https://login.salesforce.com',
      version: process.env.API_VERSION || '61.0',
    });
    const password = process.env.PASSWORD? process.env.PASSWORD : '';
    const token = process.env.TOKEN?  process.env.TOKEN : '';
    const username = process.env.USERNAME ? process.env.USERNAME : '';
    await connection.login(username, password + token);
    
    await use(connection);
    // this is the delete part where all the records that were created by api are deleted
    const manager = RecordsManager.getInstance();
    const recordsToDelete = manager.getRecordsToDelete();
    for (const objectType in recordsToDelete) {
      const recordIds = recordsToDelete[objectType];
      await manager.deleteRecords(connection, objectType, recordIds);
    }

  },
});

 
 
  export { expect } from '@playwright/test';