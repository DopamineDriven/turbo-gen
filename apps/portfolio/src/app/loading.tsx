import { LoadingDots } from "@/ui/loading/Dots";

export default function Loading() {
  return (
    <div className='mx-auto my-auto grid h-screen w-screen grid-cols-1 justify-center bg-white align-middle'>
      <LoadingDots color={""} />
    </div>
  );
}
