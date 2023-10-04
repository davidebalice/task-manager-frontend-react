import { useState, useEffect } from 'react'
import Breadcrumb from '../../../components/breadcrumb/index'
import { pay_setting_btn_link } from './btn_link/btn_link'
import Swal from 'sweetalert2'
import Privider_Btn_grp from '../../../components/smsSetting/provider_btn_grp/index'
export default function SmsQ() {

    const title = "SmsQ Setting"
    const brad = [
        {
            name: "home",
        },
        {
            name: title,
        }
    ]
    const [data, setData] = useState([])
    const [rerender, setRerender] = useState(false)
    useEffect(() => {
        console.log("render from bkash setting")
    }, [rerender])

    // type means personal =1 or marchent=2 or agent=3
    const smsqhandle = () => {
        Swal.fire('SmsQ Setting saved', '', 'success')
        setRerender(!rerender)
        
    }
    return (
        <>
            <div className="container-fluid" >
                <Breadcrumb title={title} brad={brad} />
                <Privider_Btn_grp active_btn="smsq" btn_link={pay_setting_btn_link} />
                <div className="row my-3">
                    <div className="col-12">
                        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mt-3">
                                        <label  ><b>Api key</ b></label>
                                        <input type="text" placeholder="Your Api Key" className="form-control" />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <label><b>Body</b></label>
                                        <textarea type="text" placeholder="body" rows="5" className="form-control" ></textarea>

                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <label  ><b>Sender_id</ b></label>
                                        <input type="text" placeholder="sender id" className="form-control" />
                                    </div>
                                </div>
                                <button onClick={() => smsqhandle()} className="btn btn-primary btn-sm my-3">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}