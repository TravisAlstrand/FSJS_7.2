import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="main-nav">
        <ul>
          <li><NavLink to="/guitar">Guitar</NavLink></li>
          <li><NavLink to="/drums">Drums</NavLink></li>
          <li><NavLink to="/piano">Piano</NavLink></li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;