
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const StickySavingsTab = () => {
    const pathname = usePathname();

    // Don't show the tab on the savings page itself
    if (pathname === '/savings') {
        return null;
    }

    return (
        <Link href="/savings">
            <div className="fixed top-1/2 -translate-y-1/2 left-0 z-40 transform transition-transform duration-300 ease-in-out hover:-translate-x-0 -translate-x-[calc(100%-44px)]">
                <div className="flex items-center bg-white border-2 border-l-0 border-preventify-green rounded-r-lg shadow-lg cursor-pointer overflow-hidden">
                    <div className="flex items-center justify-center bg-preventify-green h-28 w-11 flex-shrink-0">
                         <Image src="/logo.png" alt="Preventify Logo" width={24} height={24} className="object-contain" />
                    </div>
                    <div className="py-2 px-4 w-32">
                        <p className="font-bold text-preventify-blue text-sm whitespace-nowrap">One Health</p>
                        <p className="text-preventify-dark-gray text-xs whitespace-nowrap">Member Plan</p>
                        <div className="flex items-center text-preventify-green mt-2">
                            <span className="text-xs font-semibold">Explore</span>
                            <ArrowRight className="h-4 w-4 ml-1" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default StickySavingsTab;
