
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home page immediately
    navigate('/', { replace: true });
  }, [navigate]);
  
  return (
    <div>
      <Helmet>
        <title>Loveable Interior Design - Premium Services from 15k</title>
        <meta name="description" content="Premium interior design services by Loveable, founded in 2012. Over 600 projects across Tier 1 cities, starting at 15k." />
      </Helmet>
      <div className="flex items-center justify-center h-screen">
        <p>Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
