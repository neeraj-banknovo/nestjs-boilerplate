export interface IDocument {
  id?: string;
  file_name: string;
  file_type: string;
  key: string;
  pre_signed_get_url: string;
  pre_signed_put_url: string;
  upload_status: string;
  is_deleted: boolean;
  is_parsed: boolean;
}


export interface PreSignedUrls {
  readUrl?: string;
  writeUrl: string;
  key: string;
  validityInSeconds: number;
  id?: string;
}
