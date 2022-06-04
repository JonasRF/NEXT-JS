import { ButtonIconProps } from "../../@types";
import arrow from '../../../public/arrow.svg';
import Image from "next/image";

import styles from './buttonIcon.module.css';

export default function ButtonIcon({ label, type, disabled }: ButtonIconProps) {
    return (
        <div className={`d-flex ${styles.buttonContainer}`}>
            <button className={`btn btn-primary ${styles.btnIcon}`} type={type} disabled={disabled}>
                <h5>{label}</h5>
            </button>
            <div className={styles.btnIconContent}>
                <Image src={arrow} alt='arrow' />
            </div>
        </div>
    )
}