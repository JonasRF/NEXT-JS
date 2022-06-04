/* eslint-disable @next/next/link-passhref */


import Link from "next/link";
import { ProductsResponse } from "../../../../../@types";
import ProductRow from "../../../../../components/ProductRow";

function Products({ products }: ProductsResponse) {
    return (
        <div className="products-page">
            <Link href='admin/dashboard/product/new'>
                <button type="button" className="product-add-button">
                    Adicionar
                </button>
            </Link>
            <div>
                {
                    products && products.map((product) => (

                        <ProductRow key={product.id} {...product} />
                    ))}
            </div>
        </div>

    );

}

export default Products;