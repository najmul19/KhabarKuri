import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        console.log(res.user);
      })
      .catch((e) => {
        console.log(e.meassage);
      });
  };
  return (
    <div>
      <div className="p-8">
        <div className="divider"></div>
        <button
         onClick={handleGoogleSignIn}
          className="btn">
          <FaGoogle className="mr-2"></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
