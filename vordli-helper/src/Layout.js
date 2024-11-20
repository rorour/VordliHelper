import { Outlet } from 'react-router-dom'

const Layout = () => {
    return ( 
        <div>
            <div>header here</div>
            <Outlet />
            <div>footer here</div>
        </div>
     );
}
 
export default Layout;