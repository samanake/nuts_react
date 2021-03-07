import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import Product from "./Product";

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

class Main extends Component {

    
    constructor(props) {
        super(props);
        this.state = { products: [], current_index: 0 };
        this.fetchMoreData(); //init
    }

    getMoreProducts = async () => {
        let access_token = await this.get_access_token();
        console.log(access_token);
        this.state.current_index += 10;
        return fetch("https://api.commercetools.co/nuts-custom-demo-1/products?offset="+this.state.current_index+"&limit=10", {
            headers: {
              Authorization: "Bearer "+access_token
            }
          }).then(response => response.json())
          .then(data =>{
              return data;
          });
    }

    fetchMoreData = async () => {
        console.log("Fetch called");
        let new_products = await this.getMoreProducts();
        new_products = new_products.results;
        this.setState({
        products: this.state.products.concat(new_products)
        });
        console.log(this.state.products);
    }

    render() {
      return (
        <HashRouter>
            <div>
                <h1>Nuts.com</h1>
                <ul className="header">
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>
                <div className="content">
                    <h1>Product list</h1>
                    <hr />
                    <InfiniteScroll
                        dataLength={this.state.products.length}
                        next={this.fetchMoreData}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        pullDownToRefresh
                        pullDownToRefreshThreshold={50}
                        refreshFunction={this.fetchMoreData}
                    >
                        {this.state.products.map((new_product, i) => <Product product={new_product}/>)}
                    </InfiniteScroll>
                </div>
            </div>
        </HashRouter>
      );
    }
    
    get_access_token(){
        return fetch("https://auth.commercetools.co/oauth/token", {
        body: "grant_type=client_credentials&scope=view_products:nuts-custom-demo-1",
        headers: {
            Authorization: "Basic QlphYS1hdjVMNlJtWktsUGdaYUdOa2VhOmpjaGJmX1E1elJXQ2FFZzRUQ0I0bTljTElpb1BpbWww",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        
        method: "POST"})
        .then(response => response.json())
        .then(response => response.access_token);
    }

}
  
 
export default Main;