import axios from "axios"
import { useEffect, useState } from "react"

function DatabaseUpdateDipendente(props){
    
    const [item, setItem] = useState({
        nome: "",
        cognome: "",
        data_nascita: "",
        nazionalita: "",
        codice_fiscale: "",
        sesso: "",
        fk_azienda: ""
    })
    const [dataAzienda, setDataAzienda] = useState([])

    useEffect(()=>{
        console.log("dipendenti: "+props.data.id)
        setItem(props.data)
    },[])

    useEffect(()=>{
        console.log(props)

        axios
            .get("http://localhost:8091/aziende")
            .then((response) => {
                console.log("Response Data:", response.data);
                
                if (response.data) {
                setDataAzienda(response.data);
                } else {
                console.log("API returned empty data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    },[props.data])

    const setNome = (event) => {
        setItem({
            ...item,
            nome: event.target.value
        })
    }

    const setCognome = (event) => {
        setItem({
            ...item,
            cognome: event.target.value
        })
    }
    
    const setDataNascita = (event) => {
        setItem({
            ...item,
            data_nascita: event.target.value
        })
    }
    
    const setNazionalita = (event) => {
        setItem({
            ...item,
            nazionalita: event.target.value
        })
    }
    
    const setCodiceFiscale = (event) => {
        setItem({
            ...item,
            codice_fiscale: event.target.value
        })
    }
    
    const setSesso = (event) => {
        setItem({
            ...item,
            sesso: event.target.value
        })
    }
    
    const setFkAzienda = (event) => {
        setItem({
            ...item,
            fk_azienda: event.target.value
        })
    }

    const sendDataDipendenti = () => {
        console.log(item)
        const newDipendente = {
            nome: item.nome,
            cognome: item.cognome,
            data_nascita: item.data_nascita,
            nazionalita: item.nazionalita,
            codice_fiscale: item.codice_fiscale,
            sesso: item.sesso,
            fkAzienda: Number(item.fk_azienda) // ✅ must match Spring field and be a number
        };
        axios
        .put("http://localhost:8091/dipendenti/"+props.data.id, newDipendente, {
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
                        Aggiorna Dipendente
                    </h5>
                </div>
                <div className="card-body">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-2">
                            <label className="form-label fw-bold small">Nome</label>
                            <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                placeholder="Nome" 
                                value={item.nome} 
                                onChange={setNome}
                            />
                        </div>
                        
                        <div className="col-md-1">
                            <label className="form-label fw-bold small">Cognome</label>
                            <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                placeholder="Cognome" 
                                value={item.cognome} 
                                onChange={setCognome}
                            />
                        </div>
                        
                        <div className="col-md-1">
                            <label className="form-label fw-bold small">Data Nascita</label>
                            <input 
                                type="date" 
                                className="form-control form-control-sm" 
                                placeholder="Data Nascita" 
                                value={item.data_nascita} 
                                onChange={setDataNascita}
                            />
                        </div>
                        
                        <div className="col-md-1">
                            <label className="form-label fw-bold small">Nazionalita</label>
                            <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                placeholder="Nazionalita" 
                                value={item.nazionalita} 
                                onChange={setNazionalita}
                            />
                        </div>
                        
                        <div className="col-md-2">
                            <label className="form-label fw-bold small">Codice Fiscale</label>
                            <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                placeholder="Codice Fiscale" 
                                value={item.codice_fiscale} 
                                onChange={setCodiceFiscale}
                            />
                        </div>
                        
                        <div className="col-md-1">
                            <label className="form-label fw-bold small">Sesso</label>
                            <select 
                                className="form-select form-select-sm" 
                                value={item.sesso} 
                                onChange={setSesso}
                            >
                                <option value="">Seleziona</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                        </div>
                       
                        <div className="col-md-1">
                            <label className="form-label fw-bold small">Azienda</label>
                            <select 
                                className="form-select form-select-sm" 
                                value={item.fk_azienda} 
                                onChange={setFkAzienda}
                            >
                                <option value="">Seleziona</option>
                                {dataAzienda.map((singleitem, index) => (
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
                                onClick={sendDataDipendenti}
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

export default DatabaseUpdateDipendente