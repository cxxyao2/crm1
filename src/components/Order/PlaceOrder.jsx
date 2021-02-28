import React, { Component } from "react";
import { connect } from "react-redux";
import "./PlaceOrder.css";

import { itemAdded } from "../../store/reducers/cartItems";
import { loadCustomers } from "../../store/reducers/customers";

import SearchItemBar from "./SearchItemBar";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import _ from "lodash";
import PlaceOrderProduct from "./PlaceOrderProduct";

class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.pageSize = 7;
    this.state = {
      filteredProduct: undefined,
      currentPage: 1,
      sortPath: { column: "name", order: "asc" },
    };
  }

  componentDidMount() {
    this.props.loadCustomers();
  }

  handleFilter = (filteredProduct) => {
    this.setState({ filteredProduct });
  };

  getImageFile = (productOrder) => {
    let index = productOrder % 7;
    let image = require(`../../images/motor${index}.jpg`);
    return image.default;
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { filteredProduct, currentPage, sortPath } = this.state;
    let filtered = filteredProduct;
    if (!filtered || filtered.length < 1)
      return { totalCount: 0, currentPageData: [] };

    const sorted = _.orderBy(filtered, [sortPath.column], [sortPath.order]);
    const currentPageData = paginate(sorted, currentPage, this.pageSize);

    return { totalCount: filtered.length, currentPageData };
  };

  render() {
    const { totalCount, currentPageData } = this.getPagedData();
    return (
      <div className="container">
        <form>
          <SearchItemBar onFilter={this.handleFilter} />
          <hr />
          <div className="row clearfix">
            {currentPageData.map((product, index) => (
              <PlaceOrderProduct
                key={product._id}
                product={product}
                index={index}
              />
            ))}
          </div>
          <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </form>
      </div>
    );
  }
}

// bugs:    state.entities.bugs.list
const mapStateToProps = (state) => ({
  items: state.entities.items,
});

const mapDispatchToProps = {
  loadCustomers,
  itemAdded,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);
