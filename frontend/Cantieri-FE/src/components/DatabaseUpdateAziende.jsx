import axios from "axios"
import { useEffect, useState } from "react"

function DatabaseUpdateAziende(props){
    
    const [item, setItem] = useState({
        ragione_sociale : "",
        natura_giuridica : "",
        piva : "",
        codice_ateco : "",
        indirizzo : "",
        mappa : "",
        email : "",
        fk_cantiere : ""
    })
    const [dataCantieri, setDataCantieri] = useState([])

    useEffect(()=>{
        setItem(props.data)
    },[])

    useEffect(()=>{
        console.log(props)

        axios
            .get("http://localhost:8091/cantieri")
            .then((response) => {
                console.log("Response Data:", response.data);
                
                if (response.data) {
                setDataCantieri(response.data);
                } else {
                console.log("API returned empty data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    },[props.data])

    const setRagioneSociale = (event) => {
        setItem({
            ...item,
            ragione_sociale: event.target.value
        })
    }

    const setNatura_giuridica = (event) => {
        setItem({
            ...item,
            natura_giuridica: event.target.value
        })
    }
    
    const setPIva = (event) => {
        setItem({
            ...item,
            piva: event.target.value
        })
    }
    
    const setCodice_ateco = (event) => {
        setItem({
            ...item,
            codice_ateco: event.target.value
        })
    }
    
    const setIndirizzo = (event) => {
        setItem({
            ...item,
            indirizzo: event.target.value
        })
    }
    
    const setMappa = (event) => {
        setItem({
            ...item,
            mappa: event.target.value
        })
    }
    
    const setEmail = (event) => {
        setItem({
            ...item,
            email: event.target.value
        })
    }
    
    const setFkCantieri = (event) => {
        setItem({
            ...item,
            fk_cantiere: event.target.value
        })
    }

    const sendDataAzienda = () => {
        console.log(item)
        axios
        .put("http://localhost:8091/azienda/"+props.data.id, item, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            console.log("Success:", response.data)
            
            if (props.onDataInserted) {
                props.onDataInserted();
            }
            console.log("item",item)
            props.updateInsertValue({ target: { value: 1 } },item);
            props.refresh()
            alert("Azienda inserita con successo!");
        })
        .catch((error) => {
            console.error("Error posting data:", error);
            alert("Errore durante l'inserimento!");
        });
    }

    return(
        <>
            <br/>
                <table>
                    <tr>
                        <th><input type="text" placeholder="ragione_sociale" value={item.ragione_sociale} onChange={setRagioneSociale}/></th>
                        <th>
                            <select value={item.natura_giuridica} onChange={setNatura_giuridica}>
                                <option value="">Select an option</option>
                                <option value="societa">societa</option>
                                <option value="ditta individuale">ditta individuale</option>
                            </select>
                        </th>
                        <th><input type="number" placeholder="piva" value={item.piva} onChange={setPIva}/></th>
                        <th><input type="text" placeholder="codice_ateco" value={item.codice_ateco} onChange={setCodice_ateco}/></th>
                        <th><input type="text" placeholder="indirizzo" value={item.indirizzo} onChange={setIndirizzo}/></th>
                        <th><input type="text" placeholder="mappa" value={item.mappa} onChange={setMappa}/></th>
                        <th><input type="text" placeholder="email" value={item.email} onChange={setEmail}/></th>
                        <th>
                            <select value={item.fk_cantiere} onChange={setFkCantieri}>
                                    <option value="">Select an option</option>
                                    {
                                        dataCantieri.map((singleitem, index) => (
                                            <option key={index} value={singleitem.id}>{singleitem.id}</option>
                                        ))      
                                    }
                            </select>
                        </th>
                        
                        <th>&nbsp;&nbsp;&nbsp;</th>
                        <button className="btn btn-primary" onClick={sendDataAzienda}>inserisci</button>
                    </tr>
                </table>
            <br/>
        </>)
}

export default DatabaseUpdateAziende