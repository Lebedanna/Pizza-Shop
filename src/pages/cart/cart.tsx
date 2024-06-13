import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {Product} from "../../interfaces/Product.interface.ts";
import {useEffect, useState} from "react";
import {PREFIX} from "../../helpers/API.ts";
import axios from "axios";
import Heading from "../../components/Heading/Heading.tsx";
import CartItem from "../../components/CartItem/CartItem.tsx";
import styles from './Cart.module.css'
import Button from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {cartActions} from "../../store/cart.slice.ts";

const DELIVERY_FEE = 169
export function Cart() {
    const items = useSelector((state: RootState) => state.cart.items)
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const jwt = useSelector((state: RootState) => state.user.jwt)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const total = items.map(i => {
           const product = cartProducts.find(p => p.id === i.id)
           if (!product) {
               return 0
           }
           return i.count * product.price
       }).reduce((acc, i) => acc += i, 0)

    const getItem = async (id: number) => {
        const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`)
        return data
    }

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)))
        setCartProducts(res)
    }

    const checkout = async () => {
        await axios.post(`${PREFIX}/order`, {
            products: items
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
            })
        dispatch(cartActions.clean())
        navigate('/success')
    }

    useEffect(() => {
        loadAllItems()
    }, [items])

    return (
        <div>
        <Heading className={styles['heading']}>Корзина</Heading>
            {items.map( i => {
                const product = cartProducts.find(p => p.id === i.id)
                if (!product) return
                return <CartItem count={i.count} {...product} key={i.id}/>
            })}
            <div className={styles['line']}>
                <div className={styles['text']}>Итог</div>
                <div className={styles['price']}>{total}&nbsp;<span>₽</span></div>
            </div>
            <hr className={styles['hr']}/>
            <div className={styles['line']}>
                <div className={styles['text']}>Доставка</div>
                <div className={styles['price']}>{DELIVERY_FEE}&nbsp;<span>₽</span></div>
            </div>
            <hr className={styles['hr']}/>
            <div className={styles['line']}>
                <div className={styles['text']}>Итог <span>({items.length})</span></div>
                <div className={styles['price']}>{total + DELIVERY_FEE}&nbsp;<span>₽</span></div>
            </div>
            <div className={styles['checkout']}>
                <Button appearance='big' onClick={checkout}>Оформить</Button>
            </div>
        </div>
    )
}