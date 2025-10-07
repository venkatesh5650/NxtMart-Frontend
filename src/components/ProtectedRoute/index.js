// import {Redirect, Route} from 'react-router-dom'
// import Cookies from 'js-cookie'

// const ProtectedRoute = props => {
//   const jwtToken = Cookies.get('jwt_token')

//   if (jwtToken === undefined) {
//     return <Redirect to="/login" />
//   }
//   return <Route {...props} />
// }

// export default ProtectedRoute

import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const jwtToken = Cookies.get('jwt_token')

  return (
    <Route
      {...rest}
      render={props =>
        jwtToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default ProtectedRoute
