import React from 'react';
import classes from './Home.module.css';
import {NavLink} from "react-router-dom";

function Home() {
    return (
        <div className={classes.container}>
            <h3>WELCOME TO THE GAME</h3>
            <NavLink to="/game" className={classes.link}>Start Game</NavLink>
        </div>
    );
}

export default Home;
