import { useEffect, useState } from "react"
function DatabaseAzienda(props){

    const [data,setData] = useState([])

    useEffect(()=>{
        console.log("runner2: ",props.data)
        setData(props.data)
    },[props.data])

    return(<>
        <table class="table"> 
            <thead>
            <tr>
                <th>id</th>
                <th>ragione_sociale</th>
                <th>natura_giuridica</th>
                <th>piva</th>
                <th>codice_ateco</th>
                <th>indirizzo</th>
                <th>mappa</th>
                <th>email</th>
            </tr>
            </thead>
            <tbody>
            {data.length === 0 ? (
                <tr>
                <td colSpan="2">Loading...</td>
                </tr>
            ) : (
                data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.ragione_sociale}</td>
                    <td>{item.natura_giuridica}</td>
                    <td>{item.piva}</td>
                    <td>{item.codice_ateco}</td>
                    <td>{item.indirizzo}</td>
                    <td>{item.mappa}</td>
                    <td>{item.email}</td>
                </tr>
                ))
            )}
            </tbody>
        </table>
    </>)
}

export default DatabaseAzienda