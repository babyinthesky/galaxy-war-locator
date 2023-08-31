'use client'

import React, { useEffect } from 'react';
import { useAppTrunkDispatch, useAppSelector } from '../redux/hooks';
import LoadingSpinner from './LoadingSpinner';
import dynamic from 'next/dynamic';
import { selectMemberShortList, getMemberShortList } from '../redux/slices/memberShortListSlice';
import MemberGridList from './MemberList/MemberGridList';
import CardInfoModal from './MemberList/CardInfoModal';

// To eliminate the error: 'ReferenceError: window is not defined'
const LocaterMap = dynamic(() => import('./Map/LocatorMap'), { ssr: false })

const MainPage = () => {
  const trunkDispatch = useAppTrunkDispatch();
  const { isLoading, hasError } = useAppSelector(selectMemberShortList);

  useEffect(() => {
    trunkDispatch(getMemberShortList());
  }, [trunkDispatch]);

  if (isLoading) {
      return (
        <div className="m-auto">
          <LoadingSpinner />
        </div>
      );
  }

  return (
    <div className="flex flex-col h-full flex-wrap min-h-[80%] w-full content-center">
      <h1 className="font-starwar text-center text-3xl xl:text-4xl mb-2 text-neutral-300">Star Wars - Rebellion: Locator</h1>
      <p>{hasError && 'Loading Error...Please try again later'}</p>
      <LocaterMap />
      <MemberGridList />
      <CardInfoModal />
    </div>
  );
};

export default MainPage;
