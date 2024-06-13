import styles from './Input.module.css'
import cn from 'classnames'
import {forwardRef} from "react";
import {InputProps} from "./Input.props.ts";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid = true, className, ...props }: InputProps, ref) {
    return (
        <input ref={ref} className={cn(styles['input'], className, {
            [styles['invalid']]: isValid,
        })} {...props} />
    )
})

export default Input