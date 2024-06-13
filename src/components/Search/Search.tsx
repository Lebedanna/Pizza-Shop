import styles from './Search.module.css'
import cn from 'classnames'
import {forwardRef} from "react";
import {SearchProps} from "./Search.props.ts";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({ isValid = true, className, ...props }: SearchProps, ref) {
    return (
        <div className={styles['input-wrapper']}>
            <img src='/search.svg' alt='search' className={styles['icon']}/>
            <input ref={ref} className={cn(styles['search'], className, {
                [styles['invalid']]: isValid,
            })} {...props} />
        </div>
    )
})

export default Search