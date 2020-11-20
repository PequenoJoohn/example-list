import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { ProductWrapper } from './styles';

import defaultImage from '../../assets/image-placeholder.svg';

export default function Product(props) {

    const [products, setProducts] = useState([]);

    
    useEffect(() => {
        async function fetchData() {
            const query = `{allSkus{id name salePrice imageUrl}}`;
            const products = await api.get(`graphql?query=${query}`);
            setProducts(products.data.data.allSkus);
        }
        fetchData();
    }, [setProducts]);

    return (
        <ProductWrapper>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.imageUrl ? product.imageUrl : defaultImage} alt="" />
                        <h1>{product.name}</h1>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((String(product.salePrice).slice(0, -2)))}</p>
                        <Link to={`/product/${product.id}`}>Ver detalhes</Link>
                    </li>
                ))}
            </ul>
        </ProductWrapper>
    )
}