import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Beehive",
  description: "An application to show some users!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
