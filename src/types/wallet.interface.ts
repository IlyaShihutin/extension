export enum WalletStatusType {
  CREATE,
  RESTORE,
  ACTIVE
}

export interface WalletItem {
  status: WalletStatusType;
  balance?: number;
  privateKey?: string;
  publicKey?: string;
  phrase?:string;
}
