import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import { Productrapper } from './styles';

export default function Product() {

    const [products, setProducts] = useState([]);

    const query = `{allSkus{id name salePrice imageUrl}}`;

    useEffect(() => {
        async function fetchData() {
            const products = await api.get(`graphql?query=${query}`);
            setProducts(products.data.data.allSkus);
        }
        fetchData();
    }, [])

    return (
        <>
            <Productrapper>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.imageUrl} alt=""/>
                        <h1>{product.name}</h1>
                        <p>{product.salePrice}</p>
                        <button>Ver detalhes</button>
                    </li>
                ))}
            </Productrapper>
        </>
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