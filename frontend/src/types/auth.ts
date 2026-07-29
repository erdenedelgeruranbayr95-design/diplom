export interface UserSub {
  active: boolean;
  plan: string | null;
  since: string | null;
  renews: string | null;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "THERAPIST" | "PARENT";
  sub: UserSub | null;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "THERAPIST" | "PARENT";
  createdAt: string;
  subActive: boolean;
  subPlan: string | null;
}

/* POST /users (admin staff-бүртгэл) — зөвхөн ADMIN|THERAPIST эрх, sub талбаргүй буцаана. */
export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "THERAPIST";
}

export interface CreatedUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "THERAPIST";
  createdAt: string;
}
