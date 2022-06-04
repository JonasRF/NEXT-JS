import Link from 'next/link';
import { NavLinkProps } from '../../@types';
import { returnSelect } from '../../utils';

export default function NavBarlink({ target, label }: NavLinkProps) {
    return (
        <Link href={target}>
            <a className={returnSelect(target)}>{label}</a>
        </Link>
    )
}