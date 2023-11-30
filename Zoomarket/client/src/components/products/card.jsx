import './products.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../index'

import { observer } from 'mobx-react-lite'
const Card = observer(({product}) => {
    const {user} = useContext(Context)
    return (
        <div className="card">
            <div className="sale">{product.sale ? 'Скидка' : null}</div>
            <div className="hit">{product.hit ? 'Хит' : null}</div>
            <img className="card__image" src={process.env.REACT_APP_API_URL + product.image} alt={product.title}></img>
            <div className="card__title"><Link to={'/product/' + product.title}>{product.title}</Link></div>
            <div className="card__description">
                <div className="card__price">{product.price}₽</div>
                { product.old_price ? <div className="card__oldprice">{product.old_price}₽</div> : null}
            </div>
            <button className='card__button' onClick={() => user.addCartItem(product)}>В корзину</button>
        </div>
    )
})

export default Card