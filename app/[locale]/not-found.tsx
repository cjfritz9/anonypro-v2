'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="prose w-full max-w-[720px] text-center">
      <h2 className="text-4xl">Not Found</h2>
      <p>The page you are looking for does not exist</p>
      <p className="cursor-pointer underline" onClick={() => router.back()}>
        Go Back
      </p>
    </div>
  );
}
