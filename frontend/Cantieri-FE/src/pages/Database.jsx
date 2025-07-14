import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DatabaseCantiere from '../components/DatabaseCantiere';
import DatabaseAzienda from "../components/DatabaseAziende";
import DatabaseInsertCantiere from "../components/DatabaseInsertCantiere"
import DatabaseInsertAzienda from "../components/DatabaseInsertAzienda"
import DatabaseDipendenti from "../components/DatabaseDipendenti"

function Database(props) {
    const [data, setData] = useState("");
    const [selection, setSelection] = useState("1");
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    // Function to fetch aziende data
    const fetchAziende = () => {
        axios
            .get("http://localhost:8091/aziende")
            .then((response) => {
                if (response.data) {
                    setData(response.data);
                } else {
                    console.log("API returned empty data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching aziende:", error);
            });
    }

    // Function to fetch cantieri data
    const fetchCantieri = () => {
        axios
            .get("http://localhost:8091/cantieri")
            .then((response) => {
                console.log("Full Response:", response);
                console.log("Response Data:", response.data);
                if (response.data) {
                    setData(response.data);
                } else {
                    console.log("API returned empty data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching cantieri:", error);
            });
    }

    // Function to fetch cantieri data
    const fetchDipendenti = () => {
        axios
            .get("http://localhost:8091/dipendenti")
            .then((response) => {
                console.log("Full Response:", response);
                console.log("Response Data:", response.data);
                if (response.data) {
                    setData(response.data);
                } else {
                    console.log("API returned empty data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching cantieri:", error);
            });
    }

    // Function to refresh data based on current selection
    const refreshData = () => {
        if (selection == 3){
            fetchDipendenti()
        } else if (selection == 2) {
            fetchAziende();
        } else if (selection == 1) {
            fetchCantieri();
        }
    }

    const editing = (tat) => {
        setIsEditing(tat)
    }

    useEffect(() => {
        if(selection == 3){
            fetchDipendenti()
        } else if (selection == 2) {
            fetchAziende();
        } else if (selection == 1) {
            fetchCantieri();
        } else {
            fetchCantieri();
        }
    }, [selection]);

    // Log the updated data once it's set
    useEffect(() => {
        if (data) {
            console.log("Updated Data:", data);
        }
    }, [data]);

    function setTable(event) {
        const selectedValue = event.target.value;
        console.log("Selected Value:", selectedValue);
        setSelection(selectedValue);
    }

    function setEditingValue(event) {
        const value = event.target.value;
        setIsEditing(true);
        props.insertForm(value);
        
        // Navigate to the appropriate route
        if (value == "2") {
            navigate('/aziende/insert');
        } else if (value == "1") {
            navigate('/cantiere/insert');
        }
    }

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar Controls */}
                <div className="col-md-3 col-lg-2 mb-4">
                    <div className="card shadow h-100">
                        <div className="card-header bg-primary text-white py-2">
                            <h6 className="mb-0">
                                <i className="fas fa-cogs me-2"></i>
                                Controlli
                            </h6>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="tableSelect" className="form-label fw-bold small">
                                    Tabella
                                </label>
                                <select 
                                    id="tableSelect"
                                    className="form-select"
                                    value={selection}
                                    onChange={setTable}
                                >
                                    <option value={1}>Cantieri</option>
                                    <option value={2}>Aziende</option>
                                    <option value={3}>Dipendenti</option>
                                </select>
                            </div>
                            <div className="d-grid">
                                <button 
                                    className="btn btn-success"
                                    value={selection}
                                    onClick={setEditingValue}
                                >
                                    <i className="fas fa-plus me-2"></i>
                                    Aggiungi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Table Area */}
                <div className="col-md-9 col-lg-10">
                    <div className="card shadow">
                        <div className="card-header bg-light">
                            <h5 className="mb-0 text-muted">
                                <i className={`fas ${selection == 2 ? 'fa-industry' : 'fa-building'} me-2`}></i>
                                {selection == 2 ? 'Elenco Aziende' : 'Elenco Cantieri'}
                            </h5>
                        </div>
                        <div className="card-body p-0">
                            {selection == 2 ? (
                                <DatabaseAzienda 
                                    data={data} 
                                    refreshData={refreshData} 
                                    editing={editing}
                                />
                            ) : (selection == 1?(
                                    <DatabaseCantiere 
                                        data={data} 
                                        refreshData={refreshData} 
                                        editing={editing}
                                    />
                                ):(
                                    <DatabaseDipendenti 
                                    data={data} 
                                    refreshData={refreshData} 
                                    editing={editing}
                                    />

                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Database;