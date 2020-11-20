import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { ProductWrapper } from './styles';

import defaultImage from '../../assets/image-placeholder.svg';

export default function Product(props) {

    const [products, setProducts] = useState([]);

    const query = `{allSkus{id name salePrice imageUrl}}`;

    useEffect(() => {
        async function fetchData() {
            const products = await api.get(`graphql?query=${query}`);
            setProducts(products.data.data.allSkus);
        }
        fetchData();
    }, []);

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

// {
//     id: 1,
//     name: 'Arquitetura de Computadores',
//     ean: '9788521616603',
//     category: 'Livros',
//     imageUrl:
//       'https://images-shoptime.b2w.io/produtos/01/00/sku/7134/2/7134233P.jpg',
//     description:
//       'A melhor forma de otimizar o aproveitamento da capacidade de um computador é compreender os princípios básicos do seu funcionamento',
//     package: {
//       height: 3,
//       width: 20,
//       depth: 28,
//       weight: 1307,
//     },
//     salePrice: 12990,
//     promotionalPrice: 8990,
//     quantity: 3,
//   },