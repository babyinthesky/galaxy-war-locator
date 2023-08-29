'use client'

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { useAppDispatch } from '../redux/hooks';
import { SECRET_URL } from '../config';
import LoadingSpinner from './LoadingSpinner';
import dynamic from 'next/dynamic';
import { getSecret } from '../redux/actions/action';
import { RootState, AppThunkDispatch } from '../redux/store';
import { selectMemberShortInfoList, getMemberShortList } from '../redux/slice';
import { wrapper } from "../redux/store";

// To eliminate the error: 'ReferenceError: window is not defined'
const LocaterMap = dynamic(() => import('./LocatorMap'), { ssr: false })

const MainPage = () => {
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppThunkDispatch>()
  const usersList = useSelector(selectMemberShortInfoList);
  // const {loading, error, member} = usersList

  useEffect(() => {
      setIsLoading(true);
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

  return (
    <div className="flex flex-col flex-1 flex-wrap min-h-[80%] w-full content-center">
        <h1 className="text-center">Star Wars - Rebellion: Locator</h1>
        <p>{errorText}</p>
        <LocaterMap />
        {/* <MemberGridList />*/}
    </div>
  );
};

export default wrapper.withRedux(MainPage);