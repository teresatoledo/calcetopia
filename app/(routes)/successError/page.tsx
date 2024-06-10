'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PageSuccess = () => {
    const router = useRouter();

    return (
        <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <div className="flex justify-center md:min-w-[400px]">
                    <Image
                        src="/success.png"
                        alt="Success"
                        width={250}
                        height={500}
                        className="rounded-lg"
                    />
                </div>

                <div>
                    <h1 className="text-3xl">
                        ¡Vaya, parece que ha habido algún error!
                    </h1>
                    <p className="my-3">
                        Lamentamos cualquier inconveniente que este problema te
                        haya podido causar.
                    </p>
                    <p className="my-3">
                        Puedes volver a hacer el pedido y en caso de que el
                        problema persista, dejar pasar unas horas hasta volver a
                        intentarlo o puedes ponerte en contacto con nosotros.
                    </p>
                    <p className="my-3">
                        ¡Gracias por la confianza en nosotros!
                    </p>

                    <Button onClick={() => router.push('/')}>
                        Volver a la tienda
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PageSuccess;
