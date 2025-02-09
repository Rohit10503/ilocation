import React from "react";
import "./navbar.css"
const Navbar=()=>{
    function myfunction(){
        var x= document.getElementById("links");
        
        if(x.style.display === "block"){
            x.style.display="none"
            
            document.getElementById("sidebar").src="https://static-00.iconduck.com/assets.00/sidebar-left-icon-256x255-buemsywp.png"
        }
        else{
            x.style.display="block"
            document.getElementById("sidebar").src="https://icon-library.com/images/close-window-icon/close-window-icon-11.jpg"
            
        }
    }
    
    return<>
    <section>
        <div class="head">
            <div class="navbar">
                <div class="logo"><img
                        src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716508800&semt=sph"
                        alt=""/></div>
                <div class="textbar"><input type="text" class="text" placeholder="Try something new..." /></div>
                <div class="head-right">
                    <div class="bar"><img onClick={myfunction} id="sidebar" class="sidebar"
                            src="https://static-00.iconduck.com/assets.00/sidebar-left-icon-256x255-buemsywp.png"
                            alt=""/></div>
                    <div class="links" id="links">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Cart</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Login</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </section>
    </>
}
export default Navbar;