"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // global-error must include html and body tags
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
        <details className='[&_details[open]]:p-2 [&_details[open]_summary]:mb-2 [&_details[open]_summary]:border-b [&_details[open]_summary]:border-solid [&_details[open]_summary]:border-[#aaa]'>
          <summary className='-my-2 mx-0 p-2 font-basis-grotesque-pro-medium'>
            Details
          </summary>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </details>
      </body>
    </html>
  );
}
