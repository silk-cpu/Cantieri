import axios from "axios"
import { useEffect, useState } from "react"
import Dropdown from 'react-bootstrap/Dropdown'

function Cantiere(props){

    const[data,setData] = useState([])

    useEffect(()=>{
        console.log("runner: ",props.data)
        setData(props.data)
    },[props.data])

    const deleteCantiere = (id) =>{
        axios
            .delete("http://localhost:8090/cantieri/"+id)
            .then((response)=>{
                console.log(response)
                alert("cancellato")
                props.refreshData()
            })

        console.log("http://localhost:8090/cantieri/"+id)
        
    }

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
                    <td>{item.nazioni}</td>
                    <td>{item.data_inizio_cantiere}</td>
                    <td>{item.data_fine_cantiere}</td>
                    <td>{item.email}</td>
                    <td>{item.logo}</td>
                    <td>{item.pdf}</td>
                    <td>{item.firma}</td>
                    <td><button class="btn btn-danger" value={item.id} onClick={() => deleteCantiere(item.id)}>delete</button></td>
                </tr>
                ))
            )}
            </tbody>
        </table>
    </>)
}

export default Cantiere