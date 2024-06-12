'use client';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { Briefcase, Github, Linkedin } from 'lucide-react';
import logo from '../public/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Footer() {
    const dataFooter = [
        {
            id: 1,
            name: 'Productos',
            link: 'allproducts',
        },
        {
            id: 2,
            name: 'Sobre nosotros',
            link: 'aboutUs',
        },
        {
            id: 3,
            name: 'Preguntas frecuentes',
            link: 'faq',
        },
    ];
    const router = useRouter();
    return (
        <footer className="mt-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex items-center justify-between flex-col sm:flex-row">
                    <div className="flex gap-5 sm:gap-10 items-center justify-center pl-4">
                        <Image
                            src={logo}
                            alt="Logo de calcetopía"
                            className="w-12 h-12 rounded-full"
                            onClick={() => router.push('/')}
                        />
                        <a
                            className="text-sm text-gray-500  dark:text-gray-400"
                            href="https://www.linkedin.com/in/teresatoledo"
                            target="_blank"
                        >
                            <Linkedin />
                        </a>
                        <a
                            href="https://github.com/teresatoledo"
                            target="_blank"
                            className="text-sm text-gray-500  dark:text-gray-400"
                        >
                            <Github />
                        </a>
                        <a
                            href="https://teresatoledo.vercel.app/"
                            target="_blank"
                            className="text-sm text-gray-500  dark:text-gray-400"
                        >
                            <Briefcase/>
                        </a>
                    </div>
                    <ul className="flex flex-col sm:flex-row flex-wrap items-center mb-6 mt-4 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-40">
                        {dataFooter.map((data) => (
                            <li key={data.id}>
                                <Link
                                    href={data.link}
                                    className="hover:underline me-4 md:me-6"
                                >
                                    {data.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Separator className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block tex-sm text-gray-500 sm:text-center dark_text-gray-400">
                    Teresa Toledo &copy; 2024
                </span>
            </div>
        </footer>
    );
}

export default Footer;
