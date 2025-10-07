import {useState} from 'react'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [failureMsg, setFailureMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const history = useHistory()

  const redirectHome = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/') // tests expect history.replace('/')
  }

  const handleLogin = async event => {
    event.preventDefault()
    // Handle login logic here
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        redirectHome(data.jwt_token)
      } else {
        setFailureMsg(data.error_msg)
      }
    } catch (error) {
      console.log('Something Went Wrong Try Again:', error)
    }
  }

  const JwtToken = Cookies.get('jwt_token')
  if (JwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <div className="LoginCard">
          <img
            className="Logo"
            src="https://res.cloudinary.com/dpiu7mohv/image/upload/v1757246439/6fad20838855997d164dd88d885fad87bdfa3be6_3_sebipw.png"
            alt="login website logo"
          />

          <form className="LoginForm" onSubmit={handleLogin}>
            <div className="AllInputContainer">
              <label className="Label" htmlFor="username">
                Username
              </label>
              <div className="InputContainer">
                <div>
                  <CgProfile size={20} color="gray" />
                </div>

                <input
                  className="LoginInput"
                  type="text"
                  placeholder="rahul"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  id="username"
                />
              </div>

              <label className="Label" htmlFor="username">
                PASSWORD
              </label>
              <br />
              <div className="InputContainer">
                <div>
                  <RiLockPasswordLine size={20} color="gray" />
                </div>
                <input
                  className="LoginInput"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="rahul@2021"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="checkBoxContainer">
                <input
                  id="Password"
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                  className="checkBoxInput"
                />
                <label htmlFor="Password" className="checkBoxInput">
                  Show Password
                </label>
              </div>
              <button className="LoginButton" type="submit">
                Login
              </button>
              {failureMsg && <p className="ErrorMsg">{failureMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
