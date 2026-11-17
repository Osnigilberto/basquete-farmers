import styles from './PageHeader.module.css'

export default function PageHeader({ rotulo, titulo, children }) {
  return (
    <section className={styles.header}>
      <div className="container">
        {rotulo && <span className="rotulo">{rotulo}</span>}
        <h1>{titulo}</h1>
        {children && <p className={styles.sub}>{children}</p>}
      </div>
    </section>
  )
}
