// ** React Imports
import { Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// ** Redux Imports
import { store } from './redux/store'
import { Provider } from 'react-redux'

// ** Intl, CASL & ThemeColors Context
import ability from './configs/acl/ability'
import { AbilityContext } from './utility/context/Can'
import { ThemeContext } from './utility/context/ThemeColors'

// ** ThemeConfig
import themeConfig from './configs/themeConfig'

// ** Toast
import { Toaster } from 'react-hot-toast'

// ** i18n
import './configs/i18n'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** Fake Database
import './@fake-db'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Hot Toast Styles
import '@styles/react/libs/react-hot-toasts/react-hot-toasts.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'
import './App.css'

// ** Service Worker
import * as serviceWorker from './serviceWorker'

// ** Lazy load app
const LazyApp = lazy(() => import('./App'))

import API_URL from './config'

// import LogRocket from 'logrocket';
// LogRocket.init('my6jfo/hotelmate');
// LogRocket.init('my6jfo/testhotel');


// Response of fetch
const handleResponse = async (response) => {

  // if (response.status === 401) {
  //   fetchx(API_URL + "/logout", {
  //     method: "POST",
  //     headers: { 'Content-Type': 'application/json' },
  //   }).then((res) => {
  //     if (res.status == 200) {
  //       window.location.href = '/login'
  //       window.location.reload();
  //       return;
  //     }
  //     else {
  //       console.log("check the logout functions")
  //     }
  //   })
  // } else {
  const contentType = response.headers.get('content-type');

  if (contentType) {
    if (contentType.includes('application/json')) {
      try {
        const clonedResponse = response.clone(); // Clone the response
        return await clonedResponse.json(); // Parse the cloned response
      } catch (error) {
        throw new Error('Error parsing JSON');
      }
    } else if (contentType.includes('text')) {
      return await response.text(); // Parse as text
    }
    // else if (contentType.includes('multipart')) {
    //   // Handle multipart content-type
    //   const blob = await response.blob();
    //   return blob;
    // } else if (contentType.includes('image')) {
    //   // Handle image content-type
    //   const blob = await response.blob();
    //   return blob;
    // } 
    else {
      return response; // Return the raw response for other content types
    }
  } else {
    throw new Error('Content-Type not found in response headers');
  }
  // }
};


// Fetchx definition
const fetchx = async (url, options = {}) => {
  try {

    // console.log('fetchx called from:', new Error().stack);

    // Extract custom headers from options or initialize an empty object
    const { headers: customHeaders = {} } = options;

    // Add your custom header here
    customHeaders['fkey'] = ['KejkLaHqOdsZUH0sQ2@$0Nf6'];

    // Merge the custom headers with the existing headers
    const mergedOptions = {
      ...options,
      headers: {
        ...options.headers,
        ...customHeaders,
      },
    };

    const response = await fetch(url, mergedOptions);
    response.parsedBody = await handleResponse(response); // Store parsed body in the response object
    return response;
  } catch (error) {
    console.error('Error in fetchx:', error);
    throw error;
  }
};


// Assign fetchx as a property of the global window object
if (typeof window !== 'undefined') {
  window.fetchx = fetchx;
}

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={ability}>
          <ThemeContext>
            <LazyApp />
            <Toaster position={themeConfig.layout.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
          </ThemeContext>
        </AbilityContext.Provider>
      </Suspense>
    </Provider>
  </BrowserRouter>
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()