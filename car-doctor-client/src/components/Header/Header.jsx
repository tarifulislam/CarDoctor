import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg"
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Header = () => {
    const{user, logOut} = useContext(AuthContext)
    console.log(user);
    const navlinks = <>
        <NavLink className={({ isActive, isPending})=> isPending ? "pending" : isActive? " text-blue-500  pb-1 border-b-2  border-blue-500 " : " " } to="/">Home</NavLink>
        <NavLink className={({ isActive, isPending})=> isPending ? "pending" : isActive? "text-blue-500  pb-1 border-b-2  border-blue-500 " : " " } to="/about">About</NavLink>
        <NavLink className={({ isActive, isPending})=> isPending ? "pending" : isActive? " text-blue-500  pb-1 border-b-2  border-blue-500 " : " " } to="/cources">Cources</NavLink>
        <NavLink className={({ isActive, isPending})=> isPending ? "pending" : isActive? " text-blue-500  pb-1 border-b-2  border-blue-500 " : " " } to="/blog">Blog</NavLink>
        <NavLink className={({ isActive, isPending})=> isPending ? "pending" : isActive? " text-blue-500  pb-1 border-b-2  border-blue-500 " : " " } to="/bookings">Bookings</NavLink>
    </>


const handleLogout = () =>{
    logOut()
    .then(() =>{
        console.log("logout successfully");
    })
    .catch(err => console.log(err))
}

    return (
        <div>
            <div className="navbar px-0 container mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52  space-x-3">
                  {navlinks}
                </ul>
                </div>
                <img className=" w-14" src={logo} alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-3">
                   {navlinks}
                </ul>
            </div>
            <div className="navbar-end">

                    <Link to='/signin'>
                    <button className="btn">login</button>
                   </Link> 
                   <button onClick={handleLogout} className="btn">log out</button> 
            
    

            </div>
            </div>
        </div>
    );
};

export default Header;