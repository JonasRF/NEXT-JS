import { GetServerSidePropsContext } from "next";
import { ProductProps } from "../../../../@types";
import { EditForm, Sidebar } from "../../../../components";
import { api } from "../../../../utils/api";


export default function ProductDetailsForm({ productDetails }: ProductProps) {
    return (
        <div className="d-flex flex-column flex-lg-row">
            <Sidebar />
            <EditForm {...productDetails} />
        </div>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    const { id } = ctx.query;
    const res = await api.get(`/products/${id}`);
    const productDetails = res.data;

    return {
        props: {
            productDetails
        }
    }
}