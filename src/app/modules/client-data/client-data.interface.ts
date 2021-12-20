import { IDocument } from "../document/document.interface";

export interface IClientData {
  id?: string;
  division_code: string;
  division_name: string;
  quantity: number;
  amount: number;
  document_id: string;
  document: IDocument;
}
