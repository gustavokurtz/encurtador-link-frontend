import "./globals.css";

export const metadata = {
  title: "Encurtador de Links",
  description: "Encurtador de Links com Next.js e Node.js",
};

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
