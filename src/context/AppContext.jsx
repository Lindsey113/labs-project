import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import testData from '../data/test_data.json';
import { useLocalStorage } from '../hooks/useLocalStorage.js';


const fiscalURL = 'asylum-be.onrender.com/fiscalSummary'
const citizenURL = 'asylum-be.onrender.com/citizenshipSummary'
const AppContext = createContext({});

/**
 * TODO: Ticket 2:
 * - Use axios to fetch the data
 * - Store the data
 * - Populate the graphs with the stored data
 */
const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState(testData);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [fiscalData, setFiscalData] = useState([])
  const [citizenData, setCitizenData] = useState([])

  useLocalStorage({ graphData, setGraphData });

  const getFiscalData = async () => {
    // TODO: Replace this with functionality to retrieve the data from the fiscalSummary endpoint
    const [resFiscal] = await Promise.all([axios.get(fiscalURL)])
    return resFiscal
  };
  getFiscalData()

  const getCitizenshipResults = async () => {
    // TODO: Replace this with functionality to retrieve the data from the citizenshipSummary endpoint
    const resCitizen = await Promise.all([axios.get(citizenURL)])
    return resCitizen
  };
  getCitizenshipResults()


  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const fetchData = async () => {
    // TODO: fetch all the required data and set it to the graphData state
  };

  const clearQuery = () => {
    setGraphData({});
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
