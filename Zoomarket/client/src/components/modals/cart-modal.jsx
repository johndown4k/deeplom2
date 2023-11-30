import { observer } from "mobx-react-lite"
import { Context } from "../../index"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import './cart-modal.scss'
import { createOrder } from "../../http/orderAPI";

const CartModal = observer((props) => {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState()
  const { user } = useContext(Context)
  const handleClose = () => { 
    props.onhide()
    setStatus('')
    setMessage('')
  }
  const [orderForm, setOrderForm] = useState({
    name: '',
    telephone: '',
    products: [],
  })

  useEffect(() => {
    setOrderForm({ ...orderForm, products: user.cart })
  }, [user.cart])

  const Submit = async () => {
    if (user.isAuth){
      setOrderForm({ ...orderForm, name: user.first_name })
    }
    try {
      const { data, status } = await createOrder(orderForm)
      setMessage(data.message)
      setStatus(status)
      localStorage.setItem('cart', '[]')
      user.setCart([])
    } catch (e) {
      setMessage(e.response.data.message)
      setStatus(e.response.status)
    }

  }
  const changeHandler = (event) => {
    setOrderForm({ ...orderForm, [event.target.name]: event.target.value })
  }
  return (
    <Modal {...props} onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Корзина
        </Modal.Title>
      </Modal.Header>
      {status === 200 ?
        <Modal.Body className="grid-example">
          <h1 style={{ textAlign: 'center', color: 'green' }}>Заказ создан</h1>
        </Modal.Body>
        :
        <Modal.Body className="grid-example">
          {user.cart.length ?
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Изображение</th>
                  <th>Название</th>
                  <th>Кол-во</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {
                  user.cart.map((item, key) =>
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td><img src={process.env.REACT_APP_API_URL + item.image} width='100' height='100' alt="" /></td>
                      <td>{item.title}</td>
                      <td><div className="cart__tools" ><span onClick={() => user.addCartItem(item)}>+</span>{item.quantity}<span onClick={() => user.deleteCartItem(item)}>-</span></div></td>
                      <td>{item.price}₽</td>
                    </tr>
                  )
                }

              </tbody>
            </Table>
            :
            <h1 className="empty-cart">
              Корзина пуста
            </h1>
          }
        </Modal.Body>
      }

      {user.cart.length && status !== 200 ?
        <Modal.Footer className="modal__footer">
          {
            !user.isAuth && <input
              type="text"
              name="name"
              placeholder="Имя"
              onChange={changeHandler}
            />
          }
          <input
            type="tel"
            name="telephone"
            placeholder="Номер телефона"
            onChange={changeHandler}
          />
          Общая стоимость: {user.cart.length && user.cart.reduce((acc, item) => acc += item.price * item.quantity, 0)}₽
          <h4>{message.length ? message : null}</h4>
          <Link className="OrderButton" onClick={() => Submit()}>Оформить заказ</Link>
        </Modal.Footer>
        : null}
    </Modal>
  )
})

export default CartModal