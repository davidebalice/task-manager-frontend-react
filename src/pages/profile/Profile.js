import { useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import Breadcrumb from '../../components/breadcrumb/index'
import ProfileImg from '../../assets/photo/admin.jpg'
export default function ProfileSetting() {
    const title = "Profile Setting"
    const brad = [
        {
            name: "home",
        },
        {
            name: title,
        }
    ]


    const [rerendarApi, setRerendarApi] = useState(false)

    {/* data receve from store */ }
    useEffect(() => {

        //    call api
        console.log("RENDER FROM STORE TRASH")
    }, [rerendarApi])


    const updatProfile = () => {

        Swal.fire({
            icon: 'info',
            title: 'Are You Want to take this action',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setRerendarApi(!rerendarApi)

                Swal.fire('Update success', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    return (
        <>

            <div className="container-fluid">
                <Breadcrumb title={title} brad={brad} />
                <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                    <div className="card-header d-flex justify-content-between border-bottom pb-1">
                        <div className="">{title} </div>
                    </div>
                    <div className="card-body">
                        <div className="row ">

                            <div className="col-md-6 mt-3">
                                <label ><b>Full Name</ b></label>
                                <input type="text" placeholder="Enter Your Name" className="form-control" />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label ><b>User Name</ b></label>
                                <input type="text" placeholder="Email User Name" className="form-control" />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label ><b>Email</ b></label>
                                <input type="text" placeholder="Enter Your Email" className="form-control" />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label ><b>Custom Login Link</ b></label>
                                <input type="text" placeholder="Email Custom Login Link" className="form-control" />
                            </div>
                            <div className="mt-3">
                                <p className="mb-0"><b>Upload Profile Picture</b></p>
                                <img src={ProfileImg} style={{ width: 150, height: 150 }} />
                            </div>
                            <div className="col-md-6 mt-3">
                                <input type="file" className="form-control" />
                            </div>

                        </div>
                        <button onClick={updatProfile} className="btn btn-primary btn-sm mt-3">Update</button>
                    </div>
                </div>
            </div>

        </>
    )
}