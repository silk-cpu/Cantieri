import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Database from "./pages/Database"

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/"/>
        <Route path="/link" element={< Database/>}/>
      </Routes>
    </>
  )
}

export default App
