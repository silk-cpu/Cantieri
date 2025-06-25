import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import axios from "axios"
import nations from '../../files/nazioni.json';


function DatabaseInsert(props){

    const [selection, setSelection] = useState("")
    const [dataCantieri, setDataCantieri] = useState([])
    const [nazioni,setNazioni] = useState([])

    const [dcantieri, setDCantieri]= useState({
        nome:"",
        committente:"",
        cap:"",
        nazione:"",
        data_inizio_cantiere:"",
        data_fine_cantiere:"",
        email:"",
        logo:"",
        pdf:"",
        firma:""
    })
    const [data, setData] = useState({
        ragione_sociale : "",
        natura_giuridica : "",
        piva : "",
        codice_ateco : "",
        indirizzo : "",
        mappa : "",
        email : "",
        fk_cantiere : ""
    })




    const [fileLogo, setFileLogo] = useState(null);
    const [filePDF, setFilePDF] = useState(null);
    const [fileFirma, setFileFirma] = useState(null);

    const handleFileChangeLogo = (event) => {
        const file = setFileLogo(event.target.files[0]);
    };
    const handleFileChangePDF = (event) => {
        const file = setFilePDF(event.target.files[0]);
    };
    const handleFileChangeFirma = (event) => {
        const file = setFileFirma(event.target.files[0]);
    };
    const handleNome = (event) =>{
        setDCantieri({
            ...dcantieri,
            nome:event.target.value
        })
    }
    const handleEmail = (event) =>{
        setDCantieri({
            ...dcantieri,
            email:event.target.value
        })
    }
    const handleComittente = (event) =>{
        setDCantieri({
            ...dcantieri,
            committente:event.target.value
        })
    }
    const handleCap = (event) =>{
        setDCantieri({
            ...dcantieri,
            cap:event.target.value
        })
    }
    const handleNazione = (event) =>{
        setDCantieri({
            ...dcantieri,
            nazione:event.target.value
        })
    }
    //data inizio cantiere
    const handleDIC = (event) =>{
        setDCantieri({
            ...dcantieri,
            data_inizio_cantiere:event.target.value
        })
    }
    const handleDFC = (event) =>{
        setDCantieri({
            ...dcantieri,
            data_fine_cantiere:event.target.value
        })
    }

    useEffect(()=>{
        setNazioni(nations);
    },[props.data])

    useEffect(()=>{
        setSelection(props.selection)
        console.log(props)

        axios
            .get("http://localhost:8090/cantieri")
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
    },[props])

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

    const sendDataAzienda = () => {
        console.log(data)
        if(selection == 2){
            axios
            .post("http://localhost:8090/azienda", data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                console.log("Success:", response.data)
                
                // ✅ Call the parent's refresh function
                if (props.onDataInserted) {
                    props.onDataInserted();
                }
                
                // ✅ Clear the form
                clearForm();
                
                alert("Azienda inserita con successo!");
            })
            .catch((error) => {
                console.error("Error posting data:", error);
                alert("Errore durante l'inserimento!");
            });
        }else if(selection == 1){
            axios
            .post("http://localhost:8090/cantieri", data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                console.log("Success:", response.data)
                
                // ✅ Call the parent's refresh function
                if (props.onDataInserted) {
                    props.onDataInserted();
                }
                
                // ✅ Clear the form
                clearForm();
                
                alert("Azienda inserita con successo!");
            })
            .catch((error) => {
                console.error("Error posting data:", error);
                alert("Errore durante l'inserimento!");
            });
        }
    }


    const sendDataCantiere = async () => {
        const newDCantieri = { ...dcantieri };

        const uploadFile = async (file, endpoint, fieldName) => {
            if (!file) return null;

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post(`http://localhost:8000/${endpoint}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log(`${fieldName} uploaded:`, response.data);
                return `${fieldName}/${response.data}`;
            } catch (error) {
                console.error(`Error uploading ${fieldName}:`, error);
                alert(`Error uploading ${fieldName}`);
                return null;
            }
        };

        // Upload files and collect file paths
        const logoPath = await uploadFile(fileLogo, "uploadLogo", "logo");
        const pdfPath = await uploadFile(filePDF, "uploadPdf", "pdf");
        const firmaPath = await uploadFile(fileFirma, "uploadFirma", "firma");

        // Set the file paths in dcantieri
        if (logoPath) newDCantieri.logo = logoPath;
        if (pdfPath) newDCantieri.pdf = pdfPath;
        if (firmaPath) newDCantieri.firma = firmaPath;

        // Submit the final object
        console.log("Sending dcantieri:", newDCantieri);

        axios.post("http://localhost:8090/cantieri", newDCantieri, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log("Cantiere inserted:", response.data);
            alert("Cantiere inserito con successo!");
        })
        .catch((error) => {
            console.error("Error posting cantiere:", error);
            alert("Errore durante l'inserimento del cantiere!");
        });
    };



    const testPost = () => {
        console.log("Testing hardcoded POST...");
    
        const testData = {
            ragione_sociale: "Test Company",
            natura_giuridica: "societa",
            piva: "12345",
            codice_ateco: "TEST123",
            indirizzo: "Test Address",
            mappa: "Test Map",
            email: "test@test.com",
            fk_cantiere: 15
        };
        
        axios.post("http://localhost:8090/azienda", testData, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            console.log("✅ Test POST Success:", response);
            
            // ✅ Call the parent's refresh function after test
            if (props.onDataInserted) {
                props.onDataInserted();
            }
        })
        .catch(error => {
            console.error("❌ Test POST Error:", error);
        });
    }

    return (<>
    
    <button onClick={testPost}>Test POST</button>
        {selection == 2 ? (
            <>
                <br/>
                <table>
                    <tr>
                        <th><input type="text" placeholder="ragione_sociale" value={data.ragione_sociale} onChange={setRagioneSociale}/></th>
                        <th>
                            <select value={data.natura_giuridica} onChange={setNatura_giuridica}>
                                <option value="">Select an option</option>
                                <option value="societa">societa</option>
                                <option value="ditta individuale">ditta individuale</option>
                            </select>
                        </th>
                        <th><input type="number" placeholder="piva" value={data.piva} onChange={setPIva}/></th>
                        <th><input type="text" placeholder="codice_ateco" value={data.codice_ateco} onChange={setCodice_ateco}/></th>
                        <th><input type="text" placeholder="indirizzo" value={data.indirizzo} onChange={setIndirizzo}/></th>
                        <th><input type="text" placeholder="mappa" value={data.mappa} onChange={setMappa}/></th>
                        <th><input type="text" placeholder="email" value={data.email} onChange={setEmail}/></th>
                        <th>
                            <select value={data.fk_cantiere} onChange={setFkCantieri}>
                                    <option value="">Select an option</option>
                                    {
                                        dataCantieri.map((item, index) => (
                                            <option key={index} value={item.id}>{item.id}</option>
                                        ))      
                                    }
                            </select>
                        </th>
                        
                        <th>&nbsp;&nbsp;&nbsp;</th>
                        <button className="btn btn-primary" onClick={sendDataAzienda}>inserisci</button>
                    </tr>
                </table>
                <br/>
            </>
        ):(
            <>
                <br/>
                <table>
                    <tr>
                        <th><input style={{width: 150 + 'px'}} type="text" placeholder="nome" onChange={handleNome}/></th>
                        <th><input style={{width: 150 + 'px'}} type="text" placeholder="committente" onChange={handleComittente}/></th>
                        <th><input style={{width: 100 + 'px'}} type="number" placeholder="cap" onChange={handleCap}/></th>
                        <select style={{width: 150 + 'px'}} onChange={handleNazione}>
                            <option value=""></option>
                            {
                                nazioni.map((nazione,index) => (
                                <option value={nazione.name} key={index}>{nazione.name}</option>
                            ))}
                        </select>
                        <th><input style={{width: 150 + 'px'}} type="date" placeholder="data_inizio_cantiere" onChange={handleDIC}/></th>
                        <th><input style={{width: 150 + 'px'}} type="date" placeholder="data_fine_cantiere" onChange={handleDFC}/></th>
                        <th><input style={{width: 200 + 'px'}} type="text" placeholder="email" onChange={handleEmail}/></th>
                        <th><input style={{width: 200 + 'px'}} type="file" placeholder="logo" onChange={handleFileChangeLogo}/></th>
                        <th><input style={{width: 200 + 'px'}} type="file" placeholder="pdf" onChange={handleFileChangePDF}/></th>
                        <th><input style={{width: 200 + 'px'}} type="file" placeholder="firma" onChange={handleFileChangeFirma}/></th>
                        <th>&nbsp;&nbsp;&nbsp;</th>
                        <button className="btn btn-primary" onClick={sendDataCantiere}>inserisci</button>
                    </tr>
                </table>
                <br/>
            </>
        )}
    </>)
}

export default DatabaseInsert