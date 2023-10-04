import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faDatabase, faCreditCard, faEyeLowVision, faBuildingColumns, faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import CountUp from 'react-countup';
import Swal from 'sweetalert2'

export default function Hero() {

    const [data, setData] = useState([])

    const [rerendarApi, setRerendarApi] = useState(false)

    {/* data receve from store */ }
    useEffect(() => {
        setData({ cron1: "cron 1", cron2: "cron 2" })

        console.log("RENDER FROM STORE TRASH")
    }, [rerendarApi])
    // copy cron
    const copyLink = () => {
        navigator.clipboard.writeText(data.cron1)
        setRerendarApi(!rerendarApi)
        Swal.fire('Copy Cron Url', '', 'success')
    }
    const copyLink2 = () => {

        navigator.clipboard.writeText(data.cron2)
        setRerendarApi(!rerendarApi)
        Swal.fire('copy success', '', 'success')
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-between">
                    <div className="col d-flex align-items-center" style={{ whiteSpace: 'nowrap' }}>
                        <span className="text-xl" style={{ fontSize: '150%' }}>Dashboard </span>
                    </div>
                    <div className="col d-flex justify-content-md-end" style={{ whiteSpace: 'nowrap' }}>
                        <span>Last Cron Job Executed <b className="text-danger">3 Months Ago</b><button type="button" className="btn btn-primary py-0 px-1 ms-1 btn-sm" data-bs-toggle="modal" data-bs-target="#cronModal">
                            Cron
                        </button></span>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-lg-3 col-sm-6 col-12 d-flex">
                        <div className="dash-count">
                            <div className="dash-counts">
                                <h4><CountUp end={100} /></h4>
                                <h5>Payments</h5>
                            </div>
                            <div className="dash-imgs">
                                <FontAwesomeIcon icon={faCreditCard} size="2xl" style={{ color: "rgba(0,0,0,.15)", }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 d-flex">
                        <div className="dash-count das1">
                            <div className="dash-counts">
                                <h4><CountUp end={130} /></h4>

                                <h5>Panding Payments</h5>
                            </div>
                            <div className="dash-imgs">
                                <FontAwesomeIcon icon={faEyeLowVision} size="lg" style={{ color: "rgba(0,0,0,.15)", }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 d-flex">
                        <div className="dash-count das2">
                            <div className="dash-counts">
                                <h4><CountUp end={160} /></h4>

                                <h5>Bank Payments</h5>
                            </div>
                            <div className="dash-imgs">
                                <FontAwesomeIcon icon={faBuildingColumns} size="lg" style={{ color: "rgba(0,0,0,.15)", }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 d-flex">
                        <div className="dash-count das3">
                            <div className="dash-counts">
                                <h4><CountUp end={90} /></h4>

                                <h5>Pending Bank Payments</h5>
                            </div>
                            <div className="dash-imgs">
                                <FontAwesomeIcon icon={faEyeLowVision} size="lg" style={{ color: "rgba(0,0,0,.15)", }} />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-sm-6 col-12 d-flex">
                        <div className="dash-count das1">
                            <div className="dash-counts ">
                                <h4><CountUp end={110} /></h4>

                                <h5>Stored Data</h5>
                            </div>
                            <div className="dash-imgs">
                                <FontAwesomeIcon icon={faDatabase} size="lg" style={{ color: "rgba(0,0,0,.15)", }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-12 d-flex">
                        <div className="dash-count">
                            <div className="dash-counts">
                                <h4><CountUp end={200} /></h4>

                                <h5>Unpaid Invoice</h5>
                            </div>
                            <div className="dash-imgs">
                                <FontAwesomeIcon icon={faFileInvoice} size="lg" style={{ color: "rgba(0,0,0,.15)", }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* billing */}
                <div className="accordion mb-3" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <h3 className=""><i className="fas fa-chart-pie mr-1"></i>Billing</h3>
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse col-12 collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="card">
                                    <div className="card-body" >
                                        <div className="row">
                                            <div className="col-md-3 col-6">
                                                <div className="bill-description-block border-end">
                                                    <h5 className="description-header"><b>৳</b> 0.00 TK</h5>
                                                    <span className="description-text">Today</span>
                                                </div>
                                                {/* <!-- /.bill-description-block --> */}
                                            </div>
                                            {/* <!-- /.col --> */}
                                            <div className="col-md-3 col-6">
                                                <div className="bill-description-block border-end">
                                                    <h5 className="description-header"><b>৳</b> 0.00 TK</h5>
                                                    <span className="description-text">Yesterday</span>
                                                </div>
                                                {/* <!-- /.bill-description-block --> */}
                                            </div>
                                            {/* <!-- /.col --> */}
                                            <div className="col-md-3 col-6">
                                                <div className="bill-description-block border-end">
                                                    <h5 className="description-header"><b>৳</b> 0.00 TK</h5>
                                                    <span className="description-text">Last 7 Days</span>
                                                </div>
                                                {/* <!-- /.bill-description-block --> */}
                                            </div>
                                            {/* <!-- /.col --> */}
                                            <div className="col-md-3 col-6">
                                                <div className="bill-description-block">
                                                    <h5 className="description-header"><b>৳</b> 0.00 TK</h5>
                                                    <span className="description-text">This Month</span>
                                                </div>
                                                {/* <!-- /.bill-description-block --> */}
                                            </div>
                                            {/* <!-- /.col --> */}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3 col-6">
                                                <div className="bill-description-block border-end">
                                                    <h5 className="description-header"><b>৳</b> 0.00 TK</h5>
                                                    <span className="description-text">Last Month</span>
                                                </div>
                                                {/* <!-- /.bill-description-block --> */}
                                            </div>
                                            {/* <!-- /.col --> */}
                                            <div className="col-md-3 col-6">
                                                <div className="bill-description-block border-end">
                                                    <h5 className="description-header"><b>৳</b> 38091.00 TK</h5>
                                                    <span className="description-text">This Year</span>
                                                </div>
                                                {/* <!-- /.bill-description-block --> */}
                                            </div>
                                            {/* <!-- /.col --> */}
                                            <div className="col-md-3 col-6">
                                                <div className="bill-description-block border-end">
                                                    <h5 className="description-header"><b>৳</b> 62048.06 TK</h5>
                                                    <span className="description-text">Last Year</span>
                                                </div>
                                                {/* <!-- /.bill-description-block --> */}
                                            </div>
                                            {/* <!-- /.col --> */}
                                            <div className="col-md-3 col-6">
                                                <div className="bill-description-block">
                                                    <h5 className="description-header"><b>৳</b> 100139.06 TK</h5>
                                                    <span className="description-text">All Time</span>
                                                </div>
                                                {/* <!-- /.bill-description-block --> */}
                                            </div>
                                        </div>
                                        {/* <!-- /.row --> */}
                                    </div>
                                    {/* <!-- /.card-footer --> */}
                                </div>
                                {/* <!-- /.card --> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* end bill */}

                {/*mobail bank pay */}
                <div className="row mb-3">
                    <div className=" col-12 col-md-6 ">
                        <div className="accordion" id="mobaim_bank_pay">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne">
                                        Mobile Banking Payment Statistics
                                    </button>
                                </h2>
                                <div id="collapseOne1" className="accordion-collapse collapse show" data-bs-parent="#mobail_bank_pay">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-12 ">
                                                <div className="card" style={{ backgroundColor: "#CF2771" }}>

                                                    <div className="card-body">
                                                        <div className="card-title">Bkash</div>
                                                        <div className="card-title">0.00 TK</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end mobail bank pay */}

                    {/* bank payment statics */}
                    <div className=" col-12 col-md-6 mt-md-0 mt-3">
                        <div className="accordion" id="bank_pay">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne2" aria-expanded="true" aria-controls="collapseOne">
                                        Banking Payment Statistics
                                    </button>
                                </h2>
                                <div id="collapseOne2" className="accordion-collapse collapse show" data-bs-parent="#bank_pay">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-12 ">
                                                <div className="card bg-warning">

                                                    <div className="card-body">                                                  
                                                        <div className="card-title">Paypal</div>
                                                        <div className="card-title">0.00 TK</div>                                                      
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*end bank payment statics */}

                {/* latest 10 transaction */}
                <div className="accordion mb-2" id="transactions_table">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne3" aria-expanded="true" aria-controls="collapseOne">
                                Last 10 Completed Transactions
                            </button>
                        </h2>
                        <div id="collapseOne3" className="accordion-collapse collapse show" data-bs-parent="#transactions_table">
                            <div className="accordion-body">
                                <div className="table-responsive my-3">
                                    <table className="table align-middle border table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>Invoice Id</th>
                                                <th>Payment Method</th>
                                                <th>Sender Number</th>
                                                <th>Amount</th>
                                                <th>Transaction Id</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>d23</td>
                                                <td>dd3d</td>
                                                <td>3ed3e</td>
                                                <td>ed3ed</td>
                                                <td>e3d3ed</td>
                                                <td>asdsad</td>
                                                <td>edwedwe</td>
                                            </tr>
                                            <tr>
                                                <td>d23</td>
                                                <td>dd3d</td>
                                                <td>3ed3e</td>
                                                <td>ed3ed</td>
                                                <td>e3d3ed</td>
                                                <td>asdsad</td>
                                                <td>edwedwe</td>
                                            </tr>
                                            <tr>
                                                <td>d23</td>
                                                <td>dd3d</td>
                                                <td>3ed3e</td>
                                                <td>ed3ed</td>
                                                <td>e3d3ed</td>
                                                <td>asdsad</td>
                                                <td>edwedwe</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/*end latest 10 transaction */}
                <div className="modal fade" id="cronModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <label>Cron Url</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" defaultValue={data.cron1} aria-label="apigenerate" readOnly />

                                            <span className="input-group-text" onClick={copyLink}><FontAwesomeIcon icon={faCopy} /></span>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label>Cron Quick Job</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" defaultValue={data.cron2} aria-label="apigenerate" readOnly />

                                            <span className="input-group-text" onClick={copyLink2}><FontAwesomeIcon icon={faCopy} /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}