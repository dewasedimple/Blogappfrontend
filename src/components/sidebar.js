import React from 'react';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
    return (
        <>
            <section>
                <div className='side'>
                    <Link to="/admin">Admin</Link> 
                        <br></br>
                        <br></br>
                        <br></br>
                        
                    <Link to="/blog">Blog</Link>    
                </div>
            </section>
        </>
    );
}

export default Sidebar;
