import { Link, Outlet } from 'react-router-dom'

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
            <div>header</div>
            <Link to='/'>link to home </Link>
            <Link to='/bbb'>invalid link</Link>
        </div>
     );
}

const Footer = () => {
    return ( 
        <div>
            <div>footer</div>
        </div>
     );
}
 
export default Layout;