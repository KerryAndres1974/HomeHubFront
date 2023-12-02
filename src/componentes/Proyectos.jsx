import '../hojasEstilos/Proyectos.css';

function Proyectos(props) {
    return (
        <div className='contenedorPropiedad'>

            {props.coincide ? (<h1 className='contorno'>Editar</h1>) : 
            (props.coincide === false ? (<h1 className='contorno'>Ver Detalles</h1>) : 
            (<p className='contorno' style={{display: 'none'}}></p>))}
            
            <img
                className='imagen'
                src={require(`../multimedia/${props.imagen}.jpg`)}
                alt='Foto propiedad'
            />
            <div className='contenedorTextoPropiedad'>
                <p className='recuadro'></p>
                <p className='tituloPropiedad'>Se vende {props.tipo} en {props.ciudad}</p>
                <p className='textosPropiedad'>Ubicada en {props.direccion}, {props.descripcion}</p>
                <p className='precioPropiedad'>$ {props.precio}</p>
            </div>
        </div>
    );
}

export default Proyectos;
