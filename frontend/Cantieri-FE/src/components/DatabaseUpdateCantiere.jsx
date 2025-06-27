import { useEffect, useState } from "react"
import nations from '../../files/nazioni.json';
import axios from "axios"


function DatabaseUpdateCantiere(props){

    const [data,setData] = useState({
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
    const [nazioni,setNazioni] = useState([])
    
    // Add the missing file state variables
    const [fileLogo, setFileLogo] = useState(null);
    const [filePDF, setFilePDF] = useState(null);
    const [fileFirma, setFileFirma] = useState(null);

    
    useEffect(()=>{
            setNazioni(nations);
    },[props.data])

    useEffect(()=>{
        setData(props.data)
    },[props.data])

    // Fixed file change handlers
    const handleFileChangeLogo = (event) => {
        setFileLogo(event.target.files[0]);
    };
    const handleFileChangePDF = (event) => {
        setFilePDF(event.target.files[0]);
    };
    const handleFileChangeFirma = (event) => {
        setFileFirma(event.target.files[0]);
    };
    
    const handleNome = (event) =>{
        setData({
            ...data,
            nome:event.target.value
        })
    }
    const handleEmail = (event) =>{
        setData({
            ...data,
            email:event.target.value
        })
    }
    const handleComittente = (event) =>{
        setData({
            ...data,
            committente:event.target.value
        })
    }
    const handleCap = (event) =>{
        setData({
            ...data,
            cap:event.target.value
        })
    }
    const handleNazione = (event) =>{
        setData({
            ...data,
            nazione:event.target.value
        })
    }
    //data inizio cantiere
    const handleDIC = (event) =>{
        setData({
            ...data,
            data_inizio_cantiere:event.target.value
        })
    }
    const handleDFC = (event) =>{
        setData({
            ...data,
            data_fine_cantiere:event.target.value
        })
    }

    const sendDataCantiere = async () => {
        const newDCantieri = { ...data };

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

        axios.put("http://localhost:8091/cantieri/"+data.id, newDCantieri, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log("Cantiere inserted:", response.data);
            alert("Cantiere inserito con successo!");
            props.refresh()
        })
        .catch((error) => {
            console.error("Error posting cantiere:", error);
            alert("Errore durante l'inserimento del cantiere!");
        });
    };
    
    return(<>
        <br/>
        <table>
            <tr>
                <th><input style={{width: 150 + 'px'}} type="text" value={data.nome} placeholder="nome" onChange={handleNome}/></th>
                <th><input style={{width: 150 + 'px'}} type="text" placeholder="committente" value={data.committente} onChange={handleComittente}/></th>
                <th><input style={{width: 100 + 'px'}} type="number" placeholder="cap" value={data.cap} onChange={handleCap}/></th>
                <select style={{width: 150 + 'px'}} value={data.nazione} onChange={handleNazione}>
                    <option value=""></option>
                    {
                        nazioni.map((nazione,index) => (
                        <option value={nazione.name} key={index}>{nazione.name}</option>
                    ))}
                </select>
                <th><input style={{width: 150 + 'px'}} type="date" placeholder="data_inizio_cantiere" value={data.data_inizio_cantiere}  onChange={handleDIC}/></th>
                <th><input style={{width: 150 + 'px'}} type="date" placeholder="data_fine_cantiere" value={data.data_fine_cantiere}  onChange={handleDFC}/></th>
                <th><input style={{width: 200 + 'px'}} type="text" placeholder="email" value={data.email} onChange={handleEmail}/></th>
                <th><input style={{width: 200 + 'px'}} type="file" placeholder="logo" onChange={handleFileChangeLogo}/></th>
                <th><input style={{width: 200 + 'px'}} type="file" placeholder="pdf" onChange={handleFileChangePDF}/></th>
                <th><input style={{width: 200 + 'px'}} type="file" placeholder="firma" onChange={handleFileChangeFirma}/></th>
                <th>&nbsp;&nbsp;&nbsp;</th>
                <button className="btn btn-primary" onClick={sendDataCantiere}>inserisci</button>
            </tr>
        </table>
        <br/>
    </>)
}

export default DatabaseUpdateCantiere