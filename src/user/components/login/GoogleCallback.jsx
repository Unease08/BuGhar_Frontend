import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      const loadingToastId = toast.loading('Logging in... Please wait.');

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      setTimeout(() => {
        toast.success('Login successful!', {
          id: loadingToastId,
        });
        navigate('/home');
      }, 3000);
    } else {
      console.error('Error: Tokens are missing');
      toast.error('Error: Tokens are missing or invalid. Please try again.');
    }
  }, [navigate]);

  return <div></div>;
};

export default OAuthCallback;
