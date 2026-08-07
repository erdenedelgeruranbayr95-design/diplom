export type SessionStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface TherapySession {
  id: string;
  therapistId: string;
  userId: string;
  songId: string | null;
  notes: string | null;
  status: SessionStatus;
  scheduledAt: string | null;
  completedAt: string | null;
  createdAt: string;
}

export interface CreateTherapySessionPayload {
  userId: string;
  songId?: string;
  notes?: string;
  scheduledAt?: string;
}

export interface UpdateTherapySessionPayload {
  notes?: string;
  status?: SessionStatus;
  scheduledAt?: string;
  completedAt?: string;
}

export interface Progress {
  id: string;
  userId: string;
  therapySessionId: string | null;
  completionPct: number | null;
  engagementScore: number | null;
  recordedAt: string;
}

export interface CreateProgressPayload {
  userId: string;
  therapySessionId?: string;
  completionPct?: number;
  engagementScore?: number;
}

export interface AssignedPatient {
  id: string;
  therapistId: string;
  userId: string;
  createdAt: string;
  patient: {
    id: string;
    name: string;
    email: string;
  };
}

export interface LinkedChild {
  id: string;
  parentId: string;
  childUserId: string;
  createdAt: string;
  child: {
    id: string;
    name: string;
    email: string;
  };
}

/* Admin-ий unscoped жагсаалт — therapist ба patient хоёуланг агуулна (AssignedPatient-ээс ялгаатай,
   тэр нь зөвхөн одоогийн therapist-д хамааралтай, patient-г л агуулдаг). */
export interface TherapistAssignmentRow {
  id: string;
  therapistId: string;
  userId: string;
  createdAt: string;
  therapist: {
    id: string;
    name: string;
    email: string;
  };
  patient: {
    id: string;
    name: string;
    email: string;
  };
}

/* Admin-ий unscoped жагсаалт — TherapistAssignmentRow-той ижил зарчим,
   parent/child хоёуланг агуулна (эцэг эх ↔ хvvхэд ParentLink). */
export interface ParentLinkRow {
  id: string;
  parentId: string;
  childUserId: string;
  createdAt: string;
  parent: {
    id: string;
    name: string;
    email: string;
  };
  child: {
    id: string;
    name: string;
    email: string;
  };
}
