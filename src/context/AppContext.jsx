import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import testData from '../data/test_data.json';
import { useLocalStorage } from '../hooks/useLocalStorage.js'


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
  const [graphData, setGraphData] = useState();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [fiscalData, setFiscalData] = useState([])
  const [citizenData, setCitizenData] = useState([])

  useLocalStorage({ graphData, setGraphData });

  const getFiscalData = () => {
    // TODO: Replace this with functionality to retrieve the data from the fiscalSummary endpoint
    axios({
      method: 'GET',
      url: 'asylum-be.onrender.com/fiscalSummary'
    })
    .then(res => console.log(res)
    )
    .catch(err => console.error(err))
    
  }


  const getCitizenshipResults = async () => {
    // TODO: Replace this with functionality to retrieve the data from the citizenshipSummary endpoint
    const res = await axios.get(citizenURL)
    return res
  }

  const fetchData = async () => {
    // TODO: fetch all the required data and set it to the graphData state
    try {
      setIsDataLoading(true)
      const [fiscal, citizen] = await Promise.all([
        getFiscalData(),
        getCitizenshipResults()
      ])

      setFiscalData(fiscal)
      setCitizenData(citizen)

      setGraphData({ fiscal, citizen })

    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsDataLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updateQuery = async () => {
    fetchData();
    console.log(graphData)
  };
  const clearQuery = () => {
    setGraphData({});
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];


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
