import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-900">
            <div>
                <Link href="/">
                    <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white mb-7'>
                        movie <mark className='px-2 text-white bg-blue-600 rounded dark:bg-blue-500'>mach</mark>
                    </h1>
                </Link>
            </div>

            <div className="w-full sm:max-w-md px-6 py-4 shadow-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
