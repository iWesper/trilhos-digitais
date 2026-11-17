import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/backend/config/firebase";

// Acesso ao Firestore num só sítio: funções simples e tipadas, sem estado React.
// Os nomes das coleções e dos campos são os mesmos de sempre (os dados existentes continuam a funcionar).

export interface BadgeInfo {
  id: string;
  idManual: number;
  nome: string;
  [field: string]: unknown;
}

export interface BadgeEntry {
  id: string;
  userId: string;
  badgeId: number;
  // 100 nos badges ganhos; progresso parcial nos que estão a ser ganhos
  percentage: number;
  badgeInfo: BadgeInfo;
}

export interface TutorialFlags {
  hasSeenMainTutorial: boolean;
  hasSeenBadgeTutorial: boolean;
}

const byUser = (name: string, uid: string) => query(collection(db, name), where("userId", "==", uid));

export async function getUsername(uid: string): Promise<string | null> {
  const snap = await getDocs(byUser("usernames", uid));
  return snap.empty ? null : (snap.docs[0].data().username as string);
}

// Badges ganhos + em progresso, com a informação de cada badge.
// O catálogo de badges é lido uma vez (antes era uma query por badge, em série).
export async function getBadges(uid: string): Promise<BadgeEntry[]> {
  const [earned, inProgress, catalog] = await Promise.all([
    getDocs(byUser("badgesEarned", uid)),
    getDocs(byUser("isEarningBadges", uid)),
    getDocs(collection(db, "badges")),
  ]);

  const infoById = new Map<number, BadgeInfo[]>();
  for (const d of catalog.docs) {
    const info = { ...d.data(), id: d.id } as BadgeInfo;
    infoById.set(info.idManual, [...(infoById.get(info.idManual) ?? []), info]);
  }

  const entries: BadgeEntry[] = [];
  const add = (docs: typeof earned.docs, percentage: (data: Record<string, unknown>) => number) => {
    for (const d of docs) {
      const data = d.data();
      const badgeId = data.badgeId as number | undefined;
      if (!badgeId) continue;
      for (const badgeInfo of infoById.get(badgeId) ?? []) {
        entries.push({ ...(data as { userId: string }), badgeId, badgeInfo, id: d.id, percentage: percentage(data) });
      }
    }
  };
  add(earned.docs, () => 100);
  add(inProgress.docs, (data) => Number(data.percentage ?? 0));
  return entries;
}

export async function hasEarnedBadge(uid: string, badgeId: number): Promise<boolean> {
  const snap = await getDocs(
    query(collection(db, "badgesEarned"), where("userId", "==", uid), where("badgeId", "==", badgeId))
  );
  return !snap.empty;
}

export async function getTutorialFlags(uid: string): Promise<TutorialFlags | null> {
  const snap = await getDocs(byUser("hasSeenTutorial", uid));
  if (snap.empty) return null;
  const data = snap.docs[0].data();
  return {
    hasSeenMainTutorial: Boolean(data.hasSeenMainTutorial),
    hasSeenBadgeTutorial: Boolean(data.hasSeenBadgeTutorial),
  };
}

export async function markTutorialSeen(uid: string, which: keyof TutorialFlags): Promise<void> {
  const snap = await getDocs(byUser("hasSeenTutorial", uid));
  // Antes: forEach(async ...) sem await, os erros perdiam-se
  await Promise.all(snap.docs.map((d) => updateDoc(doc(db, "hasSeenTutorial", d.id), { [which]: true })));
}

// Primeiro login com Google: cria o username e as flags de tutorial, se ainda não existirem
export async function ensureUserDocs(user: User): Promise<void> {
  const [usernames, tutorials] = await Promise.all([
    getDocs(byUser("usernames", user.uid)),
    getDocs(byUser("hasSeenTutorial", user.uid)),
  ]);
  await Promise.all([
    usernames.empty
      ? addDoc(collection(db, "usernames"), { userId: user.uid, username: user.displayName })
      : null,
    tutorials.empty
      ? addDoc(collection(db, "hasSeenTutorial"), {
          hasSeenMainTutorial: false,
          hasSeenBadgeTutorial: false,
          userId: user.uid,
        })
      : null,
  ]);
}
