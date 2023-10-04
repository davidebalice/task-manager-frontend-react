import { useState, useEffect, useRef } from 'react'

import Breadcrumb from '../../components/breadcrumb/index'
import DataTable_Component from '../../components/DataTable/index'


import Swal from 'sweetalert2'

import { apidata } from './store/store'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrash,faEnvelope,faCopy} from '@fortawesome/free-solid-svg-icons'

// import toastr from 'reactjs-toastr';
// import 'reactjs-toastr/lib/toast.css';


export default function ManageBrand() {

    const title="Activities"
    const [apistate, setApiState] = useState([])
    {/* data table column name */ }
    const [apicol, setApiCol] = useState([])
    const[rerendarApi,setRerendarApi]=useState(false)


    const brad = [
        {
            name: "home",
        },
        {
            name: title,
        }
    ]
    const columns = [
        {
            name: "Log",
            selector: row => row.log,
            sortable: true
        },
        {
            name: "Date",
            selector: row => row.date,
            sortable: true
        },
        
       
        {
            name: "Action",
            cell: (row) => <> <button onClick={()=>deleteRow(row)} className="btn btn-danger btn-sm ms-1 "><FontAwesomeIcon icon={faTrash} /></button></>,
        }

    ]

    {/* data receve from store */ }
    useEffect(() => {
        // call api
        setApiState(apidata)
        setApiCol(columns)
     
    }, [rerendarApi])

    const deleteRow=(row)=>{
       
        Swal.fire({
            icon:'warning',
            title: 'Are You Want To Take This Action!',       
            showCancelButton: true,
            confirmButtonText: 'Yes',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            setRerendarApi(!rerendarApi)
            if (result.isConfirmed) {
              Swal.fire('success', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }
 

    return (
        <>
          
           
           
            <div className="container-fluid" >
                <Breadcrumb title={title} brad={brad} />
               
                <div className="row my-3">
                    <div className="col-12">
                        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                            <div className="card-header d-flex justify-content-between border-bottom pb-1">
                                <h4>{title}</h4>
                            </div>
                            <div className="card-body">
                               
                                <DataTable_Component search="log" title_btn="Add stored Data" title={title} apidata={apistate} columns={apicol} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}