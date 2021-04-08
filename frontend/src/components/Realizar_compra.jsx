import React, {useState, useEffect} from 'react'
import uniqid from 'uniqid'
const moment = require("moment");

const Realizar_compra = () => {

    const [numeroOrden, setNumeroOrden] = useState('')
    const [fecha, setfecha] = useState('')
    const [nombre, setNombre] = useState('')
    const [articulo, setArticulo] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [articulos, setArticulos] = useState([])
    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)
    const [datos, setDatos] = useState([])

    useEffect(() => {
        setNumeroOrden(Math.floor((Math.random(1000) * 10000) + 1000))
        setfecha(moment().format('YYYY-MM-DD HH:mm'))

        const response = async() => {
            const res = await fetch('/articulos')
            const data = await res.json()
            const nuevosDatos = []
        
            for (let i = 0; i <= 10; i++) {
                nuevosDatos.push(data[i])
            }
            setDatos(nuevosDatos)
        }
        response()
    },[]);

    const compra = () => {
        
        const subtotal = calSubTotal()
        const iva = calSubTotal()  * 0.19
        const total = calSubTotal() + ((19/100)*calSubTotal())
        
      fetch("/compra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            numero_orden: numeroOrden,
            fecha: fecha,
            cliente: nombre,
            subtotal: subtotal,
            iva: iva,
            total: total
        }),
      }).then((res) => {
        if (res.status === 200) {
            setExito('compra exitosa')
            window.location.href = "/"
        } else {setExito('Error en el servidor contacta al administrador')}
      });
    
    }

    const addArticulo = (e)=>{
        
        e.preventDefault()
        let continuar = true
        articulos.map(item => {
            if (articulo === item.nombreArticulo) {
                continuar = false
                setError('Articulo ya agregado')
            }
            return false
        })

        if (continuar) {
            if (nombre === '') {
                setError('Ingresa tu nombre')
            } else if (articulo === '') {
                setError('Elige un articulo')
            } else if (cantidad === '') {
                setError('Ingresa la cantidad')
            } else {
    
                datos.map(item => {
                    if (articulo === item.descripcion) {
                        console.log(item.existencia)
                        if (cantidad <= item.existencia) {
                            const nuevoArticulo = {
                                id: uniqid(),
                                nombreArticulo: articulo,
                                cantidad: cantidad,
                                precio: item.precio
                            }
                            setArticulos([...articulos, nuevoArticulo])
                            setError(null)
                        } else {setError('Lo sentimos no hay existencia para la cantidad solicitada')}
                    }
                    return false
                })
            } 
        }   
    }
    
    const eliminarArticulo = (id) => {
        const nuevoArray = articulos.filter(item => item.id !== id)
        setArticulos(nuevoArray)
    }

    const calSubTotal = () => {
        let subTotal = 0
        articulos.map((item) => {
            subTotal += item.precio * item.cantidad
        })
        console.log(subTotal)
        return subTotal
    }

    return (
        <>
            <div className="row mt-3">
                <div className="col">
                    <form id="form" onSubmit={addArticulo} className="form-group">
                        <label htmlFor="numeroOrden">Numero de orden:</label>
                        <input
                            value={numeroOrden}
                            type="text"
                            readOnly="readonly"
                            className="form-control"
                            name="numeroOrden"
                        />
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            onChange={(e)=>{setNombre(e.target.value)}}
                            type="text"
                            pattern="[a-zA-Z ]{2,254}"
                            className="form-control"
                            placeholder="Indruce tu Nombre"
                            name="nombre"
                            id="nombre"
                        />
                        <label htmlFor="fecha">Fecha:</label>
                        <input
                            value={fecha}
                            type="text"
                            readOnly="readonly"
                            className="form-control"
                            name="fecha"
                            id="fecha"
                        />
                        <label htmlFor="articulo">Articulo:</label>
                        <select
                            onChange={(e)=>{setArticulo(e.target.value)}}
                            className="form-control"
                            name="articulo"
                            id="articulo"
                        >
                            <option value="">-----</option>
                            {
                                datos.map((item, index) => (
                                    <option key={index} value={item.descripcion}>{item.descripcion} - precio: {item.precio}</option>
                                ))
                            }
                        </select>
                        <label htmlFor="cantidad">Cantidad:</label>
                        <input
                            onChange={(e)=>{setCantidad(e.target.value)}}
                            type="number"
                            min="1"
                            className="form-control"
                            placeholder="Indruce la cantidad"
                            name="cantidad"
                            id="cantidad"
                        />
                        <input
                            type="submit"
                            className="btn btn-dark btn-block mt-2"
                            value="Agregar"
                        />
                    </form>
                    <button
                        onClick={compra}
                        className="btn btn-success btn-block mt-2"
                        id="finalizar"
                    >
                        Finalizar
                    </button>
                    {
                        error != null ? (
                            <div id="error" className="alert alert-danger mt-2">{error}</div>
                        ):
                        (
                            <div></div>
                        )
                    }
                    {
                        exito != null ? (
                            <div id="error" className="alert alert-success mt-2">{exito}</div>
                        ):
                        (
                            <div></div>
                        )
                    }
                </div>
                <div className="col div-table">
                    <table className="table table-dark">
                    <tbody>
                        <tr>
                            <th>Articulo</th>
                            <th>cantidad</th>
                            <th>subtotal</th>
                            <th>Borrar</th>
                        </tr>
                        {
                            articulos.map((item) => 
                                <tr key={item.id}>
                                    <td>{item.nombreArticulo}</td>
                                    <td>{item.cantidad}</td>
                                    <td>{item.precio * item.cantidad}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger float-right"
                                            id="boton-borrar"
                                            onClick={() => {eliminarArticulo(item.id)}}
                                        >
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                    </table>
                    <table className="table table-dark">
                    <tbody>
                        {
                            articulos.length !== 0 ? (
                                <tr>
                                    <td>Subtotal:</td>
                                    <td>$ {calSubTotal()}</td>
                                </tr>
                            ):
                            (
                                <tr></tr>
                            )
                        }
                        {
                            articulos.length !== 0 ? (
                                <tr>
                                    <td>Total IVA:</td>
                                    <td>$ {calSubTotal() * 0.19}</td>
                                </tr>
                            ):
                            (
                                <tr></tr>
                            )
                        }
                        {
                            articulos.length !== 0 ? (
                                <tr>
                                    <td>Total:</td>
                                    <td>$ {calSubTotal() + ((19/100)*calSubTotal())}</td> 
                                </tr> 
                            ):
                            (
                                <tr></tr>
                            )
                        }
                    </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Realizar_compra
