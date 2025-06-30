import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

function Login(props){
    const navigate = useNavigate()
    const [loginDetails,setLoginDetails] = useState([])
    const [loginAttempt,setLoginAttempt] = useState({
        "user":"",
        "password":""
    })

    useEffect(()=>{
        axios
            .get("http://localhost:8091/credenziali")
            .then((response)=>{
                setLoginDetails(response.data)
                console.log(loginDetails)
            })
            .catch((error)=>{
                console.error("Error fetching credenziali:", error);
            })
    },[])

    const setUsername = (event) =>{
        setLoginAttempt({
                ...loginAttempt,
                user : event.target.value
        })

    }
    const setPassword = (event) =>{
        setLoginAttempt({
                ...loginAttempt,
                password : event.target.value
        })
    }

    const checkLogin = () => {
        const foundUser = loginDetails.find(login =>{
            const isMatch = login.user == loginAttempt.user && login.password == loginAttempt.password
            console.log("login user: ",login.password,"  login atempt: ",loginAttempt.password)
            return isMatch
        })

        console.log(foundUser)

        if(foundUser){
            props.setLoginValue(true,foundUser);
            navigate("/link");
        }else{
            console.log( "user not found")
        }
    }


    return (<>
            <div className="min-vh-100 d-flex align-items-center justify-content-center" 
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
            
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow-lg border-0" 
                            style={{
                                borderRadius: '1rem',
                                backdropFilter: 'blur(10px)',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)'
                            }}>
                            
                            <div className="card-body p-5">
                                {/* Header */}
                                <div className="text-center mb-4">
                                    <div className="mb-3">
                                        <i className="fas fa-hard-hat text-primary display-4"></i>
                                    </div>
                                    <h2 className="fw-bold text-dark mb-2">Gestione Cantieri</h2>
                                    <p className="text-muted">Accedi al tuo account</p>
                                </div>

                                {/* Form */}
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-dark">
                                            <i className="fas fa-user me-2 text-primary"></i>
                                            Username
                                        </label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg"
                                            placeholder="Inserisci il tuo username"
                                            onChange={setUsername}
                                            style={{
                                                borderRadius: '0.75rem',
                                                border: '2px solid #e9ecef',
                                                backgroundColor: '#f8f9fa'
                                            }}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-dark">
                                            <i className="fas fa-lock me-2 text-primary"></i>
                                            Password
                                        </label>
                                        <input 
                                            type="password" 
                                            className="form-control form-control-lg"
                                            placeholder="Inserisci la tua password"
                                            onChange={setPassword}
                                            style={{
                                                borderRadius: '0.75rem',
                                                border: '2px solid #e9ecef',
                                                backgroundColor: '#f8f9fa'
                                            }}
                                        />
                                    </div>

                                    <div className="d-grid">
                                        <button 
                                            type="button"
                                            onClick={checkLogin}
                                            className="btn btn-primary btn-lg fw-semibold"
                                            style={{
                                                borderRadius: '0.75rem',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                border: 'none',
                                                padding: '0.75rem'
                                            }}
                                        >
                                            <i className="fas fa-sign-in-alt me-2"></i>
                                            Accedi
                                        </button>
                                    </div>
                                </form>

                                {/* Footer */}
                                <div className="text-center mt-4">
                                    <small className="text-muted">
                                        <i className="fas fa-shield-alt me-1"></i>
                                        Accesso sicuro e protetto
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}


export default Login