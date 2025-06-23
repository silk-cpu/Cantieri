import { useEffect, useState } from "react"
import axios from "axios"
function DatabaseAzienda(props){

    const [data,setData] = useState([])

    useEffect(()=>{
        console.log("runner2: ",props.data)
        setData(props.data)
    },[props.data])

    const deleteAzienda = (id) =>{
        axios
            .delete("http://localhost:8090/aziende/"+id)
            .then((response)=>{
                console.log(response)
                alert("cancellato")
                props.refreshData()
            })

        console.log("http://localhost:8090/aziende/"+id)
        
    }


    return(<>
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
                </tr>
                ))
            )}
            </tbody>
        </table>
    </>)
}

export default DatabaseAzienda