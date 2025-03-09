import { Link, Outlet } from 'react-router-dom'
import github_logo from './img/github_logo.png'
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
            <Link to='https://github.com/rorour/VordliHelper/'>
                <img style={{height:"30px"}} src={github_logo} alt="GitHub" />
            </Link>
        </div>
     );
}
 
export default Layout;