export type NavLinkProps = {
    target: string;
    label: string;
}

export type ButtonIconProps = {
    label: string;
    type: 'button' | 'submit';
    disabled?: boolean;
}

export type ProductPriceProps = {
    price: string;
}

export type Category = {
    id: number;
    name: string;
}

export type ProductItemProps = {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    date: string;
    categories: Category[]
}

export type ProductsResponse = {
    products: ProductItemProps[];
}

export type ProductProps = {
    productDetails: ProductItemProps;
}

export type AuthData = {
    username: string;
    password: string;
}

export type Role = "ROLE_OPERATOR" | "ROLE_ADMIN";

export type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role[];
}

export type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}