import React, { useEffect, useState } from 'react';

import { ProductWrapper } from './styles';

import defaultImage from '../../assets/image-placeholder.svg';
import api from '../../services/api';

const ProductDetail = (props) => {

    const productId = props.product.match.params.id;

    const [product, setProduct] = useState([]);

    const query = `{Sku(id: ${productId}){
            name
            imageUrl
            quantity
            salePrice
            promotionalPrice
            package
        }
    }
`;

    useEffect(() => {
        async function asyncFunction() {
            await api.get(`?query=${query}`)
                .then(response => {
                    setProduct(response.data.data.Sku);
                    console.log(response.data.data.Sku);
                });
        }
        asyncFunction();
    }, [setProduct]);

    return (
        <>
            <ProductWrapper>
                <ul>
                    <li>

                        <h1>{product.name}</h1>
                        <img src={product.imageUrl} alt="" />

                        <p>Estoque: {product.quantity}</p>
                        <ul>
                            <button>+</button>
                            <button>-</button>
                        </ul>

                        <p>Preço de venda: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((String(product.salePrice).slice(0, -2)))}</p>
                        <p>Preço Promocional: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((String(product.promotionalPrice).slice(0, -2)))}</p>
                        <p>Peso: {product.package.weight}</p>
                        <p>Altura: {product.package.height}</p>
                        <p>Largura: {product.package.width}</p>
                        <p>Profundidade: {product.package.depth}</p>
                    </li>
                </ul>
            </ProductWrapper>
        </>
    )
}

export default ProductDetail;