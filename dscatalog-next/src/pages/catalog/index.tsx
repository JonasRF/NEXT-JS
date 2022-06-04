
import { ProductsResponse } from '../../@types';
import { ProductItem } from '../../components';
import styles from '../../styles/pages/catalog.module.css';
import { api } from '../../utils/api';

export default function CatalogHome({ products }: ProductsResponse) {

    return (
        <div className='container'>
            <h3 className='my-4'>Catágolo de Produtos</h3>
            <div className={styles.catalogProducts}>
                {
                    products.map((product, index) => (
                        <ProductItem key={index} {...product} />
                    ))
                }
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const res = await api.get("/products?page=0&size=20&sort=name,asc");

    const products = res.data.content;

    return {
        props: {
            products,
        },
    };
}