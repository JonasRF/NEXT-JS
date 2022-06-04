/* eslint-disable @next/next/no-typos */
import { useEffect, useState } from "react";
import { ProductsResponse } from "../../@types";
import { api } from "../../utils/api";
import AuthPage from "./auth";
import DashboardPage from "./dashboard/[index]";

export default function AdminPage({ products }: ProductsResponse) {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('@dscatalog/token')) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    }, [])

    if (logged) {
        return <DashboardPage products={products} />
    } else {
        return <AuthPage />
    }
}

export async function getServerSideProps() {
    const params = {
        page: 0,
        size: 12,
        sort: "name,asc"
    };

    const res = await api({ url: "/products", params });
    const products = res.data.content;

    return {
        props: {
            products,
        },
    };
}