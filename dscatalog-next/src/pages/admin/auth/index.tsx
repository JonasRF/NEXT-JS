import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import imgBackGround from '../../../../public/auth-image.svg';
import { AuthData } from '../../../@types';
import { ButtonIcon } from '../../../components';
import { loginUser } from '../../../utils/auth';
import styles from '../../../styles/pages/auth.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AuthPage() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, } = useForm<AuthData>();

    const onSubmit = (data: AuthData) => {
        setIsLoading(true);
        const { username, password } = data;
        loginUser(username, password).then(res => {
            if (res.access_token) router.reload();
        })
            .catch((err) => console.log(err)).finally(() => setIsLoading(false));
    };

    return (
        <div className={styles.authContainer}>
            <div className={`d-none d-lg-block ${styles.authInfo}`}>
                <h1 className={styles.authInfoTitle}>
                    Divulgue seus produtos <br /> no DS Catalog
                </h1>
                <p className={styles.authInfoSubTitle}>
                    Faça parte do nosso catálogo de divulgação e<br /> aumente a venda dos
                    seus produtos.
                </p>
                <Image src={imgBackGround} alt='Background Login' />
            </div>
            <div className={`card-base ${styles.authCard}`}>
                <div className={styles.authContent}>
                    <>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={`d-flex flex-column align-items-center justify-content-between ${styles.loginform}`}>
                            <h2 className={`text-center mb-5 ${styles.formTitle}`}>Login</h2>
                            <input
                                type="text"
                                className='form-control input-base'
                                placeholder='Email'
                                {...register("username", {
                                    required: true,
                                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                })}
                            />
                            {
                                errors.username?.type === 'required' && (
                                    <p className='login-form-error'>
                                        O preenchimento do email é obrigatório.
                                    </p>
                                )
                            }
                            {
                                errors.username?.type === 'pattern' && (
                                    <p className='login-form-error'>
                                        Insira um email válido.
                                    </p>
                                )
                            }
                            <input
                                type='password'
                                className='form-control input-base'
                                placeholder='Senha'
                                {...register("password", {
                                    required: true
                                })}
                            />
                            {
                                errors.password?.type === 'required' && (
                                    <p className='login-form-error'>
                                        O preenchimento da senha é obrigatório.
                                    </p>
                                )
                            }
                            <Link href='/'>
                                <a className={styles.loginLinkRecover}>Esqueci a senha?</a>
                            </Link>
                            <div className={`d-flex align-items-center justify-content-center ${styles.loginSubmit}`}>
                                <ButtonIcon disabled={isLoading} label='fazer login' type='submit' />
                            </div>
                            <div className='text-center'>
                                <span className={styles.noRegistered}>Não tem cadastro?</span>
                                <Link href='/auth/register'><a className={styles.loginLinkRegister}>CADASTRAR</a></Link>
                            </div>
                        </form>
                    </>
                </div>
            </div>
        </div>
    )
}