import React, {useState, useEffect} from 'react'

const Total_compra = () => {

    const [datos, setDatos] = useState([])
    const [totales, setTotales] = useState(null)

    useEffect(() => {
        const peticion = async() => {
            const res = await fetch('/compras')
            const data = await res.json()
            setDatos(data)

            const respuesta = await fetch('/totales')
            const total = await respuesta.json()
            setTotales(total)
        }
        peticion()   
    }, []);

    return (
        <>
            <div className="col" id="div-compras">
                <h1 className="h1-compras">INFORME DE COMPRAS</h1>
                <table className="table table-dark mt-5" id="table-compras">
                <tbody>
                    <tr>
                        <th>Numero de orden</th>
                        <th>Fecha compra</th>
                        <th>Cliente</th>
                        <th>Subtotal</th>
                        <th>IVA</th>
                        <th>Total</th>
                    </tr>
                    {
                        datos.map((item, index) => 
                            <tr key={index}>
                                <td>{item.numero_orden}</td>
                                <td>{item.fecha}</td>
                                <td>{item.cliente}</td>
                                <td>{item.subtotal}</td>
                                <td>{item.iva}</td>
                                <td>{item.total}</td>
                            </tr>
                        )
                    }
                </tbody>
                </table>
                {
                    totales !== null ? (
                        <table className="table table-dark mt-5" id="table-total">
                            <tbody>
                            <tr>
                                <td>Total subtotal :</td>
                                <td>$ {totales[0].total_subtotal}</td>
                            </tr>
                            <tr>
                                <td>Total iva :</td>
                                <td>$ {totales[0].total_iva}</td>
                            </tr>
                            <tr>
                                <td>Total compras :</td>
                                <td>$ {totales[0].total_compras}</td>
                            </tr>
                            </tbody>
                        </table>
                    ) 
                    :
                    (
                        <span></span>
                    )
                }
            </div>
        </>
    )
}

export default Total_compra
