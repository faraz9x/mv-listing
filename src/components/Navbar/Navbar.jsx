import React ,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss'

function Navbar() {

    const [show, handleShow] = useState(false)

    const transitionNavbar= () => {
        if (window.scrollY > 100) {
            handleShow(true);
        }
        else{
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavbar);
        
        return () => {
            window.removeEventListener("scroll", transitionNavbar);
        }
    }, [])

    return (
        <div className={`nav_wrapper ${show && "nav_black"}`}>
        <div className="container nav_content">
                <div className="nav_logo">
                    <Link to="/">
                        <img src="https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"/>
                    </Link>
                </div>


                <div className="nav_avatar">
                    <Link to="/stats">
                    <img src="https://cdn-icons-png.flaticon.com/512/893/893220.png"/>
                    </Link>
                </div>
        </div>
            
        </div>
    )
}

export default Navbar
