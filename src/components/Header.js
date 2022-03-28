import {NavLink} from 'react-router-dom'; /* чтобы активные ссылки подсвечивались */

function Header() {
    return (
      <div className="container-sm position-relative mt-5 mb-2">
        <nav className="position-absolute top-100 start-50 translate-middle">
          <ul>
            <li><NavLink exact className="" to="/">Home</NavLink></li>
          
            <li><NavLink className="" to="/note">Note</NavLink></li>
          
            <li ><NavLink className="" to="/create">Create</NavLink></li>
         
            <li><NavLink exact className="" to="/about">About</NavLink></li>
          </ul>
        </nav>
      </div>
    );
  }
  
  export default Header;
  