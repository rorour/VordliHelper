import { Link, Outlet } from 'react-router-dom'
import vordli_logo from './img/vordli_logo.png'

const Layout = () => {
    return ( 
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
     );
}

const Header = () => {
    return ( 
        <div>
            <div>
                <Link to='/'>
                    <img className="VordliLogo" src={vordli_logo} alt="ВордлиHelper" />
                </Link>
            </div>
        </div>
     );
}

const Footer = () => {
    return ( 
        <div>
        </div>
     );
}
 
export default Layout;