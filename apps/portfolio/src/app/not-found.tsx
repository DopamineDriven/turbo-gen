import Link from "next/link";

export default function NotFound() {
  return (
    <div className='bg-white font-basis-grotesque-pro-medium text-2xl tracking-tight text-gray-800'>
      <p>{"Could not find requested resource"}</p>
      <p>
        {"Return "}
        <Link href='/'>{"Home"}</Link>
      </p>
    </div>
  );
}
