import { Link } from 'react-router-dom'
export default function Pay_setting_btn_grp({active_btn,btn_link}) {
    return (
        <>
            <div className="mb-2 my-3">
                <Link to={btn_link.bulksmsbd} ><button type="button" className={`btn mt-2 btn-outline-success ${active_btn == "bulksmsbd" ? "active": " " } btn-sm `}>Bulk SMS BD</button></Link>
                <Link to={btn_link.mimsms}><button type="button" className={`btn mt-2 btn-outline-primary ${active_btn == "mimsms" ? "active": " " } btn-sm ms-1`}>MIM SMS</button></Link>
                <Link to={btn_link.smsq} ><button type="button" className={`btn mt-2 btn-outline-info ${active_btn == "smsq" ? "active": " " } btn-sm ms-1`}>SMS_Q</button></Link>
                <Link to={btn_link.alpha} ><button type="button" className={`btn mt-2 btn-outline-warning ${active_btn == "alpha" ? "active": " " } btn-sm ms-1`}>Alpha</button></Link>
                
            </div>
        </>
    )
}