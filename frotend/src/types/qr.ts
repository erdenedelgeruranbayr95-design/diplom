export type QRStatus = "PENDING" | "CONNECTED" | "EXPIRED";

export interface QrSessionRow {
  id: string;
  token: string;
  userId: string;
  status: QRStatus;
  expiresAt: string;
  createdAt: string;
}
