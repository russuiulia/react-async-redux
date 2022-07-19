import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const PRODUCTS = [
    {
      id: 'p1',
      price: 6,
      title: 'My First Book',
      description: 'The first book i ever wrote'
    },
    {
      id: 'p2',
      price: 12,
      title: 'My Second Book',
      description: 'The second book i ever wrote'
    }, {
      id: 'p3',
      price: 24,
      title: 'My Third Book',
      description: 'The thirds book i ever wrote'
    }

  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          PRODUCTS.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.price}
            />
          ))
        }

      </ul>
    </section>
  );
};

export default Products;
