import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../store/reducers/products";

import { getCategories } from "../../services/masterDataService";

function SearchItemBar(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.entities.products);

  const inputRef = useRef(null);
  const categoryRef = useRef(null);
  const [categories, setCategories] = useState(undefined);

  useEffect(() => {
    const result = getCategories();
    setCategories(result);
    dispatch(loadProducts());
  }, [dispatch]);

  const onFilter = () => {
    const filterCategory = categoryRef.current.value;
    const filterKey = inputRef.current.value;
    const filteredProducts = products.filter(
      (product) =>
        (filterCategory ? product.category === filterCategory : true) &&
        (filterKey ? product.name.toLowerCase().includes(filterKey) : true)
    );
    this.props.onFilter(filteredProducts);
  };

  return (
    <div className="row g-0 mb-1">
      <div className="col-sm-3 col-3">
        <label className="visually-hidden" for="specificSizeSelect">
          Categories
        </label>
        <select
          ref={categoryRef}
          className="form-select  bg-light"
          id="specificSizeSelect"
        >
          <option selected>Choose a category</option>
          {categories.map((category) => (
            <option value={category._id}>category.name</option>
          ))}
        </select>
      </div>
      <div className="col-sm-7 col-7">
        <label className="visually-hidden" for="specificSizeInputName">
          Name
        </label>
        <input
          ref={inputRef}
          className="form-control"
          type="text"
          placeholder="Enter item code,name,series..."
          aria-label="Item code ,name,series"
          autoFocus
        />
      </div>
      <div className="col-sm-2 col-2">
        <button
          className="btn  order_searchButton"
          type="button"
          onClick={onFilter}
        >
          <i className="fa fa-search" style={{ fontSize: "1rem" }}></i>
        </button>
      </div>
    </div>
  );
}

export default SearchItemBar;
