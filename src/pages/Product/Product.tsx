import {Await, useLoaderData, useNavigate} from "react-router-dom";
import { Product as ProductInterface } from "../../interfaces/Product.interface.ts";
import {Suspense} from "react";
import styles from './Product.module.css'
import Heading from "../../components/Heading/Heading.tsx";
import Button from "../../components/Button/Button.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {cartActions} from "../../store/cart.slice.ts";


export function Product() {
    const data = useLoaderData() as { data: ProductInterface }
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const add = (id: number) => {
        dispatch(cartActions.add(id))
    }

    const goBack = () => {
        navigate(-1)
    }

    return <>
        <Suspense fallback={'Загрузка...'}>
            <Await resolve={data.data}>
                {({ data }: {data:ProductInterface}) => (
                    <div>
                        <div className={styles['header']}>
                            <div className={styles['header-left']}>
                                <button className={styles['back']} onClick={goBack}>
                                    <img src='/back.svg' alt='back'/>
                                </button>
                                <Heading>{data.name}</Heading>
                            </div>

                            <Button appearance='small' className={styles['add-to-cart']} onClick={() => add(data.id)}>
                                <img src='/add-to-cart.svg' alt='add to cart'/>
                                В корзину
                            </Button>
                        </div>
                        <div className={styles['content']}>
                            <img className={styles['image']} src={data.image} alt={data.name}/>
                            <div className={styles['info']}>
                                <div className={styles['line']}>
                                    <span>Цена</span>
                                    <span>
                                        {data.price}&nbsp;
                                        <span className={styles['currency']}>₽</span>
                                    </span>
                                </div>
                                <hr className={styles['hr']}/>
                                <div className={styles['line']}>
                                    <span>Рейтинг</span>
                                    <span className={styles['rating']}>
                                        {data.rating}
                                        <img src='/rating.svg' alt='rating'/>
                                    </span>
                                </div>
                                <div className={styles['ingredients']}>
                                    <span>Состав:</span>
                                    <ul className={styles['ingredients-list']}>
                                        {data.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient[0].toUpperCase() + ingredient.slice(1)}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                )}
            </Await>
        </Suspense>
    </>
}