import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

function Page() {
    const faq = [
        {
            id: 1,
            question: '¿Puedo hacer uso del código de descuento "DESCUENTO10?',
            answer: 'Sí, cuando estés en la página del carrito y si tu pedido cumple con las condiciones de la oferta, podrás introducir el código DESCUENTO10 en el recuadro establedio y verás cómo se aplica al total del pedido.',
        },
        {
            id: 2,
            question:
                'Quiero simular el pago de un pedido para poder ver las siguientes páginas, ¿cómo lo hago?',
            answer: 'En la pasarela de pago puedes poner datos ficticios para poder seguir con la siguiente pantalla. La única tarjeta que aceptará será 4242 4242 4242 4242 y en fecha de caducidad puedes poner cualquier fecha posterior a la actual (por ejemplo, 12/34) y el CVV cualquier número de tres dígitos (por ejemplo, 123). Tanto el correo como la dirección y tu nombre pueden ser ficticios ya que no se guardan en ningún lugar. De esta forma podrás realizar tu pedido correctamente.',
        },
        {
            id: 3,
            question: '¿Cómo puedo ponerme en contacto contigo?',
            answer: 'Puedes ponerte en contacto conmigo a través del enlace de LinkedIn que encontrarás en el pie de página o a través de mi correo teresatoledolara@gmail.com.',
        },
    ];
    return (
        <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:min-h-[50vh]">
            <div className="flex items-center justify-center px-6 py-2 gap-6 flex-wrap">
                {faq.map(({ id, question, answer }) => (
                    <Card key={id} className="w-92">
                        <CardHeader className="p-2 text-center">
                            <CardTitle className="sm:text-lg text-wrap">
                                {question}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs sm:text-sm text-wrap">
                            <p>{answer}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Page;
