import { useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/breadcrumb/index'
export default function EditRoll() {
    const title = "Update Roll"
    const navigate = useNavigate()
    const [rerendarApi, setRerendarApi] = useState(false)
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
        console.log("render from roll")
    }, [rerendarApi])

    const edit_roll = () => {
        Swal.fire({
            icon: 'warning',
            title: 'You wont be able to revert this!',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            setRerendarApi(!rerendarApi)
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
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
                        <div className="btn btn-info btn-sm" onClick={() => navigate(-1)}>Back</div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mt-3">
                                <label><b>Name</b></label>
                                <input type="text" className="form-control" placeholder="Enter User Name" />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label><b>Phone Number</b></label>
                                <input type="text" className="form-control" placeholder="Enter User Phone Number" />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label><b>Email</b></label>
                                <input type="text" className="form-control" placeholder="Enter User Email" />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label><b>Role Type</b></label>
                                <select className="form-control">
                                    <option value="user">User</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>
                            <div className="col-md-6 mt-3">
                                <label><b>Old Password</b></label>
                                <input type="text" className="form-control" placeholder="Enter User Old Password" />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label><b>Password</b></label>
                                <input type="text" className="form-control" placeholder="Enter User New Password" />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label><b>Status</b></label>
                                <select className="form-control">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                        </div>
                        <button onClick={edit_roll} className="btn btn-primary btn-sm mt-3">Update Roll</button>
                    </div>
                </div>
            </div>

        </>
    )
}