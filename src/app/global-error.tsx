'use client';
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <html>
      <body>
        <h2>Global Error!</h2>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </body>
    </html>
  );
}
