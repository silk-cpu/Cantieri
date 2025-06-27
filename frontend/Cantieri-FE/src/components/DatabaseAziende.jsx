import { useEffect, useState } from "react"
import axios from "axios"
import DatabaseUpdateAziende from "./DatabaseUpdateAziende"

function DatabaseAzienda(props){

    const [data,setData] = useState([])
    const [singleData,setSingleData] = useState("")
    const [updateRow, setUpdateRow] = useState("")

    useEffect(()=>{
        console.log("runner2: ",props.data)
        setData(props.data)
        setUpdateRow(0)
    },[props.data])

    const refresh = () => {
        props.refreshData()
        setUpdateRow(0)
        props.editing(0)
    }

    const deleteAzienda = (id) =>{
        axios
            .delete("http://localhost:8091/aziende/"+id)
            .then((response)=>{
                console.log(response)
                alert("cancellato")
                props.refreshData()
            })

        console.log("http://localhost:8091/aziende/"+id)
        
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


    return(<>
        {updateRow == 0 ? 
            (
                <table class="table"> 
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>ragione_sociale</th>
                        <th>natura_giuridica</th>
                        <th>piva</th>
                        <th>codice_ateco</th>
                        <th>indirizzo</th>
                        <th>mappa</th>
                        <th>email</th>
                        <th>fk_cantieri</th>
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
                            <td>{item.ragione_sociale}</td>
                            <td>{item.natura_giuridica}</td>
                            <td>{item.piva}</td>
                            <td>{item.codice_ateco}</td>
                            <td>{item.indirizzo}</td>
                            <td>{item.mappa}</td>
                            <td>{item.email}</td>
                            <td>{item.fk_cantiere}</td>
                            <td><button class="btn btn-danger" value={item.id} onClick={() => deleteAzienda(item.id)}>delete</button></td>
                            <td><button class="btn btn-warning" onClick={(event) => updateInsertValue(event, item)}> update </button></td>
                        </tr>
                        ))
                    )}
                    </tbody>
                </table>
            ):(
               <DatabaseUpdateAziende data={singleData} updateInsertValue={updateInsertValue} refresh = {refresh}/>
            )
        }
    </>)
}

export default DatabaseAzienda