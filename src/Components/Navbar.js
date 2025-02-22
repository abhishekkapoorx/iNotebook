import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let location = useLocation();
    let navigation = useNavigate()
    const handleLogout = (event) => {
        event.preventDefault()
        localStorage.removeItem("token")
        navigation("/login")

    }

    // useEffect(() => {
    //     console.log(location)
    // }, [location]);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <div className="d-flex">
                        { !localStorage.getItem("token")? <><Link to="/login" className='btn btn-warning mx-2'>Login</Link>
                            <Link to="/sign-up" className='btn btn-warning mx-2'>Sign Up</Link></>: <button className='btn btn-danger mx-2' onClick={handleLogout}>Logout</button> }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
