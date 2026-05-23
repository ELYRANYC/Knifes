import type { ProfileConfig } from '@/lib/types';
import { alex } from './alex';
import { luna } from './luna';
import { voidProfile } from './void';
import { jordan } from './jordan';

export const profiles: Record<string, ProfileConfig> = {
  alex,
  luna,
  void: voidProfile,
  jordan,
};

export function getProfile(username: string): ProfileConfig | null {
  return profiles[username.toLowerCase()] ?? null;
}

export function listProfiles(): ProfileConfig[] {
  return Object.values(profiles);
}
