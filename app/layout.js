import "./globals.css";
import { Inter } from "next/font/google"; // Fonte profissional padrão

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VESTRA | Engenharia & Análise Estrutural",
  description:
    "Plataforma de cálculo estrutural, dimensionamento térmico e confiabilidade de dutos (PIG). Desenvolvido para Inova Industrial e Petrobras.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
