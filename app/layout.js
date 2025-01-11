import "./globals.css";

export const metadata = {
  title: "Encurtador de Links",
  description: "Encurtador de Links com Next.js e Node.js",
};

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
