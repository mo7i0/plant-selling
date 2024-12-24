import { Navbar, Nav, NavItem } from "reactstrap";
import logo1 from "../Images/logo1.png";
import { Link } from "react-router-dom";
import logo2 from "../Images/logo2.png";
import log03 from "../Images/log03.png";


const Header = () => {
 
  return (
    <>
      <Navbar className="header" style={{ backgroundColor: '#9bceba' }}>
  <Nav>
    <NavItem style={{ marginRight: '20px' }}> {/* Add margin for spacing */}
      <Link>
        <img src={logo1} className="logo" alt="Logo" style={{ width: '150px', height: 'auto' }} />
      </Link>
    </NavItem>

    <NavItem style={{ marginRight: '20px' }}> {/* Add margin for spacing */}
      <Link to="/"style={{ color: 'white', fontSize: '18px' }}> {/* Set font color and size */}
        Proudect List
      </Link>
    </NavItem>

    <NavItem style={{ marginRight: '20px' }}> {/* Add margin for spacing */}
      <Link to="add-plant" style={{ color: 'white', fontSize: '18px' }}> {/* Set font color and size */}
        Add Plants
      </Link>
    </NavItem>

    <NavItem style={{ marginRight: '20px' }}> {/* Add margin for spacing */}
      <Link to="/shop" style={{ color: 'white', fontSize: '18px' }} > {/* Set font color and size */}
        Update Plants
      </Link>
    </NavItem>

    <NavItem>
      <Link>
        <img src={logo2} className="logo" alt="Logo" style={{ width: '50px', height: 'auto' }} />
      </Link>
    </NavItem>
    <NavItem >
      <Link>
        <img src={log03} className="logo" alt="Logo" style={{ width: '60px', height: 'auto' }} />
      </Link>
    </NavItem>
    
  </Nav>
</Navbar>
    </>
  );
};

export default Header;
