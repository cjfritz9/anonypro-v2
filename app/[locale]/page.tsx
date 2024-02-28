import SearchBar from '@/components/SearchBar/SearchBar';
import ServiceSelector from '@/components/ServiceSelector/ServiceSelector';

export default function Home() {
  return (
    <main className='mt-12 lg:mt-24 w-full max-w-[668px] flex min-h-[6000px] flex-col items-center'>
      <div className='flex flex-col gap-10 w-full max-w-[576px] items-center'>
        <div className='max-w-[576px] text-center gap-10 flex flex-col'>
          <h1 className='text-[32px] leading-[44px] lg:text-[56px] lg:leading-[66px]'>
            Anonymous Instagram story viewer
          </h1>
          <h2>
            View & download Instagram stories anonymously
            <br />
            (without anyone knowing)
          </h2>
          <SearchBar />
        </div>
      </div>
      <div className='mt-16 w-full'>
        <ServiceSelector />
      </div>
    </main>
  );
}
