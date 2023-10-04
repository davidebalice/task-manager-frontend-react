import { useState, useEffect, useRef, useContext } from 'react'
import Breadcrumb from '../../../components/breadcrumb/index'
import DataTable_Component from '../../../components/DataTable/index'
import { apidata } from './store/store'


export default function Sms_transaction() {

    const title = "Sms Transaction"
    // store api data
    const [apistate, setApiData] = useState([])
    const [apicol, setApiCol] = useState([])
    const [rerendarApi, setRerendarApi] = useState(true)

    {/* data receve from store */ }
    useEffect(() => {
        // call api and response data set " setApiData(your res.data) " and column setApiCol( columns )
        setApiData(apidata)
        setApiCol(columns)
        console.log("rerender from payment ")
    }, [rerendarApi])


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
            name: "Id",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Transaction",
            selector: row => row.transaction,
            sortable: true
        },
        {
            name: "Date",
            selector: row => row.date,
            sortable: true
        },

        {
            name: "Status",
            cell: (row) => <><button className={`btn p-0 px-1 ${row.status.toLowerCase() == "pending" && "btn-primary"} ${row.status.toLowerCase() == "complete" ? "btn-success" : ""}  btn-sm`}  >{row.status}</button></>,
        },
       

    ]

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
                                <DataTable_Component search="transaction" apidata={apistate} columns={apicol} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}