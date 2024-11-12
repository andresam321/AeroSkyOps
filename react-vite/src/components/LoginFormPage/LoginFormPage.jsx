import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import "../LoginFormModal/LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});


useEffect(() => {
    if (sessionUser) {
      navigate("/areas");
    }
  }, [sessionUser, navigate]);
  

useEffect(() => {
    if (!showSignupModal) return;



const closeModal = (e) => {
      if (e.target.classList.contains('signup-modal')) {
        setShowSignupModal(false);
      }
    };

    document.addEventListener("click", closeModal);

    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, [showSignupModal]);



const handleDemoUserLogin = async () => {
    const demoEmail = "demo@aa.io";
    const demoPassword = "password";



const serverResponse = await dispatch(
      thunkLogin({
        email: demoEmail,
        password: demoPassword,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/areas");
    }
  };
  

const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/areas");
    }
  };


useEffect(() => {
    const errorsObj = {};

    if (touchedFields.email && (!email || email.length < 7)) {
      errorsObj.email = "Email requires an @ and is required and must be more than 7 characters";
    }
    if (touchedFields.password && (!password || password.length < 8)) {
      errorsObj.password = "Password must be 8 or more characters";
    }

    setErrors(errorsObj);
  }, [email, password, touchedFields]);

  

const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div>
      <div className="login-page">
        <div className={`login-container ${showSignupModal ? "blur-background" : ""}`}>
          <div className="login-forms">
            <div className="login-form">
              <h1>Employee Login</h1>
              <form onSubmit={handleSubmit} className="form">
                <div className="form-control">
                  <label>Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="Email"
                    required
                  />
                  <span className={`form-errors-login ${errors.email ? "visible" : ""}`}>
                    {errors.email || ""}
                  </span>
                </div>
                <div className="form-control">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder="Password"
                    required
                  />
                  <span className={`form-errors-login ${errors.password ? "visible" : ""}`}>
                    {errors.password || ""}
                  </span>
                </div>
                <button disabled={Object.values(errors).length > 0} className="btn login-btn-main" type="submit">
                  Log In
                </button>
                {/* <button
                  type="button"
                  className="btn demo-btn"
                  onClick={handleDemoUserLogin}
                >
                  Login as Demo User
                </button> */}
                {!showSignupModal && (
                  <button
                    type="button"
                    className="btn signup-btn"
                    onClick={() => setShowSignupModal(true)}
                  >
                    Sign Up
                  </button>
                )}
              </form>
            </div>
            {showSignupModal && (
              <div className="signup-form">
                <SignupFormModal />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;