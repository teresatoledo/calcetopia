"use client";
import { useRouter } from 'next/navigation'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { Card, CardContent } from './ui/card';
import Autoplay from "embla-carousel-autoplay";

function CarouselBanner() {
  const dataCarouselTop = [
    {
      id: 1,
      title: "Envío en 24/48 h",
      description: "Envío en 24/48 horas para los mejores clientes.",
      link: "#"
    },
    {
      id: 2,
      title: "Consigue un 10% de descuento en compras superiores a 50€.",
      description: "10% de descuento con el código DESCUENTO10.",
      link: "#"
    },
    {
      id: 3,
      title: "Devoluciones gratuitas",
      description: "Devoluciones gratuitas siempre y cuando se cumpla con la política de devoluciones.",
      link: "#"
    },
    {
      id: 4,
      title: "Comprar novedades",
      description: "Las últimas novedades en un solo lugar.",
      link: "#"
    }
  ]
  const router = useRouter();
  return (
    <div className='bg-amber-200' >
      <Carousel className='w-full max-w-4-xl mx-auto'
      plugins={[
        Autoplay({
          delay:3500
        })
      ]}>
        <CarouselContent>
          
        
        {dataCarouselTop.map(({id, title, link, description})=> (
          <CarouselItem key={id} onClick={()=> router.push(link)}>
            <div>
              <Card className='shadow-none border-none bg-transparent'>
                <CardContent className='flex flex-col justify-center p-2 items-center text-center'>
                  <p className='sm:text-lg text-wrap dark:text-secondary'>{title}</p>
                  <p className='text-xs sm:text-sm text-wrap dark:text-secondary'>{description}</p>
                </CardContent>
              </Card>
            </div>
        </CarouselItem>
        ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default CarouselBanner