import { Product } from '../store/products';

export function productsFilter(allProducts: Product[], searchFor: string) {
    const propertysName: Array<keyof Product> = ['title', 'category', 'description'];

    return allProducts.filter((product: Product) =>
        propertysName.some(propertyName => {
            const propertyValue = product[propertyName];
            if (typeof propertyValue === 'string') {
                return propertyValue.toLowerCase().includes(searchFor.toLowerCase());
            }
            return false;
        })
    );
}
