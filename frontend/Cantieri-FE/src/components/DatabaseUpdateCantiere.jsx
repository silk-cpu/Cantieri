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

         // Fixed delete function - should delete by filename, not upload a file
        const deleteFile = async (filename, endpoint, fieldName) => {
            if (!filename) return null;

            try {
                const response = await axios.delete(`http://localhost:8000/${endpoint}/${filename}`);
                console.log(`${fieldName} deleted:`, response.data);
                return true;
            } catch (error) {
                console.error(`Error deleting ${fieldName}:`, error);
                // Don't alert on delete errors, they might not exist
                return false;
            }
        };

        // Delete old files if they exist (using existing filenames from data)
        if( fileLogo != null){
            await deleteFile(data.logo.split('/').pop(), "deleteLogo", "logo");
        }
        if( fileFirma != null){
            await deleteFile(data.firma.split('/').pop(), "deleteFirma", "firma");
        }
        if( filePDF != null){
            await deleteFile(data.pdf.split('/').pop(), "deletePdf", "pdf");
        }

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
    
    return (
    <div className="container-fluid mt-3">
        <div className="card shadow">
            <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">
                    <i className="fas fa-plus-circle me-2"></i>
                    Nuovo Cantiere
                </h5>
            </div>
            <div className="card-body">
                <div className="row g-3 align-items-end">
                    <div className="col-md-2">
                        <label className="form-label fw-bold small">Nome</label>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="Nome cantiere" 
                            value={data.nome} 
                            onChange={handleNome}
                        />
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label fw-bold small">Committente</label>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="Nome committente" 
                            value={data.committente} 
                            onChange={handleComittente}
                        />
                    </div>
                    
                    <div className="col-md-1">
                        <label className="form-label fw-bold small">CAP</label>
                        <input 
                            type="number" 
                            className="form-control form-control-sm" 
                            placeholder="CAP" 
                            value={data.cap} 
                            onChange={handleCap}
                        />
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label fw-bold small">Nazione</label>
                        <select 
                            className="form-select form-select-sm" 
                            value={data.nazione} 
                            onChange={handleNazione}
                        >
                            <option value="">Seleziona nazione</option>
                            {nazioni.map((nazione, index) => (
                                <option value={nazione.name} key={index}>
                                    {nazione.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label fw-bold small">Data Inizio</label>
                        <input 
                            type="date" 
                            className="form-control form-control-sm" 
                            value={data.data_inizio_cantiere} 
                            onChange={handleDIC}
                        />
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label fw-bold small">Data Fine</label>
                        <input 
                            type="date" 
                            className="form-control form-control-sm" 
                            value={data.data_fine_cantiere} 
                            onChange={handleDFC}
                        />
                    </div>
                    
                    <div className="col-md-3">
                        <label className="form-label fw-bold small">Email</label>
                        <input 
                            type="email" 
                            className="form-control form-control-sm" 
                            placeholder="email@esempio.com" 
                            value={data.email} 
                            onChange={handleEmail}
                        />
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label fw-bold small">Logo</label>
                        <input 
                            type="file" 
                            className="form-control form-control-sm" 
                            accept="image/*"
                            onChange={handleFileChangeLogo}
                        />
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label fw-bold small">PDF</label>
                        <input 
                            type="file" 
                            className="form-control form-control-sm" 
                            accept=".pdf"
                            onChange={handleFileChangePDF}
                        />
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label fw-bold small">Firma</label>
                        <input 
                            type="file" 
                            className="form-control form-control-sm" 
                            accept="image/*"
                            onChange={handleFileChangeFirma}
                        />
                    </div>
                    
                    <div className="col-md-1">
                        <button 
                            type="button"
                            className="btn btn-warning btn-sm w-100" 
                            onClick={sendDataCantiere}
                        >
                            <i className="fas fa-plus me-1"></i>
                            Inserisci
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default DatabaseUpdateCantiere