/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Category, ProductItemProps } from "../../@types";
import { api } from "../../utils/api";
import ImageUpload from "../ImageUpload";
import styles from './editForm.module.css';

export default function EditForm(productDetails: ProductItemProps) {
    const [availableCategories, setAvailableCategories] = useState<Category[]>();
    const [uploadedImgUrl, setUploadedImgUrl] = useState("");
    const [productImgUrl, setProductImgUrl] = useState("");

    const { id, name, description, price, imgUrl, categories } = productDetails;
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<ProductItemProps>();

    const onSubmit = async (formData: ProductItemProps) => {
        const data = {
            ...formData,
            imgUrl: uploadedImgUrl || productImgUrl

        }

        await api({
            url: `/products/${id}`,
            method: 'PUT',
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
        setValue('name', name);
        setValue('price', price);
        setValue('description', description);
        setValue('categories', categories);
        setProductImgUrl(imgUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

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
                    <input type='text' {...register('price')} />
                    <ImageUpload onUploadSucess={onUploadSuccess} productImgUrl={productImgUrl} />
                </div>
                <div className="col-md-6 p-2">
                    <textarea className={styles.textArea}
                        {...register('description')}
                        placeholder="Descrição" rows={10} />
                </div>
            </div>
            <div className="d-flex flex-row">
                <Link href='/admin'>
                    <button type="button" className={styles.btnCancel}>Cancel</button>
                </Link>
                <button type="submit" className={styles.btnSubmit}>Salvar</button>
            </div>

        </form>

    )
}