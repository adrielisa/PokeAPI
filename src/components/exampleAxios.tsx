import axios from "axios"; //Se importa la biblioteca axios que sirve para realizar solicitudes HTTP
import { useEffect, useState } from "react"; //useState para manejar datos en el estado del componente y useEffect para ejecutar código al cargar el componente

function ExampleAxios() {
    const [data, setData] = useState<{ name: string; url: string }[]>([]); //Guarda la lista de pokemón obtenida por la API
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const dataList = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
                setData(response.data.results); // Se asigna data a la lista de pokemones
                console.log(response.data.results);
            } catch (errors) {
                setError(errors as Error);
            } finally {
                setLoading(false);
            }
        };
        dataList();
    }, []); 

    if (loading) return (
        <div className="text-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return <div>Error: {error.message}</div>;

    //Recorre la lista de los pokemón y crea una card para cada uno de los pokemones
    return (  
        <>
            <h1 className="bg-gradient-to-r from-yellow-300 via-yellow-600 to-yellow-900 text-transparent bg-clip-text">Lista de datos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"> 
            {
                data.map((item, index) => (
                    <div key={index} className="card" style={{"width": "20rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <a href={item.url} className="card-link">{item.url}</a>
                        </div>
                    </div>
                ))
            }
            </div>
        </>
    );
}

export default ExampleAxios;
