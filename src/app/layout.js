import "./globals.css";

export const metadata = {
  title: "Anh Nguyen Food Review",
  description: "Review các quán ăn ngon với Anh Nguyễns",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
