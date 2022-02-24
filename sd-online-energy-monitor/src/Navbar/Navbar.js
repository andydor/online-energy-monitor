import React, { useState } from 'react';
import { MenuItems, MenuItemsLoggedInUser, MenuItemsLoggedInAdmin } from "./MenuItems";
import './Navbar.css';
import { Suspense } from 'react';

export default function NavBar(props) {
    const [clicked, setClicked] = useState(0);

    function handleClick() {
        setClicked(!clicked);
    }

    let buttons;
    if (props.user) {
        if (props.user.roles.includes("ROLE_ADMIN")) {
            buttons = (
                <Suspense fallback={null}>
                    <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                        {MenuItemsLoggedInAdmin.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a className={item.cName} href={item.url} >
                                        {item.title}
                                    </a>
                                </li>

                            )
                        })}
                    </ul>

                </Suspense>
            )
        }
        else {
            buttons = (
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItemsLoggedInUser.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url} >
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }
    else {
        buttons = (
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url} >
                                {item.title}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )

    }
    return (
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Online Energy Monitor<i className="fab fa-react"></i></h1>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            {buttons}
            {/* <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                    
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}

               </ul> */}

        </nav>
    )

}