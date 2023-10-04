import { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../../components/breadcrumb/index'
import DataTable_Component from '../../components/DataTable/index'

import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faEnvelope, faCopy } from '@fortawesome/free-solid-svg-icons'
import { apidata } from './store/store'
import { Link } from 'react-router-dom'

import {useNavigate} from 'react-router-dom'



export default function PaymentsAll() {

    const title = "Roll Permission"
    const [apistate, setApiState] = useState([])
    const [rerendarApi, setRerendarApi] = useState(false)
    const [apicol, setApiCol] = useState([])
    const navigate=useNavigate()

   
    {/* data table column name */ }

    const brad = [
        {
            name: "home",
        },
        {
            name: "Stored Data",
        }
    ]
   

    {/* data receve from store */ }
    useEffect(() => {
        setApiState(apidata)
       
        console.log('render from store data')
    }, [rerendarApi])
    const rerender = (e) => {
        setRerendarApi(e)
    }


    {/* data receve from api */ }
    useEffect(() => {
        // call api and response data set " setApiData(your res.data) " and column setApiCol( columns )
        setApiState(apidata)
    }, [rerendarApi])

    const designation=()=>{
        Swal.fire("ok",'','success')
    }

    return (
        <>
            <div className="container-fluid" >
                <Breadcrumb title={title} brad={brad} />
                <Link to="/role-user" ><button type="button" className="btn btn-outline-primary  btn-sm ">Roll Create and List</button></Link>
                <Link to="/role-access" ><button type="button" className="btn btn-outline-info active btn-sm ms-1">Role Access</button></Link>
                <div className="row my-3">
                    <div className="col-12">
                        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                            <div className="card-header d-flex justify-content-between border-bottom pb-1">
                                <h4>{title}</h4>
                                <div className="btn btn-info btn-sm" onClick={()=>navigate(-1)}>Back</div>
                            </div>
                            <div className="card-body text-center">
                                <ul>
                                    Check Permission in User
                                    <li><b>Dashboard: </b><input type="checkbox" className="form-ckeck-input"  /></li>
                                    <li><b>Payments: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Bank Paments: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Stored Data: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Manage Invoice: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Brand Setting: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Payment Setting: </b><input type="checkbox" className=""  /></li>
                                    <li><b>System Setting: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Addons: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Roll management: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Theme Market: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Change Password: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Activity logs: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Profile: </b><input type="checkbox" className=""  /></li>
                                    <li><b>General Setting: </b><input type="checkbox" className=""  /></li>
                                    <li><b>Help: </b><input type="checkbox" className=""  /></li>
                                    <li><b>logout: </b><input type="checkbox" className=""  /></li>
                                </ul>
                                <div className="row mt-5 justify-content-center">
                                    <label><b>Designation: </b></label>
                                    <div className="col-sm-8 d-flex col-md-5 col-lg-4">
                                    <input type="text" placeholder="Designation" className="form-control" />
                                    <button className="btn btn-primary ms-2" onClick={designation}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}