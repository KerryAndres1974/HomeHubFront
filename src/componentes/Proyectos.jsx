import '../hojasEstilos/Proyectos.css';
/*https://jminmobiliaria.co/proyectos-en-venta/
https://www.realtor.com/international/co/house/*/
function Proyectos( props ) {
    return (
        <div className='contenedor-propiedad'>
            <img
                className='imagen-propiedad' 
                src={require(`../multimedia/${props.imagen}.jpg`)} 
                alt='Foto propiedad' />
            <div className='contenedor-texto-propiedad'>
                <p className='titulo-propiedad'>{props.titulo}</p>
                <p className='textos-propiedad'>{props.textos}</p>
                <p className='precio-propiedad'>{props.precio}</p>
            </div>
        </div>
    );
}

export default Proyectos;