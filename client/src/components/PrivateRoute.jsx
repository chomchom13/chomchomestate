import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />; // if there exists a currentUser , then this will direct the user to the Outlet ( means the child tag inside the <PrivateRoute /> tag in App.jsx file (which in this case is <Profile />))
}
