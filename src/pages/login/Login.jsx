import './login.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosClient from '../../components/API/axiosClient';

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const handleRegistration = (acc) => {
    return axiosClient.post('/admin/login', acc).then(res => {
      console.log(res)

      alert(res.message)
      if (res.message === 'Login successfully!') {
        localStorage.setItem('userId', JSON.stringify(res.userId))
        localStorage.setItem('role', JSON.stringify(res.role))
        localStorage.setItem('token', JSON.stringify(res.token))
        window.location.reload(false);
      }
    })
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(handleRegistration)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter Email"
              name='email'
              {...register('email', { required: true })}
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