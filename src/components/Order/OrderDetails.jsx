import React, { useEffect, useState } from "react";
import tree1 from "../../images/autraliaoil@1x.jpg";
import "./OrderDetails.css";

function OrderDetails(props) {
  const [offset, setOffset] = useState(false);

  const handleClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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

        <label className="fs-6 col-12 col-md-6">Client Name: Mike</label>
        <label className="fs-6 col-12 col-md-6">
          Address: 145 rue avenue luxe
        </label>
      </div>
      <form>
        {[1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12].map((data, index) => (
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
              <p className="lh-sm fs-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                dolor error pariatur voluptates fugiat possimus explicabo
                veritatis. Rerum, id neque.
              </p>
            </div>
            <div className="col-sm-5 col-5 fs-6">
              <label className="fw-bold">Price:&nbsp;$12</label>
              <div className="input-group">
                <div className="input-group-text">Qty:&nbsp;</div>
                <input
                  type="number"
                  className="form-control"
                  id="inlineFormInputGroupUsername"
                  placeholder="1111"
                  style={{ textOverflow: "ellipsis" }}
                />
              </div>
            </div>
            <hr />
          </div>
        ))}
        <div className="d-flex justify-content-end">
          Subtotal(4 items):<label className="fw-bold"> $12.34 </label>
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
