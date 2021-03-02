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
import DataList from "../common/DataList";
import CustomerInfo from "../CustomerInfo";

class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.pageSize = 7;
    this.state = {
      filteredProduct: undefined,
      selectedCustomer: undefined,
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

  showCustomer = (selectedCustomer) => {
    this.setState({ selectedCustomer });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleAddItem = (product, qty) => {
    let newItem = {
      productId: product._id,
      customerId: this.state.selectedCustomer._id,
      quantity: qty,
      price: 10,
      coupon: "aaaa",
      product: product,
      customer: this.state.selectedCustomer,
    };
    this.props.itemAdded(newItem);
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
        <SearchItemBar onFilter={this.handleFilter} />
        <DataList
          data={this.state.customers}
          dataListTitle={"Select a customer..."}
          onBlur={this.showCustomer}
        />
        <CustomerInfo customer={this.state.selectedCustomer} />
        <hr />
        <div className="row clearfix">
          {currentPageData.map((product, index) => (
            <PlaceOrderProduct
              key={product._id}
              product={product}
              index={index}
              onClick={this.handleAddItem}
            />
          ))}
        </div>
        <Pagination
          itemsCount={totalCount}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

// bugs:    state.entities.bugs.list
const mapStateToProps = (state) => ({
  items: state.entities.items,
  customers: state.entities.customers,
});

const mapDispatchToProps = {
  loadCustomers,
  itemAdded,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);
