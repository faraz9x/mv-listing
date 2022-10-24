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
                    <img src="https://pbs.twimg.com/media/E4a2Tc1XMAAEcF2?format=png&name=4096x4096"/>
                </div>


                <div className="nav_avatar">
                    <img src="https://cdn-icons-png.flaticon.com/512/168/168882.png"/>
                </div>
        </div>
            
        </div>
    )
}

export default Navbar
