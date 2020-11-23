import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { ProductWrapper } from './styles';

import defaultImage from '../../assets/image-placeholder.svg';

export default function Product() {

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
                        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.salePrice).length >= 12 ?
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.salePrice).replace('.', '').replace(/(\d{3})/, "$1.").replace(',', '').substr(0, 9)} </p>
                            :
                            <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.salePrice).replace('.', '').replace(/(\d{2})/, "$1.").replace(',', '').substr(0, 8)}</p>
                        }
                        <Link className="link" to={`/product/${product.id}`}>Ver detalhes</Link>
                    </li>
                ))}
            </ul>
        </ProductWrapper>
    )
}