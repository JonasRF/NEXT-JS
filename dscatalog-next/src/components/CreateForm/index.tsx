
/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Category, ProductItemProps } from "../../@types";
import { api } from "../../utils/api";
import ImageUpload from "../ImageUpload";
import styles from "./createform.module.css";

export default function CreateForm() {
    const [availableCategories, setAvailableCategories] = useState<Category[]>();
    const [uploadedImgUrl, setUploadedImgUrl] = useState("");
    const [productImgUrl, setProductImgUrl] = useState("");
    const { register, handleSubmit, control, formState: { errors } } = useForm<ProductItemProps>();

    const onSubmit = async (formData: ProductItemProps) => {
        const data = {
            ...formData,
            imgUrl: uploadedImgUrl || productImgUrl
        }

        await api({
            url: '/products/',
            method: 'POST',
            data,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('@dscatalog/token') ?? '')}`
            }
        })

        history.pushState(null, 'Admin', '/admin');
        history.go(0);
    }

    const loadCategories = async () => {
        const res = await api({ url: '/categories' });
        setAvailableCategories(res.data.content);
    }

    const onUploadSuccess = (imgUrl: string) => {
        setUploadedImgUrl(imgUrl);
    }

    useEffect(() => {
        loadCategories();
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column flex-md-row">
                <div className="col-md-6 p-2 d-flex flex-column gap-4">
                    <h4>Dados do Produto</h4>
                    <input type='text' {...register('name', { required: true })}
                        placeholder='Nome do produto'
                        className={`form-control ${errors.name && styles.error}`} />
                    {
                        errors.name && (
                            <span className={styles.errormsg}>Adicione um nome ao produto!</span>
                        )
                    }
                    <Controller
                        control={control}
                        name="categories"
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={availableCategories}
                                getOptionLabel={(category: Category) => category.name}
                                getOptionValue={(category: Category) => String(category.id)}
                                isMulti
                            />
                        )
                        }
                    />
                    <input type='text'
                        {...register('price')}
                        className="form-control"
                        placeholder="Preço (R$)"
                    />
                    <ImageUpload onUploadSucess={onUploadSuccess} productImgUrl={productImgUrl} />
                </div>
                <div className="col-md-6 p-2">
                    <textarea className={styles.textArea}
                        {...register('description')}
                        placeholder="Descrição" rows={10} />
                </div>
            </div>
            <div className={`d-flex flex-row ${styles.buttonContainer}`}>
                <Link href='/admin'>
                    <button type="button" className={styles.btnCancel}>Cancel</button>
                </Link>
                <button type="submit" className={styles.btnSubmit}>Salvar</button>
            </div>

        </form>

    )
}