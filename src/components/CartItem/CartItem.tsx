import styles from './CartItem.module.css'
import {CartItemProps} from "./CartItem.props.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {cartActions} from "../../store/cart.slice.ts";

export default function CartItem(props: CartItemProps) {
    const dispatch = useDispatch<AppDispatch>()
    const increase = () => {
        dispatch(cartActions.add(props.id))
    }

    const decrease = () => {
        dispatch(cartActions.decrease(props.id))
    }

    const remove = () => {
        dispatch(cartActions.delete(props.id))
    }

    return (
            <div className={styles['item']}>
                    <div className={styles['image']} style={{backgroundImage: `url('${props.image}')`}}>
                    </div>
                    <div className={styles['description']}>
                        <div className={styles['name']}>{props.name}</div>
                        <div className={styles['price']}>{props.price}&nbsp;₽</div>
                    </div>
                <div className={styles['actions']}>
                    <button className={styles['minus']} onClick={decrease}>
                        <img src='/minus.svg'/>
                    </button>
                    <div className={styles['count']}>
                        {props.count}
                    </div>
                    <button className={styles['plus']} onClick={increase}>
                        <img src='/increase.svg'/>
                    </button>
                    <button className={styles['delete']} onClick={remove}>
                        <img src='/delete.svg'/>
                    </button>

                </div>
            </div>

    )
}

