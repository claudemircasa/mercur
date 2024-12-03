import { Redirect, Route, Switch } from 'wouter'
import { ProtectedRoute } from './protected-route'

export const AppRouter = () => {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      {/* Protected dashboard routes */}
      <ProtectedRoute path="/dashboard" nest>
        <Switch>
          <Route path="/orders">
            <Orders />
            <Route path="/:id" component={OrderDetails} />
          </Route>
          <Route>404, Not Found!</Route>
        </Switch>
      </ProtectedRoute>

      {/* Root redirect */}
      <Route path="/">
        <Redirect to="/dashboard/orders" />
      </Route>

      {/* Fallback 404 */}
      <Route>404, Not Found!</Route>
    </Switch>
  )
}

const Login = () => {
  return <div>Login</div>
}

const Register = () => {
  return <div>Register</div>
}

const Orders = () => {
  return <div>Orders</div>
}

const OrderDetails = () => {
  return <div>OrderDetails</div>
}
