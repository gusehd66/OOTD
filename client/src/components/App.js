import React, { Suspense } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Auth from "../hoc/auth";
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

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  const history = useHistory();
  history.push("/");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/product/upload"
            component={Auth(UploadProductPage, true)}
          />
          <Route
            exact
            path="/product/select"
            component={Auth(SelectProductPage, null)}
          />
          <Route
            exact
            path="/product/random"
            component={Auth(RandomSelectPage, null)}
          />
          <Route
            exact
            path="/product/:productId"
            component={Auth(DetailProductPage, null)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
