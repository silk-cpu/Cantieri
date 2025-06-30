import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import axios from "axios"
import nations from '../../files/nazioni.json';
import { useNavigate } from "react-router-dom"  // Add this import


function DatabaseInsert(props){

    const navigate = useNavigate()  // Add this hook
    const [dataCantieri, setDataCantieri] = useState([])

    const [data, setData] = useState({
        ragione_sociale : "",
        natura_giuridica : "",
        piva : "",
        codice_ateco : "",
        indirizzo : "",
        mappa : "",
        email : "",
        stato : "",
        citta : "",
        nazione : "",
        fk_cantiere : ""
    })

    useEffect(()=>{
        console.log(props)

        axios
            .get("http://localhost:8091/cantieri")
            .then((response) => {
                console.log("Full Response:", response);
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
    },[data.fk_cantiere])

    // Clear form function
    const clearForm = () => {
        setData({
            ragione_sociale : "",
            natura_giuridica : "",
            piva : "",
            codice_ateco : "",
            indirizzo : "",
            mappa : "",
            email : "",
            fk_cantiere : ""
        })
    }

    const setRagioneSociale = (event) => {
        setData({
            ...data,
            ragione_sociale: event.target.value
        })
    }

    const setNatura_giuridica = (event) => {
        setData({
            ...data,
            natura_giuridica: event.target.value
        })
    }
    
    const setPIva = (event) => {
        setData({
            ...data,
            piva: event.target.value
        })
    }
    
    const setCodice_ateco = (event) => {
        setData({
            ...data,
            codice_ateco: event.target.value
        })
    }
    
    const setIndirizzo = (event) => {
        setData({
            ...data,
            indirizzo: event.target.value
        })
    }
    
    const setMappa = (event) => {
        setData({
            ...data,
            mappa: event.target.value
        })
    }
    
    const setEmail = (event) => {
        setData({
            ...data,
            email: event.target.value
        })
    }
    
    const setFkCantieri = (event) => {
        setData({
            ...data,
            fk_cantiere: event.target.value
        })
    }
    const setCitta = (event) => {
        setData({
            ...data,
            citta: event.target.value
        })
    }
    const setStato = (event) => {
        setData({
            ...data,
            stato: event.target.value
        })
    }

    const sendDataAzienda = () => {
        const tempId = parseInt(data.fk_cantiere); // ensure it's a number
        const selectedCantiere = dataCantieri.find(c => c.id === tempId);

        if (!selectedCantiere) {
            console.log("Cantiere selezionato non trovato");
            return;
        }

        const newData = {
            ...data,
            nazione: selectedCantiere.nazione
        };

        setData(newData);

        console.log("Nazione trovata:", selectedCantiere.nazione);
        console.log("Dati da inviare:", newData);

        axios.post("http://localhost:8091/azienda", newData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            console.log("Success:", response.data);
            if (props.onDataInserted) {
                props.onDataInserted();
            }
            clearForm();
            alert("Azienda inserita con successo!");
            props.insertForm(0)
            navigate("/link");    // This actually navigates to the route
        })
        .catch((error) => {
            console.error("Error posting data:", error);
            alert("Errore durante l'inserimento!");
        });
    };



    return (
    <div className="container mt-4">
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <div className="card shadow">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">
                            <i className="fas fa-building me-2"></i>
                            Aggiungi Azienda
                        </h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="ragioneSociale" className="form-label fw-bold">
                                    Ragione Sociale
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="ragioneSociale"
                                    placeholder="Inserisci ragione sociale" 
                                    value={data.ragione_sociale} 
                                    onChange={setRagioneSociale}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="naturaGiuridica" className="form-label fw-bold">
                                    Natura Giuridica
                                </label>
                                <select 
                                    className="form-select" 
                                    id="naturaGiuridica"
                                    value={data.natura_giuridica} 
                                    onChange={setNatura_giuridica}
                                >
                                    <option value="">Seleziona un'opzione</option>
                                    <option value="societa">Società</option>
                                    <option value="ditta individuale">Ditta Individuale</option>
                                </select>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="piva" className="form-label fw-bold">
                                        P.IVA
                                    </label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="piva"
                                        placeholder="Partita IVA" 
                                        value={data.piva} 
                                        onChange={setPIva}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="codiceAteco" className="form-label fw-bold">
                                        Codice ATECO
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="codiceAteco"
                                        placeholder="Codice ATECO" 
                                        value={data.codice_ateco} 
                                        onChange={setCodice_ateco}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="indirizzo" className="form-label fw-bold">
                                    Indirizzo
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="indirizzo"
                                    placeholder="Via, Città, CAP" 
                                    value={data.indirizzo} 
                                    onChange={setIndirizzo}
                                />
                                
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="piva" className="form-label fw-bold">
                                        Stato
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="stato"
                                        placeholder="Stato" 
                                        value={data.stato} 
                                        onChange={setStato}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="codiceAteco" className="form-label fw-bold">
                                        Citta
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="citta"
                                        placeholder="Città" 
                                        value={data.citta} 
                                        onChange={setCitta}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold">
                                    Email
                                </label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email"
                                    placeholder="email@esempio.com" 
                                    value={data.email} 
                                    onChange={setEmail}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="fkCantiere" className="form-label fw-bold">
                                    Cantiere Associato
                                </label>
                                <select 
                                    className="form-select" 
                                    id="fkCantiere"
                                    value={data.fk_cantiere} 
                                    onChange={setFkCantieri}
                                >
                                    <option value="">Seleziona cantiere</option>
                                    {dataCantieri.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            Cantiere #{item.id}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="d-grid gap-2">
                                <button 
                                    type="button"
                                    className="btn btn-primary btn-lg" 
                                    onClick={sendDataAzienda}
                                >
                                    <i className="fas fa-save me-2"></i>
                                    Inserisci Azienda
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default DatabaseInsert