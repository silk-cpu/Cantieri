import { useEffect, useState } from "react"
import Dropdown from 'react-bootstrap/Dropdown'

function Cantiere(props){

    const[data,setData] = useState([])

    useEffect(()=>{
        console.log("runner: ",props.data)
        setData(props.data)
    },[props.data])

    return(<>
        <table class="table"> 
            <thead>
            <tr>
                <th>id</th>
                <th>nome</th>
                <th>committente</th>
                <th>cap</th>
                <th>nazione</th>
                <th>data_inizio_cantiere</th>
                <th>data_fine_cantiere</th>
                <th>email</th>
                <th>logo</th>
                <th>pdf</th>
                <th>firma</th>
            </tr>
            </thead>
            <tbody>
            {data.length === 0 ? (
                <tr>
                <td colSpan="2">Loading...</td>
                </tr>
            ) : (
                data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>{item.committente}</td>
                    <td>{item.cap}</td>
                    <td>{item.nazione}</td>
                    <td>{item.data_inizio_cantiere}</td>
                    <td>{item.data_fine_cantiere}</td>
                    <td>{item.email}</td>
                    <td>{item.logo}</td>
                    <td>{item.pdf}</td>
                    <td>{item.firma}</td>
                </tr>
                ))
            )}
            </tbody>
        </table>
    </>)
}

export default Cantiere