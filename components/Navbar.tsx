'use client';
import { BaggageClaim, Heart, ShoppingCart, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MenuList from './MenuList';
import MenuMobile from './MenuMobile';
import { ToggleTheme } from './ToggleTheme';
import { useCart } from '@/hooks/useCart';
import logo from '../public/logo.png';
import Image from 'next/image';
import { useFavouriteProducts } from '@/hooks/useFavourites';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const cart = useCart();
    const { favouriteItems } = useFavouriteProducts();
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setTotalQuantity(cart.totalQuantity());
    }, [cart]);

    if (!isClient) {
        return null; // Evita la renderización en el servidor
    }

    return (
        <div className='flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl'>
            <div className='flex gap-5 justify-center items-center'>
                <Image src={logo} alt='Logo de Calcetopía' className='w-16 h-16 rounded-full' onClick={()=> router.push('/')} />
                <h1 className='text-3xl sm:text-xl max-[720px]:hidden' onClick={()=> router.push('/')}>Calcetopía</h1>
            </div>
            <div className='items-center justify-between hidden sm:flex'>
                <MenuList/>
            </div>
            <div className='flex sm:hidden'>
                <MenuMobile/>
            </div>
            <div className='flex items-center justify-between gap-2 sm:gap-7'>
                {totalQuantity === 0 ? (
                    <div>
                        <ShoppingCart
                            strokeWidth={1}
                            className="cursor-pointer"
                            onClick={() => router.push('/cart')}
                        />
                    </div>
                ) : (
                    <div className='flex gap-1' onClick={()=> router.push('/cart')}>
                        <BaggageClaim strokeWidth={1} className='cursor-pointer'/>
                        <span>{totalQuantity}</span>
                    </div>
                )}
                <Heart
                    strokeWidth="1"
                    className={`cursor-pointer max-[720px]:hidden ${
                        favouriteItems.length > 0 ? 'fill-black dark:fill-white' : ''
                    }`}
                    onClick={() => router.push('/favourites')}
                />
                <ToggleTheme />
            </div>
        </div>
    );
}
