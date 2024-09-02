import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProductData } from "./api";
import Loading from "./loader";
import NotFound from "./NotFound";
import BackButton from "./BackButton";
import { withCart, withAlert } from "./withProvider";
import withRouter from "./withRouter";

class ProdDet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prod: null,
      count: 1,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchProductData();
  }

  componentDidUpdate(prevProps) {
    // Check if the product ID has changed
    const { id } = this.props.match.params;
    if (prevProps.match.params.id !== id) {
      this.fetchProductData();
    }
  }

  fetchProductData = () => {
    const { id } = this.props.match.params;
    this.setState({ loading: true });

    getProductData(+id)
      .then((product) => {
        this.setState({ prod: product, loading: false }, this.updateCount);
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  updateCount = () => {
    const { cart } = this.props;
    const { id } = this.props.match.params;
    if (this.state.prod) {
      const cartItem = cart.find((item) => item.product.id === +id);
      const productCount = cartItem ? cartItem.quantity : 1;
      this.setState({ count: productCount });
    }
  };

  handleAddToCart = () => {
    const { addToCart, setAlert, cart } = this.props;
    const { id } = this.props.match.params;
    const { count } = this.state;
    addToCart(+id, count);
    setAlert({ type: "success", message: "Product added successfully" });
  };

  incrementCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  decrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count > 1 ? prevState.count - 1 : 1,
    }));
  };

  render() {
    const { prod, count, loading } = this.state;
    const { id } = this.props.match.params;

    if (loading) return <Loading />;
    if (!prod) return <NotFound />;

    return (
      <div className="mt-7 self-center bg-gray-200 max-w-6xl mx-auto py-2 px-4">
        <div className="flex max-w-4xl mx-auto mt-4">
          <BackButton />
        </div>
        <div className="flex flex-col sm:flex-row bg-white rounded-md p-5 border-2 mt-3 max-w-4xl mx-auto">
          <div className="sm:w-1/2">
            <img
              className="w-full h-auto object-cover"
              src="https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt={prod.title}
            />
          </div>
          <div className="flex flex-col pt-5 sm:pt-0 sm:pl-5 sm:w-1/2">
            <h1 className="text-black text-xl md:text-2xl lg:text-3xl">
              {prod.title}
            </h1>
            <h2 className="text-black text-md md:text-xl lg:text-2xl font-bold">
              ${prod.price}
            </h2>
            <p className="text-gray-500 text-sm sm:text-md">
              {prod.description}
            </p>
            <div className="flex flex-row items-center gap-2 mt-4">
              <div className="flex">
                <button
                  className="bg-red-300 text-white hover:bg-red-500 p-2 rounded-l-md"
                  onClick={this.decrementCount}
                >
                  -
                </button>
                <input
                  className="w-16 border-2 p-1 text-center"
                  type="text"
                  value={count}
                  readOnly
                />
                <button
                  className="bg-red-300 text-white hover:bg-red-500 p-2 rounded-r-md"
                  onClick={this.incrementCount}
                >
                  +
                </button>
              </div>
              <button
                className="text-white bg-red-500 px-6 py-2 rounded-md w-40 sm:w-auto"
                onClick={this.handleAddToCart}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 max-w-4xl mx-auto">
          <div>
            {+id > 1 && (
              <Link
                className="text-white bg-red-500 px-3 py-1 rounded-md"
                to={`/ProdDet/${+id - 1}`}
              >
                Prev
              </Link>
            )}
          </div>
          <Link
            className="text-white bg-red-500 px-3 py-1 rounded-md"
            to={`/ProdDet/${+id + 1}`}
          >
            Next
          </Link>
        </div>
      </div>
    );
  }
}

export default withCart(withAlert(withRouter(ProdDet)));
