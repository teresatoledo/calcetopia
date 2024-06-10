import { Menu } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { useRouter } from 'next/navigation';

function MenuMobile() {
    const router = useRouter();

    return (
        <Popover>
            <PopoverTrigger>
                <Menu />
            </PopoverTrigger>
            <PopoverContent className={`flex flex-col items-center`}>
                <p className="font-bold">Temáticas</p>
                <Separator />
                <Link href="/category/basicos" className="block">
                    Básicos
                </Link>
                <Link href="/category/comida" className="block">
                    Comida
                </Link>
                <Link href="/category/animales" className="block pb-3">
                    Animales
                </Link>
                <Separator />

                <p
                    className="font-bold cursor-pointer pt-3"
                    onClick={() => {
                        router.push('/favourites');
                    }}
                >
                    Mis favoritos
                </p>
            </PopoverContent>
        </Popover>
    );
}

export default MenuMobile;
