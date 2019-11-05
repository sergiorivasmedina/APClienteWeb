import React from 'react';
import APIFerias from '../../services/FairsService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

class ProductBasket extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            quantity: this.props.cantidad,
            total: this.props.cantidad*this.props.monto,

            
        }
        
    this.updateQuantity = this.updateQuantity.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    }

    componentDidMount() {

        APIFerias.get('Despliegue/api/producto/' + this.props.idProducto)
            .then(res => {
                this.setState({
                    nombreProducto: res.data.nombre,
                    imagenProducto: res.data.imagen
                });         
            })
        
        
    }

    async updateQuantity(evt) {
        await this.setState({
            quantity: evt.target.value,
            total: evt.target.value * this.props.monto
        });
        var tot = this.state.total;
        console.log("1:",this.props.idDetalle,this.state.quantity,this.state.total)

        await this.props.triggerParentUpdate(evt,this.props.idDetalle,this.state.quantity,this.state.total)
    }

    removeProduct(evt) {

    APIFerias.delete('Despliegue/api/pedido/' + sessionStorage.getItem('idCliente') + '/producto/' +this.props.idProducto)
      .then(res => {
          Swal.fire({
              type: 'success',
              title: '¡Enhorabuena!',
              text: '¡Elimino un producto',
              onAfterClose: window.location = '/canasta'
          });
      }).catch(error => {
          Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: '¡No se pudo eliminar la tienda favorita!',
          })
      })
    }

    render() {
        return(
        <tr className="text-center">
            <td className="product-remove" onClick={this.removeProduct}><a href="#"><span className="ion-ios-close"></span></a></td>

            <td className="image-prod"><div className="" > <img className="img-fluid basketImage" src={this.state.imagenProducto} alt="Colorlib Template" /></div></td>

            <td className="product-name">
                <h3>{this.state.nombreProducto}</h3>
            </td>

            <td className="price">S/.{this.props.monto}</td>

            <td className="quantity">
                <div className="input-group mb-3">
                    <input type="number" min="1" name="quantity" className="quantity form-control input-number" value={this.state.quantity} onChange={this.updateQuantity}></input>
                </div>
            </td>

            <td className="total">{this.state.total}</td>
        </tr>
        );

    }


}


export default ProductBasket;