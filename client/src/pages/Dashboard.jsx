import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import CreatePost from './CreatePost';
import DashPosts from './DashPosts';

const Dashboard = () => {
  const location   = useLocation()
  const [tab , setTab] = useState('');
   
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl)
      setTab(tabFromUrl);
    // console.log("url prams ", urlParams);
    // console.log("tabfrom url ",tabFromUrl);


  }, [location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
      {/*Sidebar */}
      <DashSidebar/>
      </div>
      {/* PROFILE */}
      {
        tab === 'profile' && <DashProfile/>
      }
      {
        tab==='create-post' && <CreatePost/>
      }
      {
        tab==="posts" && <DashPosts/>
      }

    </div>
  )
}

export default Dashboard