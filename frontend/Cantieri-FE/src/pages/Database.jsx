import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DatabaseCantiere from '../components/DatabaseCantiere';
import DatabaseAzienda from "../components/DatabaseAziende";
import DatabaseInsertCantiere from "../components/DatabaseInsertCantiere"
import DatabaseInsertAzienda from "../components/DatabaseInsertAzienda"

function Database(props) {
    const [data, setData] = useState("");
    const [selection, setSelection] = useState("")
    const [isEditing, setIsEditing] = useState(false)
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

    // Function to refresh data based on current selection
    const refreshData = () => {
        if (selection == 2) {
            fetchAziende();
        } else if (selection == 1) {
            fetchCantieri();
        }
    }

    const editing = (tat) => {
        setIsEditing(tat)
    }

    useEffect(() => {
        if (selection == 2) {
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
        <>
            <select onChange={setTable}>
                <option value={1}>Cantieri</option>
                <option value={2}>Aziende</option>
            </select>
            
            {selection == 2 ? (
                <>
                    <button value={2} onClick={setEditingValue}>Aggiungi</button>
                    <DatabaseAzienda data={data} refreshData={refreshData} editing={editing}/>
                </>
            ) : (
                <>
                    <button value={1} onClick={setEditingValue}>Aggiungi</button>
                    <DatabaseCantiere data={data} refreshData={refreshData} editing={editing}/>
                </>
            )}
        </>
    );
}

export default Database