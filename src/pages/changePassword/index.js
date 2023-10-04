import { useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import Breadcrumb from '../../components/breadcrumb/index'
import Logo from '../../assets/photo/admin.jpg'
import {useNavigate} from 'react-router-dom'

export default function Add_Faq() {
    const title = "Change Password"
    const navigate=useNavigate()
    const[rerendarApi,setRerendarApi]=useState(false)

    const brad = [
        {
            name: "home",
        },
        {
            name: title,
        }
    ]
  

    {/* data receve from store */ }
    useEffect(() => {
    //    call api
        console.log("render from invoice")
    }, [rerendarApi])


    const changePsw=()=>{
        setRerendarApi(!rerendarApi)         
        Swal.fire('Password Change Success', '', 'success')  
    }
    return (
        <>

            <div  className="container-fluid">
                <Breadcrumb title={title} brad={brad} />

                <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                    <div className="card-header d-flex justify-content-between border-bottom pb-1">
                        <div className="">{title} </div>
                        <div className="btn btn-info btn-sm" onClick={()=>navigate(-1)}>Back</div>
                        
                    </div>
                    <div className="card-body">
                        <div  className="row ">
                           
                            <div  className="col-md-6 mt-3">
                                <label for="brand"><b>Old Password</ b></label>
                                <input type="text" placeholder="Enter Old password" className="form-control" />
                            </div>
                            <div  className="col-md-6 mt-3">
                                <label for="brand"><b>New Password</ b></label>
                                <input type="text" placeholder="Enter New Password" className="form-control" />
                            </div>
                            
                            <div  className="col-12 mt-3">
                                <label for="brand"><b>Confirm New Password</ b></label>
                                <input type="text" placeholder="Enter Confirm New Password" className="form-control" />

                            </div>
                           
                        </div>
                        <button onClick={changePsw} className="btn btn-primary btn-sm mt-4">Change Password</button>
                    </div>
                </div>
            </div>

        </>
    )
}