import React from "react";
import "../App.css";
export default Header;

function Header(){
  return (
        <header className="header">
            
            <nav>
                <ul>
                    <li><a href="/">Match</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/">Sign Up</a></li>
                </ul>
            </nav>

        </header>
  ); 
};