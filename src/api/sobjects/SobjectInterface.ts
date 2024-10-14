import { Connection } from "jsforce";

export interface SObjectInterface<T> {
    id?: string;
    getId(): string|undefined;
    withName(name:string):T;
    withId(id:string):T;
    /**
     * Thjis creates object on the SF org
     */
    build(sfApi: Connection):Promise<T>;
  }