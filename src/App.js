import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './data';
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  useEffect(()=>{
    const dataset=localStorage.getItem("my-cart")
    if (dataset) {
      setCartItems(JSON.parse(dataset))
    }
    
  },[]);
  useEffect(()=>{
    localStorage.setItem("my-cart",JSON.stringify(cartItems))
  })
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      confirmAlert({
        title: 'Item deleted',
        buttons: [
          {
            label: 'OK',
            onClick: setCartItems(cartItems.filter((x) => x.id !== product.id))
          }
        ]
      });
      
    } else {
      confirmAlert({
        title: 'Item deleted',
        buttons: [
          {
            label: 'OK',
            onClick: setCartItems(
              cartItems.map((x) =>
                x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
              )
            )
          }
        ]
      });
      
    }
  };
 
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row-main">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove} to delete
          
        ></Basket>
      </div>
    </div>
  );
}

export default App;

// 