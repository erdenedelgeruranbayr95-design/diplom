/* ROOT нь ADMIN-аас ДЭЭР зэрэглэлтэй (систем эзэмшигч) — зөвхөн Root Panel-д нэвтэрнэ.
   Үе шат 2: CURATOR/MODERATOR нэмэгдэв (backend/prisma/schema.prisma: enum Role). */
export type UserRole = "ROOT" | "ADMIN" | "CURATOR" | "MODERATOR" | "ARTIST" | "USER";
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
  lastLoginAt: string | null;
  subActive: boolean;
  subPlan: string | null;
}

/* POST /users (admin staff-бүртгэл) — зөвхөн ADMIN|ARTIST эрх, sub талбаргүй буцаана. */
export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "ARTIST";
}

export interface CreatedUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "ARTIST";
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

/** GET /audit — ROOT-only мөрдөгдөх бүртгэл (mutating route бүрийг interceptor автоматаар бичдэг). */
export interface AuditLogRow {
  id: string;
  actorId: string;
  action: string;
  target: string | null;
  meta: Record<string, unknown> | null;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
  actor: { id: string; name: string; email: string };
}

/** GET/POST /moderation/reports */
export interface ReportRow {
  id: string;
  reporterId: string;
  targetType: "song" | "user";
  targetId: string;
  reason: string;
  status: "OPEN" | "RESOLVED" | "DISMISSED";
  resolvedById: string | null;
  resolvedAt: string | null;
  createdAt: string;
  reporter?: { id: string; name: string; email: string };
  resolvedBy?: { id: string; name: string; email: string } | null;
}
