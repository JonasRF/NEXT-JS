import Link from 'next/link';
import { ButtonIcon } from '../components';
import Image from 'next/image';
import homeImage from '../../public/main-image.svg';

import styles from '../styles/pages/home.module.css';

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={`row d-flex flex-column align-items-center justify-content-center flex-lg-row 
      card-base border-radius-20 ${styles.homeContent}`}>

          <div className={`col-lg-6 d-flex flex-column align-items-center mt-4 mt-md-0 ${styles.homeText}`}>
            <h1 className={styles.textTitle}><strong>Conheça o melhor catálogo de produtos</strong></h1>
            <p className={styles.textSubTitle}>Ajudaremos você a encontrar os melhores produtos disponíveis
              no mercado.
            </p>
            <Link href='/catalog'>
              <a>
                <ButtonIcon type='button' label='inicie a sua busca' />
              </a>
            </Link>
          </div>
          <div className={`col-lg-6 d-flex align-items-center justify-content-center 
            align-items-lg-center justify-content-lg-start ${styles.homeImgContainer}`}>
            <Image src={homeImage} alt='Home Page Image' />
          </div>
        </div>
      </div>
    </>
  )
}
export default Home;
