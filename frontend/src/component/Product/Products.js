import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>

          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;