

import React from 'react';
import {Link} from 'react-router-dom';

class ShopDescription extends React.Component {
    
    render() {
      var shopdetail = this.props.shopdetail;
        if (shopdetail.length > 85) {
          shopdetail = this.props.shopdetail.substring(0,85).concat('...');
        }
    let status;
    console.log("envia:" , this.props.like)
    var url = "/detalleTienda/" + this.props.index;
    return (

        <div className="col-md-6">
            <div className="product">
        <div className="row">
          <div className="col-md-5">
          <Link to={url}><img className="img-fluid customImage" src={this.props.urlimage==null?"../images/noimage.png":this.props.urlimage}
                    alt="Colorlib Template"></img>
              {status}
              
            </Link>
          </div>
          <div className="col-md-7 pt-3 pr-4">

          <h5 className="cardTitle">{this.props.shopname} {sessionStorage.getItem("idCliente")==null?
          <i className="width10"></i>:this.props.like==true? 
          <i className="ion-ios-heart width10 custom-heart" onClick={()=>this.props.handleClick(this.props.index)}></i> : 
          <i className="ion-ios-heart-empty width10 custom-heart" onClick={()=>this.props.handleClick(this.props.index)}></i>}</h5>
          
      
            <p className="pt-4">{shopdetail}</p>
            <Link to={url}><button className="width100 pinkButton btn pt-1 pb-1 px-4" onClick={this.addproduct}>Ingresar a tienda</button></Link>
          </div>
        </div>
        </div>
      </div>
        
    );
  }

}

export default ShopDescription;