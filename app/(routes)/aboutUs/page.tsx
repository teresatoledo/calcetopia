"use client"
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter() 
  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:min-h-[50vh] flex flex-col items-center text-center">
      <h2 className="text-xl pb-2">¡Hola! Soy <span className="font-bold">Teresa Toledo :)</span></h2>
      <p className="pb-2">Soy  <span className="font-bold">junior full-stack developer</span> y, como es obvio, una apasionada de los calcetines divertidos.</p>
      <p>Calcetopía es una idea que surge a raíz de querer unir estas dos pasiones: los calcetines y la programación.</p>
      <p  className="pb-2">Para la primera parte, he tomado las fotografías de todos los calcetines con los diseños más bonitos que he encontrado en la página oficial de Jimmy Lion y los derechos de dichas imágenes le corresponde a Jimmy Lion. Yo solo me he limitado a usarlos con un fin meramente de práctica.</p>
      <p className="pb-2">Si quieres saber un poco más sobre qué tecnologías me han permitido poder llevar a cabo este proyecto, puedes acceder al repositorio de <span className="font-bold">GitHub</span> mediante <a href="https://github.com/teresatoledo/calcetopia" target="_blank" className="underline font-bold cursor-pointer">este enlace</a>, ya que ahí he detallado en profundidad todo lo que he utilizado.</p>
      <p>Además, si te preguntas todas las cosas que puedes hacer dentro de Calcetopía, en la página de <span className="underline font-bold cursor-pointer" onClick={()=> router.push('/faq')}>Preguntas Frecuentes</span> he dejado algunos detalles que quizás se te hayan pasado, incluso podrás acceder a unos datos de pago ficticios para poder hacer tu primer pedido.</p>
    </div>
  )
}

export default Page