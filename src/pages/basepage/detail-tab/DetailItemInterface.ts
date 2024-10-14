export interface DetailItem {
    getFieldValue(): Promise<string>;
    edit(newValue: string): Promise<void>;   
}