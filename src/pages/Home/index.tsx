import React, { useEffect } from 'react';
import { useProducts } from '../../context/productsContext';
import { useCart } from '../../context/cartContext';
import Rating from '../../components/Rating';

type Props = {};

const Home = (props: Props) => {
  const { products, loadProducts } = useProducts();
  const { cart, loadCart } = useCart();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([loadProducts(), loadCart()]);
    } catch (error) {}
  };

  console.log(products);
  console.log(cart);

  return (
    <div>
      {products.map((product) => (
        <div className="mx-auto max-w-7xl my-8 px-4 grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
          <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-3">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover object-center"
            />
          </div>
          <div className="sm:col-span-8 lg:col-span-9">
            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
              {product.title}
            </h2>

            <section aria-labelledby="information-heading" className="mt-2">
              <h3 id="information-heading">{product.description}</h3>

              <p className="text-2xl text-gray-900">{product.price}</p>

              {/* Reviews */}
              <Rating {...product.rating} />
            </section>

            <section aria-labelledby="options-heading" className="mt-10">
              <button
                type="button"
                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
