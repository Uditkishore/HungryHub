import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "./Routes/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { fetchData } from "./Redux/Products/action";
import { fetchCartData } from "./Redux/Cart/action";
import './app.css'

function App() {
  const token = useSelector((state) => state.token.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    if(token) dispatch(fetchCartData(token))
  },[]);
  
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
