import React, { Component } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Modal = () => (
  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    <span> Modal content </span>
  </Popup>
);

class Product extends Component {

    constructor(props) {
        super(props);
        let product = props.product;

        this.state = { name: this.getName(product),
                    description: this.getDescription(product),
                    images: this.getImages(product), //list of dict containing url and dimensions as {w: <width>,h: <height>}
                    price: this.getPrice(product) ,
                    isOrganic: this.getOrganic(product)};
    }

  render() {
    //default thumbnail
    let src = "https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE-thumb.jpg"
    //default image
    let default_image = 'https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE.jpg'
    //organic badge
    let organic_badge = 'https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/5e85d71501308335-L2AE6hCf-thumb.jpg'
    
    if (this.state.images.length > 0)
      src = this.state.images[0].url;
    else
      this.setState({images: [{url:default_image}]});
    return (
      <Popup trigger={
      <div className="thumbnail">
          <img className="thumbnail" src={src} />
          <h1>{this.state.name}</h1>
          <p>{this.state.description}</p>
      </div>
      } modal>
        <div style={{textAlign:"center"}}>
          {this.state.name}<br/>
          {this.state.description}<br/>
          Price: {this.state.price}<br/>
          {this.state.images.map((image, i) => <img src = {image.url} className="full_image"></img>)}<br/>
          <img src = {this.state.isOrganic ? organic_badge: ''} style={{float:"right"}}></img>
        </div>

      </Popup>
    );
  }

  getPrice(product){
    try{
      return "$"+product.masterData.current.masterVariant.prices[0].value.centAmount/100;
    }
    catch(err){
      console.error(product.masterData.current.masterVariant.prices);
      return "N/A";
    }
  }

  getName(product){
    return product.masterData.current.name.en;
  }

  getId(product){
      return product.id;
  }

  getDescription(product){
      return product.masterData.current.description.en;
  }

  getImages(product){
      return product.masterData.current.masterVariant.images;
  }

  getOrganic(product){
      let attributes = product.masterData.current.masterVariant.attributes;
      for (var i = 0; i < attributes.length; i++){
        if (attributes[i].name == "Organic")
          return attributes[i].value;
      }
  }

}
 
export default Product;