import { Link } from 'react-router-dom'
export default function footer(params) {
    return (
        <>
            
                <footer className=" mt-4 mx-0 p-sm-3  footer">
                    <div className="col-auto "><span ><b>Copyright © 2023.</b> Powered By <Link to="/"> Mobashir</Link></span></div>
                    <div className="col text-end ">Version 3.2.6 </div>
                </footer>
            
        </>
    )
}