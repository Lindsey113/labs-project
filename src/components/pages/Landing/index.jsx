import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
// import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
import {decodeBase64} from '../../../utils/decodeBase64.js';
import { headerSentence } from '../../layout/text.js';
import Header from '../../layout/Header.jsx';

/**
 * TODO: Ticket 1:
 * Implement structure and styles of the Landing page using Tailwind
 * Implement any button functionality implied by the landing page screenshot example (tickets/examples)
 */


export const LandingPage = () => {
  const navigate = useNavigate();
  const { downloadCSV } = useDownloadData();

  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 20; // Adjust the divisor for speed
    let scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 10); // Adjust the interval time for smoothness
  };

  const handleReadMore = () => {
    // TODO: navigate to the humanrightsfirst.org homepage
  };

  return (
    <div className='flex-c secondary-c w-[100vw] mb-auto'>
            <section className='flex primary-c pt-4 pb-8'>
              <div className="flex-c mx-auto">
              <h1 className='text-6xl text-white mb-8'>Asylum Office Grant Rate Tracker</h1>
              <h3 className='text-white'>{headerSentence}</h3>
              </div>
            </section>
            <section className='graphs-section flex-c pt-10'>
              <div className='flex-c'>
                <div className='flex justify-center m-14 gap-20 text-2x1'>
                  <div className='flex-c gap-3'>
                    <img src={barGraph} className='h-[300px] w-[500px]'></img>
                    <h3>Search Grant Rates by Office</h3>
                  </div>
                  <div className='flex-c gap-3'>
                    <img src={pieChart} className='h-[300px] contain-content'></img>
                    <h3>Search Grant Rates by Nationality</h3>
                  </div>
                  <div className='flex-c gap-3'>
                    <img src={lineGraph} className='h-[300px] w-[500px]'></img>
                    <h3>Search Grant Rates Over Time</h3>
                  </div>
                </div>
                <div className='flex align-center mx-auto gap-8'>
                  <button className='bg-[#aaa] px-[10px] py-[5px] text-white text-md font-semibold'>View Data</button>
                  <button className='bg-[#aaa] px-[10px] py-[5px] text-white text-md font-semibold'>Download Data</button>
                </div>
              </div>
            </section>
    </div>
  );
};
