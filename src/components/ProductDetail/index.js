import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { BiChevronLeft } from 'react-icons/bi';

import { ProductWrapper } from './styles';

import api from '../../services/api';

import defaultImage from '../../assets/image-placeholder.svg';

const ProductDetail = (props) => {

    const productId = props.product.match.params.id;

    const [product, setProduct] = useState([0]);
    const [edit, setEdit] = useState(false);

    const [quantity, setQuantity] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [promotionalPrice, setPromotionalPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [depth, setDepth] = useState('');

    async function handleModify(e) {
        e.preventDefault();

        const updatedQuery = `{ mutation { updateSku(id:${productId}, quantity:${quantity}, salePrice: ${salePrice},){ quantity }}}`;

        try {
            await api.post(`?query=${updatedQuery}`).then(response => {
                console.log(response);
            })
        } catch (err) {
            alert(err)
        }
    }

    function editProduct() {
        setEdit(!edit);
    }

    useEffect(() => {
        async function asyncFunction() {
            const query = `{ Sku(id: ${productId}){ name imageUrl quantity salePrice promotionalPrice package }}`;
            await api.get(`?query=${query}`)
                .then(response => {
                    setProduct(response.data.data.Sku);
                });
        }
        asyncFunction();
    }, [productId]);

    return (
        <>
            <ProductWrapper>
                <div>
                    <div className="button-return" >
                        <Link className="link" to="/"><BiChevronLeft />Voltar</Link>
                    </div>
                    <div className="productView">

                        <form onSubmit={handleModify}>
                            <h1>{product.name}</h1>
                            <img src={product.imageUrl ? product.imageUrl : defaultImage} alt="" />

                            {edit ?
                                <>
                                    <p>Estoque:<input defaultValue={product.quantity} value={quantity} onChange={e => setQuantity(e.target.value)} /></p>
                                    <p>Preço de venda:<input defaultValue={product.salePrice} value={salePrice} onChange={e => setSalePrice(e.target.value)} /></p>
                                    <p>Preço Promocional:<input defaultValue={product.promotionalPrice} value={promotionalPrice} onChange={e => setPromotionalPrice(e.target.value)} /></p>
                                    <p>Peso: <input defaultValue={product.package?.weight} value={weight} onChange={e => setWeight(e.target.value)} /></p>
                                    <p>Altura: <input defaultValue={product.package?.height} value={height} onChange={e => setHeight(e.target.value)} /></p>
                                    <p>Largura: <input defaultValue={product.package?.width} value={width} onChange={e => setWidth(e.target.value)} /></p>
                                    <p>Profundidade: <input defaultValue={product.package?.depth} value={depth} onChange={e => setDepth(e.target.value)} /></p>
                                </>
                                :
                                <>
                                    <p>Estoque: {product.quantity}</p>
                                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.salePrice).length >= 12 ?
                                        <p>Preço de Venda: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.salePrice).replace('.', '').replace(/(\d{3})/, "$1.").replace(',', '').substr(0, 9)}</p>
                                        :
                                        <p>Preço de Venda: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.salePrice).replace('.', '').replace(/(\d{2})/, "$1.").replace(',', '').substr(0, 8)}</p>
                                    }
                                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionalPrice).length >= 12 ?
                                        <p>Preço Promocional: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionalPrice).replace('.', '').replace(/(\d{3})/, "$1.").replace(',', '').substr(0, 9)}</p>
                                        :
                                        <p>Preço Promocional: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionalPrice).replace('.', '').replace(/(\d{2})/, "$1.").replace(',', '').substr(0, 8)}</p>
                                    }
                                    <p>Peso: {product.package?.weight}</p>
                                    <p>Altura: {product.package?.height}</p>
                                    <p>Largura: {product.package?.width}</p>
                                    <p>Profundidade: {product.package?.depth}</p>
                                </>
                            }
                            {edit ?
                                <>
                                    <button type="submit"> Salvar </button>
                                    <button onClick={editProduct}>Cancelar</button>
                                </>
                                :
                                <button onClick={editProduct}>Editar Produto</button>
                            }
                        </form>
                    </div>
                </div>
            </ProductWrapper>
        </>
    )
}

export default ProductDetail;