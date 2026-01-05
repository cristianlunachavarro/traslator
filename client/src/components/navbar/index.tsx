import { Link, useNavigate } from "react-router-dom";
import {
  handleLogout as handleLogoutStore,
  useUserStore,
} from "../../store/user";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await handleLogoutStore();
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div>
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign-in</Link>
        </>
      ) : (
        <button onClick={handleLogout}>logout</button>
      )}
    </div>
  );
};

export default Navbar;
