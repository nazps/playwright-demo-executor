import { Connection } from "jsforce";
import { DeleteStrategy } from "./DeleteStrategy";


export class RecordsManager {
  private static instance: RecordsManager;
  private recordsToDelete: RecordsToDelete;
  private strategies:{[key: string]: DeleteStrategy} = {}

  private constructor() {
    // Initialize the recordsToDelete object
    this.recordsToDelete = {};
  }

  // Get the singleton instance of the RecordsManager
  public static getInstance(): RecordsManager {
    if (!RecordsManager.instance) {
      RecordsManager.instance = new RecordsManager();
    }
    return RecordsManager.instance;
  }

  public setDeleteStrategy(sObject:string, strategy:DeleteStrategy){
    this.strategies[sObject] ? console.log(`DeleteStrategy for ${sObject} already defined`) : this.strategies[sObject] = strategy;
  }

  // Function to add a record ID to the recordsToDelete object
  public addRecordId(objectType: string, recordId: string): void {
    // Initialize the array for the objectType if it doesn't exist
    this.recordsToDelete[objectType] = this.recordsToDelete[objectType] || [];

    // Add the record ID to the array
    this.recordsToDelete[objectType].push(recordId);
  }

  // Function to get the current state of the recordsToDelete object
  public getRecordsToDelete(): RecordsToDelete {
    return this.recordsToDelete;
  }


  // Function to chunk an array into smaller batches
  public chunkArray<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  // Function to delete records in batches
  public async deleteRecords(conn: Connection, objectType: string, recordIds: string[]): Promise<void> {
    const batches = this.chunkArray(recordIds, BATCH_SIZE);
    for (const batch of batches) {
      await this.strategies[objectType].delete(batch, conn)
    }
  }

}
// Define the structure of the object containing records to delete

export interface RecordsToDelete {
  [objectType: string]: string[]; // key is the object type (e.g., "Account", "Object2"), value is an array of IDs
}
export const BATCH_SIZE = 200; // Salesforce API limit for batch operations

