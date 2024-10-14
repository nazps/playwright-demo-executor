import { Connection } from "jsforce";
import { RecordsManager } from '../../force_api/RecordsManager';
import { AccountDeleteStrategy } from "./AccountDeleteStrategy";
import { SObjectInterface } from "../SobjectInterface";

export class Account implements SObjectInterface<Account>{
    private name: string;
    id?: string;
    sfApi?: Connection
    readonly deleteStrategy:AccountDeleteStrategy = new AccountDeleteStrategy();
    readonly apiName:string = 'Account'

    constructor(){
        this.name = '';
        this.id = undefined;
    }

    withName(accountName:string):Account{
        this.name = accountName;
        return this;
    }

    withId(accountId:string):Account{
        this.id = accountId;
        return this
    }
    async build(sfApi:Connection):Promise<Account>{
        this.sfApi = sfApi
        const id = (await this.sfApi.sobject(this.apiName).create(
            {Name: this.name}
        )).id
        this.id = id
        const recordsManager:RecordsManager = RecordsManager.getInstance();
        if(this.id){
            recordsManager.addRecordId(this.apiName, this.id);
            recordsManager.setDeleteStrategy(this.apiName, this.deleteStrategy)
        } else {
            null
        };
        return this;
    }
    getId():string|undefined{
        return this.id;
    }
    getName():string{
        return this.name;
    }
}