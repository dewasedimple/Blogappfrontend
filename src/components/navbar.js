import React from 'react'
import { useNavigate } from 'react-router-dom';
const Navbar=({onLogout})=>{
   const navigate=useNavigate();
   const handleLogout=()=>{
      onLogout();
      navigate("/")
   }
     return(
        <>
        <section>
        <div className='stylenav'>
         Welcome username
         <button className='button-logout' onClick={handleLogout}>Logout</button>
         </div>   
        </section>
        
        </>
       
     )
}
export default Navbar