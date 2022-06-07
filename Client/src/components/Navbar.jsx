
import "../Styles/Nav.css"
import { Link} from "react-router-dom" 
export const Nav=()=>{

    return (
        <div className="nav">
           
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup" >signUp</Link>
         
        </div>
    )
}