import {useHistory, Link, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const tabConstants = [
  {
    tabId: 'Home',
    direction: '/',
  },
  {
    tabId: 'Cart',
    direction: '/cart',
  },
]

const Header = () => {
  const history = useHistory()
  const location = useLocation()

  const [activeTab, setActiveTab] = useState(tabConstants[0].tabId)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    localStorage.removeItem('cartData')
    history.replace('/login')
  }

  useEffect(() => {
    const currentTab = tabConstants.find(
      tab => tab.direction === location.pathname,
    )
    if (currentTab) {
      setActiveTab(currentTab.tabId)
    }
  }, [location.pathname])

  return (
    <div className="HeaderContainer">
      {/* Desktop Header */}
      <nav className="DesktopNav">
        <Link to="/">
          <img
            className="Logo"
            src="https://res.cloudinary.com/dpiu7mohv/image/upload/v1757246439/6fad20838855997d164dd88d885fad87bdfa3be6_3_sebipw.png"
            alt="website logo"
          />
        </Link>

        <ul className="NavContainer">
          {tabConstants.map(eachTab => (
            <li key={eachTab.tabId}>
              <Link
                className={
                  activeTab === eachTab.tabId ? 'activeNavItems' : 'NavItem'
                }
                to={eachTab.direction}
                onClick={() => setActiveTab(eachTab.tabId)}
              >
                {eachTab.tabId}
              </Link>
            </li>
          ))}

          <li>
            <button
              type="button"
              className="NavButton NavItem"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="MobileNav">
        <Link
          to="/"
          className={`mobile-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          🏠 <span>Home</span>
        </Link>
        <Link
          to="/cart"
          className={`mobile-link ${
            location.pathname === '/cart' ? 'active' : ''
          }`}
        >
          🛒 <span>Cart</span>
        </Link>
        <button type="button" className="mobile-link" onClick={onClickLogout}>
          🚪 <span>Logout</span>
        </button>
      </nav>
    </div>
  )
}

export default Header
