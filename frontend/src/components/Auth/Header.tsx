import { Link } from 'react-router-dom';

function AuthHeader({ type }: { type: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold">
        {type == 'signup' ? 'Create an account' : 'Login to your account'}
      </div>
      <div className="text-slate-500 mt-2">
        {type === 'signup'
          ? ' Already have an account? '
          : "Don't have any account? "}

        <Link
          to={type === 'signup' ? '/signin' : '/signup'}
          className="underline hover:text-black"
        >
          {type === 'signup' ? 'Login' : 'Signup'}
        </Link>
      </div>
    </div>
  );
}

export default AuthHeader;
