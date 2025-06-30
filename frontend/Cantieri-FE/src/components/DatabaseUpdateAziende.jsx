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

    return (
    <div className="container-fluid mt-3">
        <div className="card shadow">
            <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">
                    <i className="fas fa-edit me-2"></i>
                    Aggiorna Azienda
                </h5>
            </div>
            <div className="card-body">
                <div className="row g-3 align-items-end">
                    <div className="col-md-2">
                        <label className="form-label fw-bold small">Ragione Sociale</label>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="Ragione sociale" 
                            value={item.ragione_sociale} 
                            onChange={setRagioneSociale}
                        />
                    </div>
                    
                    <div className="col-md-1">
                        <label className="form-label fw-bold small">Natura</label>
                        <select 
                            className="form-select form-select-sm" 
                            value={item.natura_giuridica} 
                            onChange={setNatura_giuridica}
                        >
                            <option value="">Seleziona</option>
                            <option value="societa">Società</option>
                            <option value="ditta individuale">Ditta Ind.</option>
                        </select>
                    </div>
                    
                    <div className="col-md-1">
                        <label className="form-label fw-bold small">P.IVA</label>
                        <input 
                            type="number" 
                            className="form-control form-control-sm" 
                            placeholder="P.IVA" 
                            value={item.piva} 
                            onChange={setPIva}
                        />
                    </div>
                    
                    <div className="col-md-1">
                        <label className="form-label fw-bold small">ATECO</label>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="ATECO" 
                            value={item.codice_ateco} 
                            onChange={setCodice_ateco}
                        />
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label fw-bold small">Indirizzo</label>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="Via, Numero" 
                            value={item.indirizzo} 
                            onChange={setIndirizzo}
                        />
                    </div>
                    
                    <div className="col-md-1">
                        <label className="form-label fw-bold small">Mappa</label>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="GPS" 
                            value={item.mappa} 
                            readOnly
                            style={{backgroundColor: '#f8f9fa'}}
                        />
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label fw-bold small">Email</label>
                        <input 
                            type="email" 
                            className="form-control form-control-sm" 
                            placeholder="email@esempio.com" 
                            value={item.email} 
                            onChange={setEmail}
                        />
                    </div>
                    
                    <div className="col-md-1">
                        <label className="form-label fw-bold small">Cantiere</label>
                        <select 
                            className="form-select form-select-sm" 
                            value={item.fk_cantiere} 
                            onChange={setFkCantieri}
                        >
                            <option value="">Seleziona</option>
                            {dataCantieri.map((singleitem, index) => (
                                <option key={index} value={singleitem.id}>
                                    #{singleitem.id}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-md-1">
                        <button 
                            type="button"
                            className="btn btn-warning btn-sm w-100" 
                            onClick={sendDataAzienda}
                        >
                            <i className="fas fa-sync-alt me-1"></i>
                            Aggiorna
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default DatabaseUpdateAziende