'use client'
import { useSearchParams } from 'next/navigation';
import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [data, setData] = useState('')
  const [savedconvId, setsavedconvId] = useState(null)
  const [conersationData, setconersationData] = useState(null);



  const value = {
    data, setData, savedconvId, setsavedconvId, conersationData, setconersationData
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );


};


export const useAppContext = () => {
  return useContext(AppContext);
};