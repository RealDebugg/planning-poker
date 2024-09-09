import "@/styles/globals.css";

import {
  debuggLog,
  isClient,
  isProd
} from '@/lib/constants'
import {Toaster} from "@/components/ui/toaster";

if (isProd && isClient) {
  console.log(debuggLog)
}

export default function App({ Component, pageProps }) {
  return (
      <>
        <Component {...pageProps} />
        <Toaster />
      </>
  );
}
