import React from 'react';

const ProductVariantsForm = ({ productVariants, setProductData }) => {
    // Handle input change for variants
    const handleVariantChange = (index, event) => {
        const { name, value } = event.target;
        const updatedVariants = [...productVariants];
        updatedVariants[index] = {
            ...updatedVariants[index],
            [name]: value
        };
        setProductData(prevData => ({
            ...prevData,
            productVariants: updatedVariants
        }));
    };

    return (
        <div className="variants-section">
            <h3>Product Variants</h3>

            {productVariants.map((variant, index) => (
                <div key={index} className="variant-row">
                    <input
                        type="text"
                        name="size"
                        placeholder="Size"
                        value={variant.size}
                        onChange={(e) => handleVariantChange(index, e)}
                        required
                    />
                    <input
                        type="text"
                        name="color"
                        placeholder="Color"
                        value={variant.color}
                        onChange={(e) => handleVariantChange(index, e)}
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={variant.quantity}
                        onChange={(e) => handleVariantChange(index, e)}
                        required
                    />
                    <input
                        type="number"
                        name="pricePerUnit"
                        placeholder="Price Per Unit"
                        value={variant.pricePerUnit}
                        onChange={(e) => handleVariantChange(index, e)}
                        required
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductVariantsForm;
