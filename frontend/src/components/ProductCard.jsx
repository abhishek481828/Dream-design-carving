export default function ProductCard({ product, imgStyle }) {
    return (
      <div>
        {product.title && <h3>{product.title}</h3>}
        <img src={product.images[0]} alt={product.title || 'Product'} style={imgStyle} />
        {product.description && <p>{product.description}</p>}
      </div>
    );
  }
