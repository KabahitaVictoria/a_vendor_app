const ProductNav = (props) => {
    return (
      <div className="product-nav">
        <a href="/dashboard/biz_profile">
          <h4>{props.bus_name}</h4>
        </a>
        <img src="/icons/right-arrow.png" alt="" />
        <h4>{props.productName}</h4>
      </div>
    );
}

export default ProductNav;