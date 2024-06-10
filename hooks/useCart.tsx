import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Toast } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { ProductWithSizeType } from '@/types/product';

interface CartStore {
    items: (ProductWithSizeType & { quantity: number; selectedSize: string })[];
    addItem: (data: ProductWithSizeType, selectedSize: string) => void;
    incrementItem: (id: number, selectedSize: string) => void;
    decrementItem: (id: number, selectedSize: string) => void;
    removeItem: (id: number, selectedSize: string) => void;
    removeAll: () => void;
    totalQuantity: () => number;
}

export const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addItem: (data: ProductWithSizeType, selectedSize: string) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    (item) =>
                        item.id === data.id &&
                        item.selectedSize === selectedSize
                );
                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === data.id &&
                            item.selectedSize === selectedSize
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                    return toast({
                        title: 'Se ha añadido otra unidad al carrito',
                        description:
                            'Has añadido otra unidad del mismo producto al carrito',
                    });
                }
                set({
                    items: [
                        ...get().items,
                        { ...data, quantity: 1, selectedSize },
                    ],
                });
                toast({
                    title: 'Producto añadido al carrito',
                });
            },
            incrementItem: (id: number, selectedSize: string) => {
                set({
                    items: get().items.map((item) =>
                        item.id === id && item.selectedSize === selectedSize
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                });
            },
            decrementItem: (id: number, selectedSize: string) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    (item) =>
                        item.id === id && item.selectedSize === selectedSize
                );
                if (existingItem && existingItem.quantity > 1) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === id && item.selectedSize === selectedSize
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        ),
                    });
                } else {
                    set({
                        items: currentItems.filter(
                            (item) =>
                                item.id !== id ||
                                item.selectedSize !== selectedSize
                        ),
                    });
                }
            },
            removeItem: (id: number, selectedSize: string) => {
                set({
                    items: get().items.filter(
                        (item) =>
                            item.id !== id || item.selectedSize !== selectedSize
                    ),
                });
                toast({
                    title: 'Producto eliminado del carrito',
                });
            },
            removeAll: () => set({ items: [] }),
            totalQuantity: () =>
                get().items.reduce((total, item) => total + item.quantity, 0),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
