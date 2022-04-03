import '../styles/globals.css';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useAuthStore } from "@auth/store/authStore";
import type { NextComponentType } from "next";
import type { AppProps } from 'next/app';


type PFA = AppProps & {
  Component: NextComponentType & {
    auth?: boolean;
  };
};

function PFA_App({ Component, pageProps: { session, ...pageProps } }: PFA) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {
        Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )
      }
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Auth({ children }: { children: JSX.Element }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const pfaToken = useAuthStore((state) => state.token);

  useEffect(() => {
    authCheck();
  }, []);

  const authCheck = () => {
    if (pfaToken) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      router.push("/login");
    }
  };

  return (authorized && children) || <div>Redirecting ...</div>;
}

export default PFA_App;
