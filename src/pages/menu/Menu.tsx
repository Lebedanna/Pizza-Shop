import Heading from "../../components/Heading/Heading.tsx";
import Search from "../../components/Search/Search.tsx";
import styles from './Menu.module.css'
import {PREFIX} from "../../helpers/API.ts";
import {Product} from "../../interfaces/Product.interface.ts";
import {ChangeEvent, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {MenuLIst} from "./MenuLIst.tsx";

export  default function Menu() {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>()
    const [filter, setFilter] = useState<string>()

    useEffect(() => {
        getMenu(filter)
    }, [filter]);

    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true)
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: {
                    name
                }

            })
            setProducts(data)
            setIsLoading(false)
        } catch (e) {
            console.error(e)
            if (e instanceof AxiosError) {
                setError(e.message)
            }
            setIsLoading(false)
            return
        }
    }

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }


    return <>
        <div className={styles['head']}>
            <Heading>Меню</Heading>
            <Search placeholder='Введите блюдо или состав' onChange={updateFilter} />
        </div>
        <div>
            {error && <>Ошибка загрузки</>}
            {!isLoading && products.length > 0 && <MenuLIst products={products}/>}
            {isLoading && <>Загрузка...</>}
            {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}

        </div>
    </>
}