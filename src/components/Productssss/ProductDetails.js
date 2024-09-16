import { useState,useEffect } from "react";
 
export default function ProductDetails({ product, onAddToCart, onBack }) {
    const [selectedVariant, setSelectedVariant] = useState(null);
 
    useEffect(() => {
        if (product && product.variants && product.variants.length > 0) {
            console.log('Product Variants:', product.variants);
            setSelectedVariant(product.variants[0]); // Set the first variant by default
        }
    }, [product]);
 
    const handleAddToCart = async () => {
       await onAddToCart(product.variants[0]); // Call the onAddToCart function with the product variant
      };
 
    function handleVariantChange(event) {
        const variantId = parseInt(event.target.value, 10);
        const variant = product.variants.find(v => v.productVariantId === variantId);
        setSelectedVariant(variant);
    }
 
    if (!product || !product.variants || product.variants.length === 0) {
        return <p>No variants available for this product.</p>;
    }
 
    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-4" onClick={onBack}>
                Back to Product Listing
            </button>
              <h2>{product.name}</h2>
            <p>{product.longDescription}</p>
            <h4>Available Variants</h4>
            <select className="form-select" value={selectedVariant?.productVariantId || ''} onChange={handleVariantChange}>
                {product.variants.map((variant) => (
                    <option key={variant.productVariantId} value={variant.productVariantId}>
                        {variant.size} - {variant.color} - ${variant.pricePerUnit}
                    </option>
                ))}
            </select>
            {/* <button
                className="btn btn-success mt-4"
                onClick={() => onAddToCart(selectedVariant)}
                disabled={!selectedVariant}
            >
                Add to Cart
            </button> */}
 
            <button className="btn btn-success mt-4" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
}
