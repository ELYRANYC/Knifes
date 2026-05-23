'use client';

import { createContext, useContext } from 'react';

type ProfileRuntime = {
  // DB-backed view count for the public page; null in the dashboard preview.
  viewCount: number | null;
  // Present on the live public page so links can be click-tracked.
  profileId: string | null;
};

const ProfileRuntimeContext = createContext<ProfileRuntime>({ viewCount: null, profileId: null });

export function ViewCountProvider({
  value,
  profileId = null,
  children,
}: {
  value: number | null;
  profileId?: string | null;
  children: React.ReactNode;
}) {
  return (
    <ProfileRuntimeContext.Provider value={{ viewCount: value, profileId }}>
      {children}
    </ProfileRuntimeContext.Provider>
  );
}

export function useViewCount() {
  return useContext(ProfileRuntimeContext).viewCount;
}

export function useProfileId() {
  return useContext(ProfileRuntimeContext).profileId;
}
