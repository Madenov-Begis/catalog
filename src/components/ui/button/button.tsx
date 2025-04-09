import styles from './button.module.css'

export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  )
}
