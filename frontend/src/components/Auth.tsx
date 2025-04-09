import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { useState } from 'react';
import { SignUpSchema } from '@devrajm/zedium-common-app';
import Button from './Button';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BACKEND_URL } from '../config';
import AuthHeader from './AuthHeader';

function Auth({ type }: { type: 'signup' | 'signin' }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState<SignUpSchema>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const sendRequest = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        userInput
      );

      const jwt = res.data?.token;
      localStorage.setItem('token', jwt);

      toast.success(res.data?.message);

      setLoading(false);
      navigate('/blogs');
    } catch (e: unknown) {
      setLoading(false);
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data?.message || 'Something went wrong');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-3/4 md:w-1/2">
        <AuthHeader type={type === 'signup' ? 'signup' : 'signin'} />
        <div className="my-5">
          {type === 'signin' ? null : (
            <Input
              label={'First name'}
              placeholder={'Enter your first name'}
              onChange={e =>
                setUserInput({ ...userInput, firstName: e.target.value })
              }
            />
          )}

          {type === 'signin' ? null : (
            <Input
              label={'Last name'}
              placeholder={'Enter your last name'}
              onChange={e =>
                setUserInput({ ...userInput, lastName: e.target.value })
              }
            />
          )}

          {type === 'signin' ? null : (
            <Input
              label={'Username'}
              placeholder={'Enter your username'}
              onChange={e =>
                setUserInput({ ...userInput, username: e.target.value })
              }
            />
          )}
          <Input
            label={'Email'}
            placeholder={'Enter your email'}
            onChange={e =>
              setUserInput({ ...userInput, email: e.target.value })
            }
          />
          <Input
            label={'Password'}
            placeholder={'Enter your password'}
            type={'password'}
            onChange={e =>
              setUserInput({ ...userInput, password: e.target.value })
            }
          />
        </div>
        <div>
          <Toaster />
        </div>
        <div>
          <Button
            label={type === 'signup' ? 'Sign Up' : 'Sign In'}
            onClick={sendRequest}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
