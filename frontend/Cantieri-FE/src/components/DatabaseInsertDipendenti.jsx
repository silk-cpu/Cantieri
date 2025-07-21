import { useEffect, useState } from "react";
import axios from "axios";
import nations from "../../files/nazioni.json";
import { useNavigate } from "react-router-dom"  // Add this import

function DatabaseInsertDipendente(props) {
    const navigate = useNavigate()
    const [dataAzienda, setDataAzienda] = useState([]);
    const [dipendenti, setDipendenti] = useState({
        nome: "",
        cognome: "",
        data_nascita: "",
        nazionalita: "",
        codice_fiscale: "",
        sesso: "",
        fk_azienda: ""
    });

    const clearForm = () => {
        setDipendenti({
            nome: "",
            cognome: "",
            data_nascita: "",
            nazionalita: "",
            codice_fiscale: "",
            sesso: "",
            fk_azienda: ""
        })
    }

    useEffect(() => {
        axios
            .get("http://localhost:8091/aziende")
            .then((response) => {
                if (response.data) {
                    setDataAzienda(response.data);
                } else {
                    console.log("API returned empty data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching aziende:", error);
            });
    }, []);

    const handleChange = (field) => (event) => {
        setDipendenti({
            ...dipendenti,
            [field]: event.target.value,
        });
    };

    const sendDataDipendenti = async () => {
        console.log(dipendenti)
        const newDipendente = {
            nome: dipendenti.nome,
            cognome: dipendenti.cognome,
            data_nascita: dipendenti.data_nascita,
            nazionalita: dipendenti.nazionalita,
            codice_fiscale: dipendenti.codice_fiscale,
            sesso: dipendenti.sesso,
            fkAzienda: Number(dipendenti.fk_azienda) // ✅ must match Spring field and be a number
        };
        axios
            .post("http://localhost:8091/dipendenti", newDipendente, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("Dipendente inserito:", response.data);
                alert("Dipendente inserito con successo!");
                if (props.insertForm) {
                    props.insertForm(0);
                }
                clearForm();
                alert("Azienda inserita con successo!");
                props.insertForm(0)
                navigate("/link");
            })
            .catch((error) => {
                console.error("Errore durante l'inserimento del dipendente:", error);
                alert("Errore durante l'inserimento del dipendente!");
            });
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">
                                <i className="fas fa-user-plus me-2"></i>
                                Aggiungi Dipendente
                            </h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label fw-bold">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        placeholder="Inserisci nome"
                                        value={dipendenti.nome}
                                        onChange={handleChange("nome")}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="cognome" className="form-label fw-bold">Cognome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cognome"
                                        placeholder="Inserisci cognome"
                                        value={dipendenti.cognome}
                                        onChange={handleChange("cognome")}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="data_nascita" className="form-label fw-bold">Data di Nascita</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="data_nascita"
                                            value={dipendenti.data_nascita}
                                            onChange={handleChange("data_nascita")}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="nazionalita" className="form-label fw-bold">Nazionalità</label>
                                        <input
                                            type="text"
                                            className="form-select"
                                            id="nazionalita"
                                            value={dipendenti.nazionalita}
                                            onChange={handleChange("nazionalita")}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="codice_fiscale" className="form-label fw-bold">Codice Fiscale</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="codice_fiscale"
                                            value={dipendenti.codice_fiscale}
                                            onChange={handleChange("codice_fiscale")}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="sesso" className="form-label fw-bold">Sesso</label>
                                        <select
                                            className="form-select"
                                            id="sesso"
                                            value={dipendenti.sesso}
                                            onChange={handleChange("sesso")}
                                        >
                                            <option value="">Seleziona sesso</option>
                                            <option value="M">Maschio</option>
                                            <option value="F">Femmina</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="fkAzienda" className="form-label fw-bold">Azienda Associata</label>
                                    <select
                                        className="form-select"
                                        id="fkAzienda"
                                        value={dipendenti.fk_azienda}
                                        onChange={handleChange("fk_azienda")}
                                    >
                                        <option value="">Seleziona azienda</option>
                                        {dataAzienda.map((item, index) => (
                                            <option key={index} value={item.id}>
                                                {item.ragione_sociale} (ID: {item.id})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="d-grid gap-2 mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        onClick={sendDataDipendenti}
                                    >
                                        <i className="fas fa-save me-2"></i>
                                        Inserisci Dipendente
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DatabaseInsertDipendente;
