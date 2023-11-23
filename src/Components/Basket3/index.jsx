import React, { useState } from "react";
import "./index.css";
import { useEffect } from "react";
import UseLocalStorage from "../../hooks/UseLocalStorage";

function Basket3() {
  const [basket, setBasket] = UseLocalStorage("basket");
  const [products, setProducts] = useState([]);
  const [isloading, setIsloading] = useState(true);


 
  

  async function getProducts() {
    const data = await fetch("http://localhost:5000/products");
    const res = await data.json();
    setProducts(res);
    setIsloading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handleBasket(item) {
        const elementIndex = basket.findIndex(x=>x.id ===item.id)
        if (elementIndex !==-1) {
            const newBasket = [...basket]
            newBasket[elementIndex].count++
            setBasket(newBasket)
        }
        else{
            setBasket([...basket,{...item,count:1}])
        }
  }

  function handleRemove(id) {
    setBasket(basket.filter(item=>item.id !==id))
  }

  function handleCountVal(isAdd,item) {
    const elementIndex = basket.findIndex(x=>x.id ===item.id)
    const newBasket = [...basket]
    if (isAdd ) {
        newBasket[elementIndex].count++
        setBasket(newBasket)
        
    }
    else{
        if (newBasket[elementIndex].count === 1) {
            return
        }
        newBasket[elementIndex].count--
        setBasket(newBasket)
    }

    
  }
  return (
    <>
      <div>
        <h1>UMUMI</h1>

        <h2>basketim</h2>

        <div className="basketContainer">
          {basket.map((item) => (
            <div>
              <h1>{item.title}</h1>
              <div className="cardImg">
                <img src={item.image} alt="" />
              </div>
              <p>price:{item.price}</p>
              <p>id:{item.id}</p>
              <p>sayi:{item.count}</p>
              <button onClick={()=>handleRemove(item.id)}>Remove</button>
              <button onClick={()=>handleCountVal(true,item)}>+</button>
              <button onClick={()=>handleCountVal(false,item)}>-</button>
            </div>
          ))}
        </div>

        <div className="productsSection">
          {isloading ? (
            <p>Loading...</p>
          ) : (
            <div className="cardNormal">
              {products.map((item) => (
                <div>
                  <h1>{item.title}</h1>
                  <div className="cardImg">
                    <img src={item.image} alt="" />
                  </div>
                  <p>price:{item.price}</p>
                  <p>id:{item.id}</p>

                  <button onClick={() => handleBasket(item)}>
                    AddToBasket
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Basket3;
