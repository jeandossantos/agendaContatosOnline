import 'bootstrap/dist/css/bootstrap.min.css';

import './globals.css';
import Protected from '@/components/Protected';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <body>
        <Protected>{children}</Protected>

        <script
          src='https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js'
          integrity='sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r'
          crossOrigin='anonymous'
        ></script>
        <script
          src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js'
          integrity='sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy'
          crossOrigin='anonymous'
        ></script>
      </body>
    </html>
  );
}
