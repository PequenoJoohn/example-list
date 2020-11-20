import React, { useEffect, useState } from 'react';

import { ProductWrapper } from './styles';

import api from '../../services/api';
import { Link } from 'react-router-dom';

const ProductDetail = (props) => {

    const productId = props.product.match.params.id;

    const [product, setProduct] = useState([0]);


        useEffect(() => {
            async function asyncFunction() {
                const query = `{ Sku(id: ${productId}){ name imageUrl quantity salePrice promotionalPrice package }}`;
                await api.get(`?query=${query}`)
                    .then(response => {
                        setProduct(response.data.data.Sku);
                        console.log(response.data.data.Sku);
                    });
            }
            asyncFunction();
        }, [productId]);

    return (
        <>
            <ProductWrapper>
                <div>

                    <div className="button-return" >
                        <Link to="/">Voltar</Link>
                    </div>
                    <div className="productView">
                        <h1>{product.name}</h1>
                        <img src={product.imageUrl} alt="" />
                        <p>Estoque: {product.quantity}</p>
                        <p>Preço de venda: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((String(product.salePrice).slice(0, -2)))}</p>
                        <p>Preço Promocional: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((String(product.promotionalPrice).slice(0, -2)))}</p>
                        <p>Peso: {product.package.weight}</p>
                        <p>Altura: {product.package.height}</p>
                        <p>Largura: {product.package.width}</p>
                        <p>Profundidade: {product.package.depth}</p>
                        <button>Editar Produto</button>
                    </div>
                </div>
            </ProductWrapper>
        </>
    )
}

export default ProductDetail;