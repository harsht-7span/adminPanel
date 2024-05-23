import { useNavigate } from "react-router-dom";
import { Phone } from "../assets/icons/phone";
import logImg from "../assets/imgs/loginImg.jpg";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

function Login() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="hidden md:block h-full bg-black">
        <img
          src={logImg}
          className="h-full w-full opacity-55 object-cover"
          alt="Login"
        />
      </div>
      <div className="px-8 md:px-24 lg:px-56 flex flex-col justify-center items-center">
        <div className="w-full">
          <h2 className="text-center font-semibold text-2xl py-8 md:py-11">
            Welcome to EasyGo!
          </h2>
          <div className="flex items-center border px-2 rounded-xl mb-4">
            <Phone />
            <Input
              placeholder="Phone"
              type="number"
              className="border-0 focus:outline-0 flex-1"
            />
          </div>
          <Button className="w-full my-6 md:my-11" onClick={handleOnClick}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
