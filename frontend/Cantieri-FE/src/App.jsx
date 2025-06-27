import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Database from "./pages/Database"
import DatabaseInsertCantiere from "./components/DatabaseInsertCantiere"
import DatabaseInsertAzienda from "./components/DatabaseInsertAzienda"
import { useState } from "react"

function App() {
    const [selection, setSelection] = useState("")

    const insertForm = (value) => {
        setSelection(value)
    }

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/"/>
                <Route path="/link" element={<Database insertForm={insertForm}/>}/>
                {selection == 2 && <Route path="/aziende/insert" element={<DatabaseInsertAzienda/>}/>}
                {selection == 1 && <Route path="/cantiere/insert" element={<DatabaseInsertCantiere/>}/>}
            </Routes>
        </>
    )
}

export default App
