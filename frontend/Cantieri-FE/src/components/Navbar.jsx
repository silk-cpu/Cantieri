import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Navbar(props) {
    const [user,setUser] = useState([])

    useEffect(() => {
        setUser(props.credentials)
        console.log("navbar props updated:", props)
        console.log("user state updated:", props.credentials)
        console.log("allowed:", props.allowed)
    }, [props.credentials, props.allowed]) // Listen to specific props

    const revokePermission = () =>{
        props.setLoginValue(false,[])
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" >
                        <i className="fas fa-hard-hat me-2"></i>
                        Gestione Cantieri
                    </Link>
                    
                    {props.allowed == true?(
                        <>
                            <button 
                                className="navbar-toggler" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#navbarSupportedContent" 
                                aria-controls="navbarSupportedContent" 
                                aria-expanded="false" 
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/link">
                                            <i className="fas fa-database me-1"></i>
                                            Database
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a 
                                            className="nav-link dropdown-toggle" 
                                            href="#" 
                                            id="navbarDropdown" 
                                            role="button" 
                                            data-bs-toggle="dropdown" 
                                            aria-expanded="false"
                                        >
                                            <i className="fas fa-plus me-1"></i>
                                            Aggiungi
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li>
                                                <Link className="dropdown-item" to="/cantiere/insert">
                                                    <i className="fas fa-construction me-2"></i>
                                                    Nuovo Cantiere
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/aziende/insert">
                                                    <i className="fas fa-building me-2"></i>
                                                    Nuova Azienda
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/dipendenti/insert">
                                                    <i className="fas fa-building me-2"></i>
                                                    Nuova Azienda
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                
                                <div className="d-flex">
                                    <span className="navbar-text me-3">
                                        <i className="fas fa-user me-1"></i>
                                        Benvenuto, {user.user}!
                                    </span>
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/" onClick={revokePermission}>
                                                <i className="fas fa-database me-1"></i>
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    ):(<>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/">
                                            <i className="fas fa-home me-1"></i>
                                            Home
                                        </Link>
                                    </li>
                                </ul>
                        </div>
                    
                    </>)}  
                    
                </div>
            </nav>
        </>
    )
}

export default Navbar