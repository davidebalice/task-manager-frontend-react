import { Link } from 'react-router-dom'
export default function Pay_setting_btn_grp({active_btn,btn_link}) {
    return (
        <>
            <div className="mb-2 my-3">
                <Link to={btn_link.bkash} ><button type="button" className={`btn mt-2 btn-outline-success ${active_btn == "bkash" ? "active": " " } btn-sm `}>bKash</button></Link>
                <Link to={btn_link.rocket}><button type="button" className={`btn mt-2 btn-outline-primary ${active_btn == "rocket" ? "active": " " } btn-sm ms-1`}>Rocket</button></Link>
                <Link to={btn_link.nagad} ><button type="button" className={`btn mt-2 btn-outline-info ${active_btn == "nagad" ? "active": " " } btn-sm ms-1`}>Nagad</button></Link>
                <Link to={btn_link.upay} ><button type="button" className={`btn mt-2 btn-outline-primary ${active_btn == "upay" ? "active": " " } btn-sm ms-1`}>Upay</button></Link>
                <Link to={btn_link.cellfin} ><button type="button" className={`btn mt-2 btn-outline-success ${active_btn == "cellfin" ? "active": " " } btn-sm ms-1`}>Cellfin</button></Link>
                <Link to={btn_link.tap}><button type="button" className={`btn mt-2 btn-outline-primary ${active_btn == "tap" ? "active": " " } btn-sm ms-1`}>Tap</button></Link>
                <Link to={btn_link.okwallet} ><button type="button" className={`btn mt-2 btn-outline-secondary ${active_btn == "okWallet" ? "active": " " } btn-sm ms-1`}>OK Wallet</button></Link>
                <Link to={btn_link.ipay} ><button type="button" className={`btn mt-2 btn-outline-success ${active_btn == "ipay" ? "active": " " } btn-sm ms-1`}>Ipay</button></Link>
                <Link to={btn_link.apimethod} ><button type="button" className={`btn mt-2 btn-outline-danger ${active_btn == "api" ? "active": " " } btn-sm ms-1`}>API Method</button></Link>
                  
            </div>
        </>
    )
}