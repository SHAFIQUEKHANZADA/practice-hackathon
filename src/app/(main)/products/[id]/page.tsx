 
import { products } from '@/app/components/ProductArray';
 
 

interface ProductProps {
  params: {
    id: string;
  };
}

const ProductDetail = ({ params }: ProductProps) => {
  // Find the product by id from your product data
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.slug}</h1>
      <img src={product.image} alt={product.image} width={500} height={500} />
      <p>Category: {product.category}</p>
      <p>Sale Price: ${product.salePrice}</p>
      <p>Original Price: ${product.originalPrice}</p>
      <p>Rating: {product.rating} stars</p>
      <p>Rated by: {product.ratedBy} customers</p>
      {/* Add more product details */}
    </div>
  );
};

export default ProductDetail;
