import { useNavigate } from 'react-router-dom';
import { Header, Input, Footer } from '../components';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/saveToken';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    userLogin(username, password);
  }

  async function userLogin(username, password) {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify({
          "email": username,
          "password": password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Incorrect email or password")
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result.message);
      dispatch(setToken(result.body.token));
      navigate("/user");
    } catch (error) {
      console.error(error.message);
    }
  }
  
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <Input
              wrapperClass="input-wrapper"
              title="Username"
              id="username"
              type="text"
            />
            <Input
              wrapperClass="input-wrapper"
              title="Password"
              id="password"
              type="password"
            />
            <Input
              wrapperClass="input-remember"
              title="Remember me"
              id="remember-me"
              type="checkbox"
              position="before"
            />
            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}