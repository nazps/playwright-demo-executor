import { Connection } from "jsforce";
import { DeleteStrategy } from "../../force_api/DeleteStrategy";

export class AccountDeleteStrategy implements DeleteStrategy {
    async delete(ids: string[], connection:Connection): Promise<void> {
      // Account Records removal
      try {
        const queryResults = await connection.query(`SELECT Id FROM Case WHERE AccountId IN (${ids.map(id => `'${id}'`).join(',')})`);
        const records = queryResults.records.map(record => `${record.Id}`);
        if(records && records.length > 0){
          const res = await connection.sobject('Case').del(records);
        }
        //this deletes Accounts
        const result = await connection.sobject('Account').del(ids);
      } catch (error) {
        console.error(`Error deleting Account batch`, error);
      }
    }
  }