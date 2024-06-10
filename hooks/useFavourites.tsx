import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware'
import { ProductType } from '@/types/product';
import { toast } from '@/components/ui/use-toast';

interface UseFavouritesProductsType {
  favouriteItems: ProductType[],
  addFavourite: (data: ProductType) =>  void,
  removeFavourite: (id: number) => void
}

export const useFavouriteProducts = create (persist<UseFavouritesProductsType>((set, get)=> ({
  favouriteItems: [],
  addFavourite: (data: ProductType) => {
    const currentFavourites = get().favouriteItems;
    const existingItem = currentFavourites.find((item)=> item.id == data.id)
    if(existingItem) {
      return toast ({
        title: "El producto ya está en la lista de favoritos",
        variant: "destructive"
      })
    }
    set({
      favouriteItems: [...get().favouriteItems, data]
    })
    toast({
      title: "Producto añadido a favoritos"
    })
  },
  removeFavourite: (id: number) => {
    set({favouriteItems: [...get().favouriteItems.filter((item) => item.id !== id)]})
    toast ({
      title: "Producto eliminado de favoritos"
    })
  }
}), {
  name: 'favourites-storage',
  storage: createJSONStorage(()=> localStorage)
}))