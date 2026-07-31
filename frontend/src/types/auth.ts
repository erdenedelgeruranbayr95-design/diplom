/* ROOT нь ADMIN-аас ДЭЭР зэрэглэлтэй (систем эзэмшигч) — зөвхөн Root Panel-д нэвтэрнэ.
   Бусад дүр (USER · PARENT · THERAPIST · ADMIN) огт өөрчлөгдөөгүй. */
export type UserRole = "ROOT" | "ADMIN" | "THERAPIST" | "USER" | "PARENT";
export type UserStatus = "ACTIVE" | "BANNED";

/** Сонсголын байдал — ЭМЗЭГ мэдээлэл, заавал биш (§14). */
export type HearingProfile = "deaf" | "hoh" | "hearing";

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
  role: UserRole;
  avatarColor: string | null;
  hearingProfile: string | null;
  sub: UserSub | null;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
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

/** PATCH /users/me */
export interface UpdateProfilePayload {
  name?: string;
  avatarColor?: string;
  hearingProfile?: string;
}

/** PATCH /users/me/password */
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

/** GET /notifications */
export interface NotificationRow {
  id: string;
  userId: string | null;
  text: string;
  icon: string;
  createdAt: string;
}

export interface NotificationFeed {
  items: NotificationRow[];
  readAt: string | null;
}
