import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reservas Turismo · San Juan",
  description: "Reservas y precios para cabañas y hosterías del interior de San Juan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
