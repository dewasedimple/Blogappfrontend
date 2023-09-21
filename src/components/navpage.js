import React from "react";
import {Routes,Route} from "react-router-dom";
import Admin from "../pages/admin";
import Blog from "../pages/blog";
const Navpage=()=>{
    return(
        <>
        <section>
          <Routes>
          
          <Route path="/" element={<Blog/>}/>  
          <Route path="/admin" element={<Admin/>}/>  
          <Route path="/blog" element={<Blog/>}/>  
          </Routes> 
        </section>
        </>
    )
}
export default Navpage;