import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from "../../http/productAPI"
import './product.scss'
import { Context } from "../../index"

const Product = () => {
    const { user } = useContext(Context)
    const params = useParams()
    const [product, setProduct] = useState([])
    useEffect(() => {

        getProduct(params.title).then(({ data }) => {
            setProduct(data)
        })
    }, [params.title])
    return (
        <div className="product">
            <img src={process.env.REACT_APP_API_URL + product.image} width='250' height='250' alt="" />
            <div className="product__data">
                <div className="data__title">{product.title}</div>
                <div className="data__description" >{product.description}</div>
                <div>
                   <div className="data__prices"><div className="price">{product.price}₽</div> { product.old_price ? <div className="old_price">{product.old_price}₽</div> : null} </div>
                    <button onClick={() => user.addCartItem(product)}>Добавить в корзину</button> 
                </div>
                
            </div>
        </div>
    )
}

export default Product