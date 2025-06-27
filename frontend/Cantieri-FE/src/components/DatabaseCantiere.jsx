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
            .delete("http://localhost:8091/cantieri/"+id)
            .then((response)=>{
                console.log(response)
                alert("cancellato")
                props.refreshData()
            })

        console.log("http://localhost:8091/cantieri/"+id)
        
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

    return (
    <>
        {updateRow == 0 ? (
            <div className="container-fluid mt-4">
                <div className="card shadow">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">
                            <i className="fas fa-construction me-2"></i>
                            Gestione Cantieri
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
                                                <i className="fas fa-building me-1"></i>Nome
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-user-tie me-1"></i>Committente
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-map-pin me-1"></i>CAP
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-globe me-1"></i>Nazione
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-calendar-alt me-1"></i>Data Inizio
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-calendar-check me-1"></i>Data Fine
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-envelope me-1"></i>Email
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-image me-1"></i>Logo
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-file-pdf me-1"></i>PDF
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-signature me-1"></i>Firma
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
                                                <td className="fw-bold text-primary">{item.nome}</td>
                                                <td>{item.committente}</td>
                                                <td>
                                                    <span className="badge bg-light text-dark">{item.cap}</span>
                                                </td>
                                                <td>
                                                    <span className="flag-icon me-1"></span>
                                                    {item.nazione}
                                                </td>
                                                <td>
                                                    <small className="text-muted">
                                                        {item.data_inizio_cantiere ? 
                                                            new Date(item.data_inizio_cantiere).toLocaleDateString('it-IT') 
                                                            : 'N/A'
                                                        }
                                                    </small>
                                                </td>
                                                <td>
                                                    <small className="text-muted">
                                                        {item.data_fine_cantiere ? 
                                                            new Date(item.data_fine_cantiere).toLocaleDateString('it-IT') 
                                                            : 'N/A'
                                                        }
                                                    </small>
                                                </td>
                                                <td>
                                                    <small className="text-primary">{item.email}</small>
                                                </td>
                                                <td>
                                                    {item.logo ? (
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
                                                    {item.pdf ? (
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
                                                    {item.firma ? (
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
                                                    <div className="btn-group" role="group">
                                                        <button 
                                                            className="btn btn-outline-warning btn-sm" 
                                                            onClick={(event) => updateInsertValue(event, item)}
                                                            title="Modifica cantiere"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button 
                                                            className="btn btn-outline-danger btn-sm" 
                                                            value={item.id} 
                                                            onClick={() => deleteCantiere(item.id)}
                                                            title="Elimina cantiere"
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
                                Totale cantieri: <strong>{data.length}</strong>
                            </small>
                        </div>
                    )}
                </div>
            </div>
            ) : (
                <DatabaseUpdateCantiere 
                    data={singleData} 
                    updateInsertValue={updateInsertValue} 
                    refresh={refresh}
                />
            )}
        </>
    )
}

export default Cantiere