import { Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Database from "./pages/Database"
import DatabaseInsertCantiere from "./components/DatabaseInsertCantiere"
import DatabaseInsertAzienda from "./components/DatabaseInsertAzienda"
import DatabaseInsertDipendente from "./components/DatabaseInsertDipendenti"
import Login from "./pages/Login"
import { useState } from "react"

function App() {
    const [selection, setSelection] = useState("")
    const [allowed, setAllowed] = useState(false)
    const [credentials, setCredentials] = useState([])
    
    const insertForm = (value) => {
        setSelection(value)
    }
    
    const setLoginValue = (value, credentials) => {
        setAllowed(value)
        setCredentials(credentials)
        console.log("allowed: ", value)
        console.log("credentials: ", credentials)
    }
    
    // Protected Route Component
    const ProtectedRoute = ({ children }) => {
        return allowed ? children : <Navigate to="/" replace />;
    }
    
    return (
        <>
            <Navbar credentials={credentials} allowed={allowed}/>
            <Routes>
                {/* Public route */}
                <Route path="/" element={<Login setLoginValue={setLoginValue}/>}/>
                
                {/* Protected routes */}
                <Route 
                    path="/link" 
                    element={
                        <ProtectedRoute>
                            <Database insertForm={insertForm}/>
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/cantiere/insert" 
                    element={
                        <ProtectedRoute>
                            <DatabaseInsertCantiere insertForm={insertForm}/>
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/aziende/insert" 
                    element={
                        <ProtectedRoute>
                            <DatabaseInsertAzienda insertForm={insertForm}/>
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/dipendenti/insert" 
                    element={
                        <ProtectedRoute>
                            <DatabaseInsertDipendente insertForm={insertForm}/>
                        </ProtectedRoute>
                    }
                />
                
                {/* Catch all - redirect any unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    )
}

export default App
