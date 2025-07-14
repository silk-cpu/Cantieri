import { useEffect,useState } from "react";

function Dipendenti(props){

    const[data,setData] = useState([])
    const [singleData,setSingleData] = useState("")
    const [updateRow, setUpdateRow] = useState("")

    useEffect(()=>{
        console.log("runner: ",props.data)
        setData(props.data)
    },[props.data])

    const deleteDipendente = (id) =>{
        axios
            .delete("http://localhost:8091/dipendenti/"+id)
            .then((response)=>{
                console.log(response)
                alert("cancellato")
                props.refreshData()
            })

        console.log("http://localhost:8091/dipendenti/"+id)
        
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
                                                <i className="fas fa-user-tie me-1"></i>Cognome
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-map-pin me-1"></i>Data Nascita
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-globe me-1"></i>Nazionalita
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-calendar-alt me-1"></i>Codice Fiscale
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-calendar-check me-1"></i>Sesso
                                            </th>
                                            <th scope="col">
                                                <i className="fas fa-envelope me-1"></i>fk_azienda
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
                                                <td>{item.cognome}</td>
                                                <td>
                                                    <span className="badge bg-light text-dark">{item.data_nascita}</span>
                                                </td>
                                                <td>
                                                    <span className="flag-icon me-1"></span>
                                                    {item.nazionalita}
                                                </td>
                                                <td>
                                                    <span className="flag-icon me-1"></span>
                                                    {item.codice_fiscale}
                                                    
                                                </td>
                                                <td>
                                                    <small className="flag-icon me-1">{item.sesso}</small>
                                                </td>
                                                <td>
                                                    <span className="flag-icon me-1"></span>
                                                    {item.fk_azienda}
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
                <DatabaseUpdateDipendente
                    data={singleData} 
                    updateInsertValue={updateInsertValue} 
                    refresh={refresh}
                />
            )}
        </>
    )

}

export default Dipendenti;