import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./assets/css/globals.css";
import "./assets/libs/devicon/devicon.min.css";

import Image from "next/image";
import Script from "next/script";

const montserrat_thin = Montserrat({
  weight: ["100"],
  style: ["normal"],
  subsets: ["latin"],
});
const montserrat_regular = Montserrat({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});
const montserrat_semiblack = Montserrat({
  weight: ["700"],
  style: ["normal"],
  subsets: ["latin"],
});
const montserrat_black = Montserrat({
  weight: ["900"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={montserrat_regular.className}>
      <body className="bg-mateo-gradient text-white">
        <header className="skewY-0 z-[1000] relative">
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Mateo</span>
              <Image
                className="h-8 w-auto"
                width={0}
                height={0}
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <div className="flex lg:hidden">
              <button
                type="button"
                id="mobileMenuButton"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              <a
                href="/#a-propos"
                className="text-xl font-bold leading-6 text-white"
              >
                A Propos
              </a>
              <a
                href="/portfolio"
                className="text-xl font-bold leading-6 text-white"
              >
                Portfolio
              </a>
            </div>
          </nav>
          {/* Mobile menu, show/hide based on menu open state. */}
          <div
            id="mobileMenu"
            className="hidden lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Background backdrop, show/hide based on slide-over state. */}
            <div className="fixed inset-0 z-10"></div>
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 h-[100vh]">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Mateo</span>
                  <Image
                    className="h-8 w-auto"
                    width={0}
                    height={0}
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  id="closeMobileMenuButton"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <a
                      href="/#a-propos"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      A Propos
                    </a>
                    <a
                      href="/portfolio"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Portfolio
                    </a>
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Discord
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {children}

        <Script src="/assets/js/main.js?v=2"></Script>
      </body>
    </html>
  );
}
