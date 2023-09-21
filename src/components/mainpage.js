import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Navpage from  './navpage';
// import './App.css';
const Mainpage=({onLogout})=>{
    return(
        <>
        <section>
            <div>
                <Navbar onLogout={onLogout}/>
            </div>
        </section>
        <section>
            <div className='sidemainclass'>
                <div className='side2'>
                    <Sidebar/>
                </div>
                <div className='side3'>
                    <Navpage/>
                </div>
            </div>
        </section>
        </>
       
    )
}
export default Mainpage