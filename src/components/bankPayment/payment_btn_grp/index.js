import { Link } from 'react-router-dom'
export default function Btn_grp({active_btn,btn_link}) {
    return (
        <>
            <div className="mb-2 my-3">
                <Link to={btn_link.payment} ><button type="button" className={`btn mt-2 btn-outline-success ${active_btn == "all" ? "active": " " } btn-sm `}>All</button></Link>
                <Link to={btn_link.pendingPayment}><button type="button" className={`btn mt-2 btn-outline-primary ${active_btn == "pending" ? "active": " " } btn-sm mx-1`}>Pending</button></Link>
                <Link to={btn_link.refundPayment} ><button type="button" className={`btn mt-2 btn-outline-secondary ${active_btn == "refund" ? "active": " " } btn-sm mx-1`}>Refunded</button></Link>
                <Link to={btn_link.trashPayment} ><button type="button" className={`btn mt-2 btn-outline-danger ${active_btn == "trash" ? "active": " " } btn-sm ms-1`}>Trash</button></Link>
                  
            </div>
        </>
    )
}