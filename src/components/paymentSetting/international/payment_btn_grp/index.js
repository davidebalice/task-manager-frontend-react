import { Link } from 'react-router-dom'
export default function pay_setting_btn_grp({active_btn,btn_link}) {
    return (
        <>
            <div className="mb-2 my-3">
                <Link to={btn_link.paypal} ><button type="button" className={`btn mt-2 btn-outline-success ${active_btn == "paypal" ? "active": " " } btn-sm `}>Paypal</button></Link>
                <Link to={btn_link.paypal_personal}><button type="button" className={`btn mt-2 btn-outline-primary ${active_btn == "paypal_personal" ? "active": " " } btn-sm ms-1`}>Paypal Personal</button></Link>
                <Link to={btn_link.stripe} ><button type="button" className={`btn mt-2 btn-outline-info ${active_btn == "stripe" ? "active": " " } btn-sm ms-1`}>Stripe</button></Link>
                <Link to={btn_link.paddle} ><button type="button" className={`btn mt-2 btn-outline-primary ${active_btn == "paddle" ? "active": " " } btn-sm ms-1`}>Paddle</button></Link>
                <Link to={btn_link.perfect_money} ><button type="button" className={`btn mt-2 btn-outline-success ${active_btn == "perfect_money" ? "active": " " } btn-sm ms-1`}>Perfect Money</button></Link>
                <Link to={btn_link.manual} ><button type="button" className={`btn mt-2 btn-outline-danger ${active_btn == "manual" ? "active": " " } btn-sm ms-1`}>API Method</button></Link>
                  
            </div>
        </>
    )
}