import './login.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const handleRegistration = (acc) => {
    return axios.post('http://localhost:5000/admin/login', acc).then(res => {
      alert(res.data.message)
      if (res.data.message === 'Login successfully!') {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        navigate('/admin')
      }
    })
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(handleRegistration)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter Username"
              name='usrrname'
              {...register('username', { required: true })}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name='password'
              {...register('password', { required: true })}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login