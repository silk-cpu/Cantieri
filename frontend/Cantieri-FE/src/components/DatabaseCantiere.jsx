import axios from "axios"
import { useEffect, useState } from "react"
import DatabaseUpdateCantiere from "./DatabaseUpdateCantiere"

function Cantiere(props){

    const[data,setData] = useState([])
    const [singleData,setSingleData] = useState("")
    const [updateRow, setUpdateRow] = useState("")

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

    const updateInsertValue = (event, item) => {
        const tat = swap(event.target.value)
        console.log("tat", tat)
        setUpdateRow(tat)
        props.editing(tat)
        setSingleData(item)
    }
    
    const swap = (value) => {
        return value == 1 ? 0 : 1
        
    }

    const refresh = () => {
        props.refreshData()
        setUpdateRow(0)
        props.editing(0)
    }

    return(
        <>
        {updateRow==0?(
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
                    <td><button class="btn btn-danger" value={item.id} onClick={() => deleteCantiere(item.id)}>delete</button></td>
                    <td><button class="btn btn-warning" onClick={(event) => updateInsertValue(event, item)}> update </button></td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        ):(
            <DatabaseUpdateCantiere data={singleData} updateInsertValue={updateInsertValue} refresh = {refresh}/>
        )}
        
    </>)
}

export default Cantiere