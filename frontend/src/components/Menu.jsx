import React from 'react'
import {Link} from 'react-router-dom'

const Menu = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/realizar_compra">Realizar compra</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/total_compra">Total compras</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu
