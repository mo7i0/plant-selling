import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Features/UserSlice";  // Assuming logout action for both user and manager
import { Navbar, Nav, NavItem } from "reactstrap"; 
import logo1 from "../Images/logo1.png";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import logo2 from "../Images/logo2.png";
import log03 from "../Images/log03.png";

const Header = () => {
  const { isLogin, user } = useSelector((state) => state.users);
  const { isLogin: isManagerLogin, manager } = useSelector((state) => state.managers);
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLogout = () => {
    if (isManagerLogin) {
      dispatch(logout());  // Dispatch manager logout action
    } else {
      dispatch(logout());  // Dispatch user logout action
    }

    // Redirect to home or login page after logout
    navigate('/');  // Redirect to home or any other page
  };

  return (
    <>
      <Navbar className="header" style={{ backgroundColor: '#9bceba' }}>
        <Nav>
          <NavItem style={{ marginRight: '20px' }}>
            <Link>
              <img src={logo1} className="logo" alt="Logo" style={{ width: '150px', height: 'auto' }} />
            </Link>
          </NavItem>

          {/* Common Links */}
          <NavItem style={{ marginRight: '20px' }}>
            <Link to="/" style={{ color: 'white', fontSize: '18px' }}>
              Home
            </Link>
          </NavItem>
          <NavItem style={{ marginRight: '20px' }}>
            <Link to="/shop" style={{ color: 'white', fontSize: '18px' }}>
              Shop
            </Link>
          </NavItem>

          {/* Show Manager-Specific Links */}
          {isManagerLogin ? (
            <>
            <NavItem style={{ marginRight: '20px' }}>
            <Link to="/list" style={{ color: 'white', fontSize: '18px' }}>
              Update Plant
            </Link>
            </NavItem>

              <NavItem style={{ marginRight: '20px' }}>
                <Link to="/addPlant" style={{ color: 'white', fontSize: '18px' }}>
                  Add Plants
                </Link>
              </NavItem>
              <NavItem style={{ marginRight: '20px' }}>
                <span style={{ color: 'white', fontSize: '18px' }}>
                  Welcome, {manager?.name || "Manager"}
                </span>
              </NavItem>
              <NavItem style={{ marginRight: '20px' }}>
              <button
                      onClick={handleLogout}
                      style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: 'none',
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                    >
                      Logout
                    </button>
              </NavItem>
            </>
          ) : (
            // Show User-Specific Links
            <>
              <NavItem>
                <Link to="/cart" style={{ color: 'white', fontSize: '18px' }}>
                  <img src={logo2} className="logo" alt="Cart" style={{ width: '50px', height: 'auto' }} />
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/profile">
                  <img src={log03} className="logo" alt="User Icon" style={{ width: '60px', height: 'auto' }} />
                </Link>
              </NavItem>
              {isLogin ? (
                <>
                  <NavItem style={{ marginRight: '20px' }}>
                    <span style={{ color: 'white', fontSize: '18px' }}>
                      Hello, {user?.name || "User"}
                    </span>
                  </NavItem>
                  <NavItem style={{ marginRight: '20px' }}>
                    <button
                      onClick={handleLogout}
                      style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: 'none',
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                    >
                      Logout
                    </button>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem style={{ marginRight: '20px' }}>
                    <Link to="/login" style={{ color: 'white', fontSize: '18px' }}>
                      Login as User
                    </Link>
                  </NavItem>
                  <NavItem style={{ marginRight: '20px' }}>
                    <Link to="/loginM" style={{ color: 'white', fontSize: '18px' }}>
                      Login as Manager
                    </Link>
                  </NavItem>
                </>
              )}
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
