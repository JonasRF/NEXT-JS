import { CreateForm, Sidebar } from "../../../../components";


export default function NewProduct() {
    return (
        <div className="d-flex flex-column flex-lg-row">
            <Sidebar />
            <CreateForm />
        </div>
    )
}