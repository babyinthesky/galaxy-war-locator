'use client'

import React, { useEffect } from 'react';
import { useAppTrunkDispatch, useAppSelector } from '../redux/hooks';
import LoadingSpinner from './LoadingSpinner';
import dynamic from 'next/dynamic';
import { selectMemberShortList, getMemberShortList } from '../redux/slices/memberShortListSlice';
import MemberGridList from './MemberList/MemberGridList';

// To eliminate the error: 'ReferenceError: window is not defined'
const LocaterMap = dynamic(() => import('./Map/LocatorMap'), { ssr: false })

const MainPage = () => {
  const dispatch = useAppTrunkDispatch();
  const { list: memberShortList, isLoading, hasError } = useAppSelector(selectMemberShortList);

  useEffect(() => {
      dispatch(getMemberShortList())
  }, [dispatch]);

  if (isLoading) {
      return (
        <LoadingSpinner />
      );
  }

  return (
    <div className="flex flex-col h-full flex-wrap min-h-[80%] w-full content-center">
      <h1 className="text-center text-2xl mb-2">Star Wars - Rebellion: Locator</h1>
      <p>{hasError && 'Loading Error'}</p>
      <LocaterMap />
      <MemberGridList />
    </div>
  );
};

export default MainPage;
