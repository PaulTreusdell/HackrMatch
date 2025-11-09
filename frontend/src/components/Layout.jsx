import React from "react";
import "./Header.css";
export default Header;

function Header(){
  return (
        <header className="header">
         
            <nav>
                <ul>
                    <li><a href="/">Match</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Sign Up</a></li>
                </ul>
            </nav>
        </header>
  ); 
};