import React, { useEffect, useState } from "react";
import UseLocalStorage from "../../hooks/UseLocalStorage";
import UseDarkMode from "../../hooks/UseDarkMode";
import { v4 as uuidv4 } from 'uuid';

function Basket4() {
  const [basket, setBasket] = UseLocalStorage("basket");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heartFilledItems, setHeartFilledItems] = useState([])
  const [wishlist, setWishlist] = UseLocalStorage("wishlist")
  
  function toggleHeart(item) {
    const isItemInWishlist = wishlist.find(x => x.id === item.id);

    if (isItemInWishlist) {
      const newWishlist = wishlist.filter((x) => x.id !== item.id);
      setWishlist(newWishlist);
    } else {
      setWishlist([...wishlist, { ...item }]);
    }

    const isItemInHeartList = heartFilledItems.includes(item.id);
    if (isItemInHeartList) {
      setHeartFilledItems(heartFilledItems.filter((id) => id !== item.id));
    } else {
      setHeartFilledItems([...heartFilledItems, item.id]);
    }
  }

  async function getProducts() {
    const data = await fetch("http://localhost:5000/products");
    const res = await data.json();
    setProducts(res);
    setIsLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handleBasket(item) {

    const elementIndex = basket.findIndex(x=>x.id ===item.id)
    if (elementIndex !== -1) {
        const newBasket = [...basket]
        newBasket[elementIndex].count++
        setBasket(newBasket)
        
    }
    else{
        setBasket([...basket,{...item,count:1}])
    }



}


function handleRemove(id) {
    setBasket(basket.filter(item=>item.id !== id))
}

function handleCountVal(isAdd,item) {
    const elementIndex = basket.findIndex(x=>x.id ===item.id)
    const newBasket = [...basket]
    if (isAdd) {
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


   const [theme,handleDarkMode] = UseDarkMode()
    

  return (
    <>
      <div>
        <h1>ummmi</h1>
        <button onClick={handleDarkMode}>{theme ? 'Light Mode' : 'Dark Mode'}</button>


        <div>
            <h1>wishlist</h1>
            {
                wishlist.map((item)=>(
                    <div key={uuidv4()}>
                  <h1>{item.title}</h1>
                  <div className="cardImg">
                    <img src={item.image} alt="" />
                  </div>
                  <p>price:{item.price}</p>
                  <p>id:{item.id}</p>

                  <button onClick={() => handleBasket(item)}>
                    AddToBasket
                  </button>
                  <button onClick={() => toggleHeart(item)}>
                    {heartFilledItems.includes(item.id) ? "Unheart" : "Heart"}
                  </button>
                </div>
                ))
            }
        </div>

        <div>


          <h1>basketim</h1>

          <div className="basketContainer">
            {basket.map((item) => (
              <div key={uuidv4()}>
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
             <p>{basket.reduce((total, item) => total + item.price * item.count, 0).toFixed(2)}</p>
          </div>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="cardNormal">
            {products &&
              products.map((item) => (
                <div key={uuidv4()}>
                  <h1>{item.title}</h1>
                  <div className="cardImg">
                    <img src={item.image} alt="" />
                  </div>
                  <p>price:{item.price}</p>
                  <p>id:{item.id}</p>

                  <button onClick={() => handleBasket(item)}>
                    AddToBasket
                  </button>
                  <button onClick={() => toggleHeart(item)}>
                    {heartFilledItems.includes(item.id) ? "Unheart" : "Heart"}
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Basket4;
