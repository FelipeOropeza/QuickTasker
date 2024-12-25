import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'Login';
        break;
      case '/cadastro':
        document.title = 'Cadastro';
        break;
      case '/about':
        document.title = 'About - QuickTasker';
        break;
      default:
        document.title = 'QuickTasker';
        break;
    }
  }, [location]);

  return null;
}

export default PageTitle;