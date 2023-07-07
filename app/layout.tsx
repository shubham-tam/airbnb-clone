import { Nunito } from "next/font/google";

import "./globals.css";

import { Navbar } from "./components/navbar/Navbar";
import { ClientOnly } from "./components/ClientOnly";
import { ToasterProvider } from "./providers/ToasterProvider";
import { RegisterModal, LoginModal, RentModal } from "./components/modals";
import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
