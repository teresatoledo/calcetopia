import React from 'react';
import { buttonVariants } from './ui/button';
import Link from 'next/link';

function BannerDiscount() {
    return (
        <div className="p-5 sm:p-20 text-center">
            <h2 className="uppercase font-black text-2xl text-primary">
                Consigue hasta un 10% de descuento
            </h2>
            <h3 className="mt-3 font-semibold">
                10% al gastar 50€ o más con el código DESCUENTO10
            </h3>
            <div className="max-w-md mx-auto sm: flex justify-center gap-8 mt-5">
                <Link href="allproducts" className={buttonVariants()}>
                    Comprar
                </Link>
            </div>
        </div>
    );
}

export default BannerDiscount;
