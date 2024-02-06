import React from 'react'
import '../nav.css'

function NavBar() {
  return (
    <div className='navbar'>
        <nav class="navbar navbar-light bg-body-tertiary">
            <div>
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img
                        className='logo'
                        src="./images/to-do-list.png"
                        height="20"
                        alt="TODO Logo"
                        loading="lazy"
                    />
                </a>
            </div>
            </div>
            <div className='list'>
                <ul className='navbar-list'>
                    <li><a href='/'>Home</a></li>
                    <li><a href=''>About us</a></li>
                    <li><a href=''>What a Todo</a></li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default NavBar