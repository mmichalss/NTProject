import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useEffect } from 'react';

export default function LogoutPage() {
  const navigate = useNavigate();
  const apiClient = useApi();
  useEffect(() => {
    apiClient.logout();
    navigate('/home');
  }, [apiClient, navigate]);
  return null;
}
