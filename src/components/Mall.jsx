import React, { useEffect, useState } from "react";
import "./Mall.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCandies,
  addChoclate,
  addSoftDrinks,
  addChinese,
  removeItems,
} from "../store/slices/ShopingCartSlice";

import { fetchOtherUserCart } from "../store/slices/ShopingCartSlice";

const productsPrices = {
  choclates: 2,
  candies: 1,
  "soft drinks": 4,
  chinese: 9,
};
const Mall = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  //   const [status,setStatus] = useState(useSelector((state) => state.shopingCart.status));
  //for calling the actions inside the store
  const dispatch = useDispatch();

  //accessing the specific state of the store
  const cart = useSelector((state) => state.shopingCart.cart);

  const status = useSelector((state) => state.shopingCart.status);

  const otherUserCarts = useSelector(
    (state) => state.shopingCart.otherUserCarts
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOtherUserCart());
    }
    console.log(status);
    console.log(otherUserCarts);
  }, [status, dispatch]);

  const hashMap = new Map();
  const showProducts = () => {
    for (let item of cart) {
      if (!hashMap.has(item)) {
        hashMap.set(item, 1);
      } else {
        hashMap.set(item, hashMap.get(item) + 1);
      }
    }

    const productsArray = [];
    hashMap.forEach((value, key, map) => {
      productsArray.push([key, value]);
    });
    return productsArray;
  };
  return (
    <>
      <div className="container">
        <h1>Shopping Mall</h1>
        <div className="items">
          <div className="choclates">
            <div class="card" style={{ width: "18rem" }}>
              <img
                class="card-img-top"
                src="https://plus.unsplash.com/premium_photo-1675283825474-390ea83c0703?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">Choclates</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>

                <button
                  onClick={() => (
                    dispatch(addChoclate()), setTotalAmount(totalAmount + 2)
                  )}
                >
                  Buy Choclates at $2
                </button>
              </div>
            </div>
          </div>
          <div className="candies">
            <div class="card" style={{ width: "18rem" }}>
              <img
                class="card-img-top"
                src="https://images.unsplash.com/photo-1581798269145-7512508289b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=852&q=80"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">Candies</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>

                <button
                  onClick={() => (
                    dispatch(addCandies()), setTotalAmount(totalAmount + 1)
                  )}
                >
                  Buy Candies at $1
                </button>
              </div>
            </div>
          </div>
          <div className="soft-drinks">
            <div class="card" style={{ width: "18rem" }}>
              <img
                class="card-img-top"
                src="https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">soft drinks</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button
                  onClick={() => (
                    dispatch(addSoftDrinks()), setTotalAmount(totalAmount + 4)
                  )}
                >
                  Buy soft drinks at $4
                </button>
              </div>
            </div>
          </div>
          <div className="chinese">
            <div class="card" style={{ width: "18rem" }}>
              <img
                class="card-img-top"
                src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">Chinese</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>

                <button
                  onClick={() => (
                    dispatch(addChinese()), setTotalAmount(totalAmount + 9)
                  )}
                >
                  Buy Chinese at $9
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bill-counter">
          <h1>Total bill: ${totalAmount}</h1>
          <h2>
            Products purchased:
            {showProducts().map((item) => {
              return (
                <h3 className="products-in-cart">
                  {item[0] + "  :   " + item[1]}
                  <button
                    onClick={() => (
                      dispatch(removeItems(item[0])),
                      setTotalAmount(totalAmount - productsPrices[item[0]])
                    )}
                    className="removeBtn"
                  >
                    -
                  </button>
                </h3>
              );
            })}
          </h2>
        </div>

        <h2 style={{marginTop:'20px'}}>Other User shopping Carts</h2>
        <div className="otherUsersCartData">
          {otherUserCarts?.length > 0 ? (
            <div className="OtherProductList">
              {otherUserCarts.map((item,index) => {
                return <div key={index} className="otherUserProduct">
                    <h4>Product Name:  {item.products[0].title}</h4>
                    <h5>Product Price: ${item.products[0].price}</h5>
                </div>;
              })}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Mall;
