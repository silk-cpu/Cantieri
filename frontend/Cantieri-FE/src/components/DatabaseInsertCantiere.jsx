import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import axios from "axios"
import nations from '../../files/nazioni.json';


function DatabaseInsert(props){
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

    const [fileLogo, setFileLogo] = useState(null);
    const [filePDF, setFilePDF] = useState(null);
    const [fileFirma, setFileFirma] = useState(null);

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

        axios.post("http://localhost:8091/cantieri", newDCantieri, {
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



    return (<>
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">
                                <i className="fas fa-construction me-2"></i>
                                Aggiungi Cantiere
                            </h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label fw-bold">
                                        Nome Cantiere
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nome"
                                        placeholder="Inserisci nome cantiere" 
                                        value={dcantieri.nome} 
                                        onChange={handleNome}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="committente" className="form-label fw-bold">
                                        Committente
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        id="committente"
                                        placeholder="Nome committente" 
                                        onChange={handleComittente}
                                        value={dcantieri.committente}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="cap" className="form-label fw-bold">
                                            CAP
                                        </label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            id="cap"
                                            placeholder="Codice postale" 
                                            onChange={handleCap}
                                        />
                                    </div>
                                    <div className="col-md-8 mb-3">
                                        <label htmlFor="nazione" className="form-label fw-bold">
                                            Nazione
                                        </label>
                                        <select 
                                            className="form-select" 
                                            id="nazione"
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
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="dataInizio" className="form-label fw-bold">
                                            Data Inizio Cantiere
                                        </label>
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            id="dataInizio"
                                            onChange={handleDIC}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="dataFine" className="form-label fw-bold">
                                            Data Fine Cantiere
                                        </label>
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            id="dataFine"
                                            onChange={handleDFC}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-bold">
                                        Email
                                    </label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email"
                                        placeholder="email@esempio.com" 
                                        onChange={handleEmail}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="logo" className="form-label fw-bold">
                                            Logo
                                        </label>
                                        <input 
                                            type="file" 
                                            className="form-control" 
                                            id="logo"
                                            accept="image/*"
                                            onChange={handleFileChangeLogo}
                                        />
                                        <div className="form-text">Formati supportati: JPG, PNG, GIF</div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="pdf" className="form-label fw-bold">
                                            Documento PDF
                                        </label>
                                        <input 
                                            type="file" 
                                            className="form-control" 
                                            id="pdf"
                                            accept=".pdf"
                                            onChange={handleFileChangePDF}
                                        />
                                        <div className="form-text">Solo file PDF</div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="firma" className="form-label fw-bold">
                                            Firma
                                        </label>
                                        <input 
                                            type="file" 
                                            className="form-control" 
                                            id="firma"
                                            accept="image/*"
                                            onChange={handleFileChangeFirma}
                                        />
                                        <div className="form-text">Immagine della firma</div>
                                    </div>
                                </div>

                                <div className="d-grid gap-2 mt-4">
                                    <button 
                                        type="button"
                                        className="btn btn-primary btn-lg" 
                                        onClick={sendDataCantiere}
                                    >
                                        <i className="fas fa-save me-2"></i>
                                        Inserisci Cantiere
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </>)
}

export default DatabaseInsert