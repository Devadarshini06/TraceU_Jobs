import { RouterProvider } from 'react-router-dom';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import { BrandProvider } from 'contexts/BrandContext';
import ScrollTop from 'components/ScrollTop';
import ErrorBoundary from 'components/ErrorBoundary';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ErrorBoundary>
      <BrandProvider>
        <ThemeCustomization>
          <ScrollTop>
            <RouterProvider router={router} />
          </ScrollTop>
        </ThemeCustomization>
      </BrandProvider>
    </ErrorBoundary>
  );
}
