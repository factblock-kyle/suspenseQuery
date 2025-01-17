'use client';

import { useGetCommunitiesForHome } from '@query/useGetCommunitiesForHome';
import React from 'react';

export default function Community() {
  const { data } = useGetCommunitiesForHome();

  return <div>All</div>;
}
