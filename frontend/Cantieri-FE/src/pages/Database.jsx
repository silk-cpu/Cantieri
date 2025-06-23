import axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DatabaseCantiere from '../components/DatabaseCantiere';
import DatabaseAzienda from "../components/DatabaseAziende";
import DatabaseInsert from "../components/DatabaseInsert"

function Database() {
    const [data, setData] = useState("");
    const [selection, setSelection] = useState("")

    // Function to fetch aziende data
    const fetchAziende = () => {
        axios
            .get("http://localhost:8090/aziende")
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
            .get("http://localhost:8090/cantieri")
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

    useEffect(() => {
        if (selection == 2) {
            fetchAziende();
        } else if (selection == 1) {
            fetchCantieri();
        }else{
            fetchCantieri();
        }
    }, [selection]);

    // Log the updated data once it's set
    useEffect(() => {
        if (data) {
            console.log("Updated Data:", data);
        }
    }, [data]);

    function setTable(value) {
        console.log("value", value)
        setSelection(value)
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTable(1)}>Cantieri</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTable(2)}>Aziende</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            
            {/* Pass the refresh function to DatabaseInsert */}
            <DatabaseInsert 
                selection={selection} 
                onDataInserted={refreshData}
            />
            
            {selection == 2 ? (
                <DatabaseAzienda data={data} refreshData={refreshData}/>
            ) : (
                <DatabaseCantiere data={data} />
            )}
        </>
    );
}

export default Database