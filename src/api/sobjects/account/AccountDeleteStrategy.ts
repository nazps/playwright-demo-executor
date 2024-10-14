import { Connection } from "jsforce";
import { DeleteStrategy } from "../../force_api/DeleteStrategy";

export class AccountDeleteStrategy implements DeleteStrategy {
    async delete(ids: string[], connection:Connection): Promise<void> {
      // Account Records removal
      try {
        const isCustomDeleteStrategy = process.env.CUSTOM_ACCOUNT_DELETE_STRATEGY
        if(!isCustomDeleteStrategy){
          //ycv only - need to delete enterprise roles before deleting account
          const queryResults = await connection.query(`SELECT Id FROM Enterprise_Role__c WHERE Account__c IN (${ids.map(id => `'${id}'`).join(',')})`);
          const records = queryResults.records.map(record => `${record.Id}`);
          const res = await connection.sobject('Enterprise_Role__c').del(records);
          console.log(`Deleted Enterprise_Role__c`, JSON.stringify(res));
          //finish ycv only
        }
        //this deletes Accounts
        const result = await connection.sobject('Account').del(ids);
        console.log(`Deleted Account batch`, JSON.stringify(result));
      } catch (error) {
        console.error(`Error deleting Account batch`, error);
      }
    }
  }