import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from '@mui/icons-material';

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="navbar bg-customBlueDarkest flex justify-between border border-b-customBlueDarker p-4">
        <div className="flex items-center">
          <a className="btn btn-ghost text-3xl text-customBlueLight ml-4 sm:ml-16">BlaZe</a>
        </div>
        <div className="hidden sm:flex items-center">
          <ul className="flex flex-row  rounded-box z-[1] p-2 ">
            <li className="mr-2 text-customBlueLight hover:text-customBlueDarkest hover:bg-customBlueLight hover:p-2 hover:rounded"><Link to="/">Home</Link></li>
            <li className="mr-2 text-customBlueLight hover:text-customBlueDarkest hover:bg-customBlueLight hover:p-2 hover:rounded"><Link to="/cars">Cars</Link></li>
            <li className="mr-2 text-customBlueLight hover:text-customBlueDarkest hover:bg-customBlueLight hover:p-2 hover:rounded"><Link to="/contact">Contact</Link></li>
            {auth.user && (
              <li className="mr-2 text-customBlueLight hover:text-customBlueDarkest hover:bg-customBlueLight hover:p-2 hover:rounded"><Link to={auth.user.role === 'admin' ? '/admindash' : '/userdash'}>Dashboard</Link></li>
            )}
          </ul>
        </div>
        <div className="hidden sm:flex flex-row items-center">
          <ul className="flex flex-row">
            <li className="mr-2 bg-customBlueLight text-customBlueDarkest p-2 rounded hover:bg-customBlueDarkest hover:text-customBlueLight"><Link to="/register">Create account</Link></li>
            <li className="mr-2 bg-customBlueDarkest text-customBlueLight p-2 rounded border border-customBlueLight hover:bg-customBlueLight hover:text-customBlueDarkest"><Link to="/login">Sign in</Link></li>
          </ul>
        </div>
        <div className="flex sm:hidden items-center">
          <button onClick={toggleMenu} className="text-customBlueLight focus:outline-none">
            <Menu />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden bg-customBlueDarkest p-4 border-t border-customBlueDarker">
          <ul className="flex flex-col">
            <li className="mb-2 text-customBlueLight"><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li className="mb-2 text-customBlueLight"><Link to="/cars" onClick={toggleMenu}>Cars</Link></li>
            <li className="mb-2 text-customBlueLight"><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
            {auth.user && (
              <li className="mb-2 text-customBlueLight"><Link to={auth.user.role === 'admin' ? '/admindash' : '/userdash'} onClick={toggleMenu}>Dashboard</Link></li>
            )}
            <li className="mb-2 bg-customBlueLight text-customBlueDarkest p-2 rounded"><Link to="/register" onClick={toggleMenu}>Create account</Link></li>
            <li className="mb-2 bg-customBlueDarkest text-customBlueLight p-2 rounded border border-customBlueLight"><Link to="/login" onClick={toggleMenu}>Sign in</Link></li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
