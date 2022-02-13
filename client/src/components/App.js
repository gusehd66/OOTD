import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import SelectProductPage from "./views/SelectProductPage/SelectProductPage";
import RandomSelectPage from "./views/RandomSelectPage/RandomSelectPage";
import MyInfo from "./views/MyInfo/MyInfo.jsx";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "70px" }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/myInfo" component={MyInfo} />
          <Route exact path="/product/upload" component={UploadProductPage} />
          <Route exact path="/product/select" component={SelectProductPage} />
          <Route exact path="/product/random" component={RandomSelectPage} />
          <Route
            exact
            path="/product/:productId"
            component={DetailProductPage}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
