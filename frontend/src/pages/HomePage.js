import {
  useEffect,
  useReducer,
  axios,
  Loading,
  MessageBox,
  GET_SUCCESS,
  GET_FAIL,
  GET_REQUEST,
  homePageReducer,
  Row,
  Col,
  ProductItem,
} from '../Imports';

const HomePage = () => {
  const [{ loading, error, products }, dispatch] = useReducer(homePageReducer, {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const res = await axios.get('/api/v1/products');
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: err.message });
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.token} lg={3} md={4} sm={6} className="mb-5">
                <ProductItem product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomePage;
