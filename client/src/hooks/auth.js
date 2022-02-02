import { useCallback, useEffect } from "react";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//null   아무나 입장
//true   로그인 유저만 입장
//false  로그인 유저 입장 불가

const useAuth = (option, adminRoute = null) => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const AuthenticationCheck = useCallback(() => {
    dispatch(auth()).then((response) => {
      //Not Loggined in Status
      if (!response.payload.isAuth) {
        if (option) {
          history.push("/login");
        }
        //Loggined in Status
      } else {
        //supposed to be Admin page, but not admin person wants to go inside
        if (adminRoute && !response.payload.isAdmin) {
          history.push("/");
        }
        //Logged in Status, but Try to go into log in page
        else {
          if (option === false) {
            history.push("/");
          }
        }
      }
    });
  }, [adminRoute, history, dispatch, option]);

  useEffect(() => {
    AuthenticationCheck();
  }, [AuthenticationCheck]);
  return user.userData;
};

export default useAuth;
