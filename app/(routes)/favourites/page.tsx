"use client"
import {useFavouriteProducts} from '@/hooks/useFavourites'
import FavouriteProduct from './components/FavouriteProduct'

export default function Page(){
  const {favouriteItems} = useFavouriteProducts()
  return (
    <div className="max-w-4xl py-4 mx-auto sm:py-32 sm:px-24 lg:min-h-[80vh]">
      <h2 className="sm:text-2xl">Productos favoritos</h2>
      <div>
        <div>
          {favouriteItems.length === 0 && (
            <p>Actualmente no hay productos favoritos</p>
          )}
          <ul>
            {favouriteItems.map((item) => (
              <FavouriteProduct key={item.id} product={item}/>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}