import React from 'react'
import { useParams, Link } from 'react-router-dom'
import ButtonReturn from './ButtonReturn'
import { showInfoTables2, deleteOrden, edit, editTime } from '../controllers'
import GetCheck from './GetCheck'
import AddMore from './AddMore'
import { Container } from 'react-bootstrap'
import back from '../imgs/back.jpg'
import Card from 'react-bootstrap/Card'


const TableStatus = (index) => {
    const { id } = useParams()
    const [dataTable, setDataTable] = React.useState([])
    const [buttonCheck, setButtonCheck] = React.useState(false)
    const [btnAddFood, setAddFood] = React.useState(false)

    React.useEffect(() => {
        const cb = (result) => {
            setDataTable(result)
        }
        const unsubscribe = showInfoTables2(cb, id)
        // return unsubscribe
        return () => {
            console.log('desmontando compornete')
            unsubscribe();
        }
    }, [])

    const prueba = () => {
        setButtonCheck(true)

    }

    const showMenu = () => {
        setAddFood(true)

    }

    const deletes = async (id) => {
        try {
            await deleteOrden(id)
            console.log("borrado")

        }
        catch (error) {
            console.log(error)

        }

    }

    const orderDeliver = async (id) => {
        try {
            const resul = await edit(id, "✔ Orden entregada")

            return resul

        } catch (error) {
            console.log(error)
        }
    }

    return (      
        <Container className="mx-auto d-block ">
            <nav className="d-inline-flex p-2 bd-highlight mt-5 mx-auto d-block">
                <button className="btn btn-danger" onClick={() => showMenu()}>Agregar algo a la orden</button>
                <Link to="/roles/piso" className="btn btn-danger" onClick={() => deletes(id)}> Cerrar Mesa </Link>
                <button className="btn btn-danger" onClick={() => prueba()}>Cuenta</button>
                <ButtonReturn
                ruta="/roles/piso"
                btnStyles="btn btn-warning"
                text="Ver Mesas" />
            </nav>
            {
                <div
                    key={index}>
                    

                    <Card className="bg-dark text-white">
  <Card.Img src={back} alt="Card image" width="34" height="436"/>
  <Card.ImgOverlay>
    <h1 className= "text-dark text-center">Status Mesa: {dataTable.number} </h1>
    <Card.Body className= "text-dark text-center">
    <h4>Cliente: {dataTable.client}</h4>
                    <h4>Meser@: {dataTable.employ}</h4>
                    <h4 className= "text-danger text-center">Estatus: {dataTable.status}</h4>
                    <h4>Tiempo de preparación: {dataTable.timeFinal} min </h4> <br/>
                    <button className="btn btn-success" onClick={() => orderDeliver(id)}>Entregar orden</button>
    </Card.Body>
    
  </Card.ImgOverlay>
</Card>

<br></br><br></br><br></br>

                </div>
               
            }
            
            {
                buttonCheck ? <GetCheck /> : console.log("es falso")
            }

            {
                (btnAddFood) && (<div> <AddMore /></div>)
            }
        </Container>
    )
}

export default TableStatus
