'use client'

import React, { useState, useEffect } from 'react';
import { SECRET_URL } from '../config';
import LocaterMap from './LocatorMap';
import LoadingSpinner from './LoadingSpinner';

const MainPage = () => {
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      setIsLoading(true);
      fetch(SECRET_URL).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        setErrorText('');
        return res.json();
      }
      throw new Error(`HTTP ${res.status}`);
    }).then((data) => {
      const message = atob(data.message);
      console.log(message); // TODO: store to redux
    }).catch((error) => {
      setIsLoading(false);
      setErrorText(error.message);
    });
  }, []);

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

export default MainPage;