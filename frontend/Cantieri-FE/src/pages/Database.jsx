import axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DatabaseCantiere from '../components/DatabaseCantiere';
import DatabaseAzienda from "../components/DatabaseAziende";
function Database() {
    const [data, setData] = useState("");
    const [selection,setSelection] = useState("")
    
    useEffect(() => {
        if(selection==2){
            axios
            .get("http://localhost:8090/aziende")
            .then((response) => {
                console.log("Full Response:", response); // Log the full response object
                console.log("Response Data:", response.data); // Check if response.data exists and has values
                
                if (response.data) {
                setData(response.data); // Set the fetched data to state
                } else {
                console.log("API returned empty data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        }else{
            axios
            .get("http://localhost:8090/cantieri")
            .then((response) => {
                console.log("Full Response:", response); // Log the full response object
                console.log("Response Data:", response.data); // Check if response.data exists and has values
                
                if (response.data) {
                setData(response.data); // Set the fetched data to state
                } else {
                console.log("API returned empty data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        }
    }, [selection]);

  // Log the updated data once it's set
    useEffect(() => {
        if (data) {
        console.log("Updated Data:", data); // Log the updated data
        }
    }, [data]);

    function setTable(value){
        console.log("value",value)
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

        {selection == 2 ? (<DatabaseAzienda data={data} />) : (<DatabaseCantiere data={data} />)}
        </>
    );
}

export default Database
