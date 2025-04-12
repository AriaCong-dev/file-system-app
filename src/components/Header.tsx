import React from 'react'
import styles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.h1}>FILE MANAGEMENT SYSTEM</h1>
    </div>
  )
}

export default Header
