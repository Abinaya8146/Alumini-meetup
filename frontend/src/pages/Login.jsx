import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/authSlice';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || user) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center pt-8">
            <h2 className="text-2xl font-bold text-[#203248] mb-1 tracking-wide">Login to your account</h2>
            <p className="mt-2 text-[#465E77] font-medium text-[15px]">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-[#1f2623] hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-[15px] font-semibold text-[#203248] mb-1.5 ml-1">Email address</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-[14px] w-full px-5 py-4 bg-[#e8f0fe] border-none text-[#203248] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#116466] shadow-inner font-medium text-lg transition-all"
                  placeholder="abi@gmail.com"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="block text-[15px] font-semibold text-[#203248] mb-1.5 ml-1">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-[14px] w-full px-5 py-4 bg-[#e8f0fe] border-none text-[#203248] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#116466] shadow-inner text-xl tracking-widest font-bold transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-[14px] text-white bg-[#203248] hover:bg-[#116466] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#116466] transition-all shadow-md transform active:scale-[0.98]"
              >
                {isLoading ? 'Processing...' : 'Sign In'}
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
