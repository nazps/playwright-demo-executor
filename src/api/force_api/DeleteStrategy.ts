import { Connection } from "jsforce";

export interface DeleteStrategy {
    delete(ids: string[], connection:Connection): Promise<void>;
  }