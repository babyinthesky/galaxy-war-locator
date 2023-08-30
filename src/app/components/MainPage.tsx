'use client'

import React, { useState, useEffect, FC } from 'react';
import { useAppTrunkDispatch, useAppSelector } from '../redux/hooks';
import { SECRET_URL } from '../config';
import LoadingSpinner from './LoadingSpinner';
import dynamic from 'next/dynamic';
import { selectMemberShortList, getMemberShortList } from '../redux/memberShortListSlice';

// To eliminate the error: 'ReferenceError: window is not defined'
const LocaterMap = dynamic(() => import('./LocatorMap'), { ssr: false })

const MainPage = () => {
  const [errorText, setErrorText] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppTrunkDispatch();
  const { list: memberShortList, isLoading, hasError } = useAppSelector(selectMemberShortList);
  // const {loading, error, member} = usersList

  useEffect(() => {
      // setIsLoading(true);
      dispatch(getMemberShortList())
    //   fetch(SECRET_URL).then((res) => {
    //   setIsLoading(false);
    //   if (res.ok) {
    //     setErrorText('');
    //     return res.json();
    //   }
    //   throw new Error(`HTTP ${res.status}`);
    // }).then((data) => {
    //   const message = atob(data.message);
    //   console.log(message); // TODO: store to redux
    // }).catch((error) => {
    //   setIsLoading(false);
    //   setErrorText(error.message);
    // });
  }, [dispatch]);

  if (isLoading) {
      return (
        <LoadingSpinner />
      );
  }

  console.log({memberShortList})
  return (
          <div className="flex flex-col flex-1 flex-wrap min-h-[80%] w-full content-center">
        <h1 className="text-center">Star Wars - Rebellion: Locator</h1>
        <p>{errorText}</p>
        <LocaterMap />
        {/* <MemberGridList />*/}
    </div>
  );
};

export default MainPage;
// export default wrapper.withRedux(MainPage);