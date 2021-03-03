import React, { useEffect, useState } from "react";
import tree1 from "../../images/autraliaoil@1x.jpg";
import CustomerInfo from "../CustomerInfo";
import "./OrderDetails.css";
import { useDispatch, useSelector } from "react-redux";

import { saveSign } from "../../config/config.json";
import { itemMoved, addItem, getItems } from "../../store/reducers/cartItems";

function OrderDetails(props) {
  const dispatch = useDispatch();
  const [items, setItems] = useState(useSelector(getItems));

  const [offset, setOffset] = useState(false); // show back to top button
  const [subtotalQty, setSubtotalQty] = useState(0);
  const [subtotalPrice, setSubtotalPrice] = useState(0);

  const [saveFlag, setSaveFlag] = useState(saveSign.unSaved); // 1 failed 2 succeed 0 not save
  const [errMsg, setErrMsg] = useState("");
  const succeedMessage = "Data is saved successfully.";

  const { customer } = props;

  const handleClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const getSum = (items) => {
    let sumQty = items.reduce(function (total, item) {
      return total + item.qty;
    }, 0);
    let sumPrice = items.reduce(function (total, item) {
      return total + item.qty * item.price;
    }, 0);
    setSubtotalQty(sumQty);
    setSubtotalPrice(sumPrice);
  };

  const onSubmit = () => {
    try {
      handleSubmit();
      setSaveFlag(saveSign.succeed);
      setItems(undefined);
    } catch (err) {
      setSaveFlag(saveSign.fail);

      if (err && err.response.status === 400) {
        setErrMsg(err.response.data);
      } else {
        setErrMsg(JSON.stringify(err));
      }
      console.log("err", err.response.data);
    }
  };
  const handleSubmit = async () => {
    await items.map((item) => dispatch(addItem(item)));
  };

  const handleDelete = (deleted) => {
    const index = items.findIndex(
      (item) => item.productId === deleted.productId
    );
    let newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    dispatch(itemMoved(deleted));
  };

  useEffect((_) => {
    const handleScroll = (_) => {
      if (window.scrollY > 20) {
        setOffset(true);
      } else {
        setOffset(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return (_) => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="container m-0 p-0 " id="detailsTop">
      <div className="row my-1 border-bottom border-2 ">
        <h5>Order details</h5>
        <CustomerInfo customer={customer} />
      </div>
      {saveFlag === saveSign.fail && (
        <div className="alert alert-danger">{errMsg}</div>
      )}
      {saveFlag === saveSign.succeed && (
        <div className="alert alert-info">{succeedMessage}</div>
      )}
      <form onSubmit={onSubmit}>
        {(!items || items.length <= 0) && (
          <div className="alert alert-info">Cart is empty.</div>
        )}
        {items.map((record, index) => (
          <div className="row g-1 my-1" key={index}>
            <div className="col-sm-3 col-3">
              <img
                src={tree1}
                className="card-img-top"
                style={{ maxHeight: "100px", objectFit: "cover" }}
                alt="..."
              />
            </div>
            <div className="col-sm-4 col-4">
              <p className="lh-sm fs-6">{record.product.name}</p>
            </div>
            <div className="col-sm-5 col-5 fs-6">
              <label className="fw-bold">Price:&nbsp;{record.price}</label>
              <div className="input-group">
                <div className="input-group-text">Qty:&nbsp;</div>
                <input
                  type="number"
                  className="form-control"
                  id="inlineFormInputGroupUsername"
                  defaultValue={record.qty}
                  style={{ textOverflow: "ellipsis" }}
                />
              </div>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleDelete(record)}
              >
                delete
              </button>
            </div>
            <hr />
          </div>
        ))}
        <div className="d-flex justify-content-end">
          <p>
            Subtotal( {subtotalQty} items):
            <label className="fw-bold"> ${subtotalPrice} </label>
          </p>
          <p>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </p>
        </div>
      </form>
      {offset && (
        <div className="backToTop" onClick={handleClick}>
          <span className="badge  border-light bg-info rounded-circle p-3">
            <i className="fa fa-arrow-up" style={{ fontSize: "1.5rem" }}></i>
          </span>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
