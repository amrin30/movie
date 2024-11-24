import React from 'react'
import style from './Loader.module.css'

const Loader = () => {
  return (
    // <span className={style.loader}></span>

    // <div className={style.container}>
    //   <div className={style.container}>
    //   </div>
    // </div>

  <div className={style.container}>
  <div className={style.dot}></div>
  <div className={style.dot}></div>
  <div className={style.dot}></div>
  <div className={style.dot}></div>
  <div className={style.dot}></div>
  <div className={style.dot}></div>
  <div className={style.dot}></div>
  <div className={style.dot}></div>
</div>

  )
}

export default Loader
