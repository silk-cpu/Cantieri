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

return (
    <>
        {updateRow == 0 ? (
            <div className="container-fluid mt-4">
                <div className="card shadow">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">
                            <i className="fas fa-building me-2"></i>
                            Gestione Aziende
                        </h5>
                    </div>
                    <div className="card-body p-0">
                        {data.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center p-5">
                                <div className="text-center">
                                    <div className="spinner-border text-primary mb-3" role="status">
                                        <span className="visually-hidden">Caricamento...</span>
                                    </div>
                                    <p className="text-muted">Caricamento dati in corso...</p>
                                </div>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-striped mb-0">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">
                                                <i className="fas fa-hashtag me-1"></i>ID
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-briefcase me-1"></i>Ragione Sociale
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-gavel me-1"></i>Natura Giuridica
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-receipt me-1"></i>P.IVA
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-code me-1"></i>Codice ATECO
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-map-marker-alt me-1"></i>Indirizzo
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-map me-1"></i>Mappa
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-envelope me-1"></i>Email
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-construction me-1"></i>FK Cantiere
                                            </th>
                                            <th scope="col" className="text-center">
                                                <i className="fas fa-cogs me-1"></i>Azioni
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index} className="align-middle">
                                                <td>
                                                    <span className="badge bg-secondary">{item.id}</span>
                                                </td>
                                                <td className="fw-bold text-primary">{item.ragione_sociale}</td>
                                                <td>
                                                    <span className="badge bg-info text-dark">{item.natura_giuridica}</span>
                                                </td>
                                                <td>
                                                    <small className="text-muted font-monospace">{item.piva}</small>
                                                </td>
                                                <td>
                                                    <span className="badge bg-light text-dark">{item.codice_ateco}</span>
                                                </td>
                                                <td>
                                                    <small className="text-truncate d-inline-block" style={{maxWidth: '150px'}} title={item.indirizzo}>
                                                        <i className="fas fa-location-dot me-1 text-danger"></i>
                                                        {item.indirizzo}
                                                    </small>
                                                </td>
                                                <td>
                                                    {item.mappa ? (
                                                        <span className="badge bg-success">
                                                            <i className="fas fa-check me-1"></i>Presente
                                                        </span>
                                                    ) : (
                                                        <span className="badge bg-secondary">
                                                            <i className="fas fa-times me-1"></i>Assente
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <small className="text-primary">{item.email}</small>
                                                </td>
                                                <td>
                                                    <span className="badge bg-warning text-dark">{item.fk_cantiere}</span>
                                                </td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <button 
                                                            className="btn btn-outline-warning btn-sm" 
                                                            onClick={(event) => updateInsertValue(event, item)}
                                                            title="Modifica azienda"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button 
                                                            className="btn btn-outline-danger btn-sm" 
                                                            value={item.id} 
                                                            onClick={() => deleteAzienda(item.id)}
                                                            title="Elimina azienda"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    {data.length > 0 && (
                        <div className="card-footer bg-light">
                            <small className="text-muted">
                                <i className="fas fa-info-circle me-1"></i>
                                Totale aziende: <strong>{data.length}</strong>
                            </small>
                        </div>
                    )}
                </div>
            </div>
        ) : (
            <DatabaseUpdateAziende 
                data={singleData} 
                updateInsertValue={updateInsertValue} 
                refresh={refresh}
            />
        )}
    </>
)
}

export default DatabaseAzienda