import Image from 'next/image';
import Link from 'next/link';
import { ProductItemProps, ProductsResponse } from '../../@types';
import ProductPrice from '../ProductPrice';

import styles from './productItem.module.css';

export default function ProductItem(product: ProductItemProps) {
    const { id, imgUrl, name, price } = product;
    return (
        <Link href={`/catalog/product/${id}`}>
            <a className={`card-base border-radius-10 ${styles.productCard}`}>
                <div className={styles.cardTopContainer}>
                    <Image src={imgUrl}
                        alt={name}
                        className={styles.productCardImage} width={158} height={158} />
                </div>
                <div className={styles.cardBottomContainer}>
                    <h6>{name}</h6>
                    <ProductPrice price={String(price)} />
                </div>
            </a>
        </Link>

    );
}