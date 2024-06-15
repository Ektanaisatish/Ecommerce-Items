import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Badge,
} from "@mui/material";
import { addToCart, removeFromCart } from "../redux/store/CardSlice";
import SAMPLE_PRODUCTS from "./Products.json";
import toast from "react-hot-toast";
import { ADDED_SUCCESSFULLY } from "../constants/Constants";
import "../App.css";
import "./Product.scss";

const Product = () => {
  const productQuantities = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const newTotalQuantity = productQuantities.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
  }, [productQuantities]);

  const addToCartHandler = (productId) => {
    dispatch(addToCart({ id: productId }));
    toast.success(ADDED_SUCCESSFULLY);
  };

  const deleteToCartHandler = (productId) => {
    dispatch(removeFromCart({ id: productId }));
  };

  // Filter SAMPLE_PRODUCTS based on whether their ID exists in productQuantities
  const addedProducts = SAMPLE_PRODUCTS.filter((product) =>
    productQuantities.find((item) => item.id === product.id)
  );

  return (
    <><div className="container">
      <div style={{ padding: "100px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              width: "90%",
              maxWidth: "400px",
              display: productQuantities.length ? "block" : "none",
              backgroundColor: "black",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
                {" "}
                Your Shopping Cart
              </Typography>
              {addedProducts.map((product) => (
                <div key={product.id} style={{ marginBottom: "10px" }}>
                  <Card variant="outlined" sx={{ backgroundColor: "grey" }}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={8}>
                          <Typography variant="h6">{product.title}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body1" gutterBottom>
                            $
                            {product.price *
                              (productQuantities.find(
                                (item) => item.id === product.id
                              )?.quantity || 0)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={7}>
                          <Typography variant="body2">
                            Quantity in Cart:{" "}
                            {productQuantities.find(
                              (item) => item.id === product.id
                            )?.quantity || 0}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} md={3}>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => deleteToCartHandler(product.id)}
                          >
                            -
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            onClick={() => addToCartHandler(product.id)}
                          >
                            +
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          BUY YOUR FAVOURITE PRODUCT
        </Typography>
        {SAMPLE_PRODUCTS.map((product) => (
          <Card
            key={product.id}
            variant="outlined"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
              maxWidth: "400px",
              marginBottom: "10px",
            }}
          >
            <CardContent style={{ flexGrow: 1 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product.description}
                </Typography>
              </div>
            </CardContent>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Badge
                  sx={{
                    background: "lightgrey",
                    border: "1px solid grey",
                    padding: "4px",
                    borderRadius: "4px",
                  }}
                  gutterBottom
                >
                  ${product.price}
                </Badge>
                <Button
                  variant="outlined"
                  sx={{ marginTop: "37px", marginBottom: "1px" }}
                  size="large"
                  color="secondary"
                  onClick={() => addToCartHandler(product.id)}
                >
                  Add to cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div></div>
    </>
  );
};

export default Product;
