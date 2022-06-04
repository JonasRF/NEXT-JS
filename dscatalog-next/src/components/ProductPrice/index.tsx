import { ProductPriceProps } from "../../@types";
import styles from './productPrice.module.css';

export default function ProductPrice({ price }: ProductPriceProps) {
    return (
        <div className={styles.productPriceContainer}>
            <span>R$</span>
            <h3>{price}</h3>
        </div>
    );
}