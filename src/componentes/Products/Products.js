import React from 'react'
import { Row, Container } from 'react-bootstrap'
import Loading from '../Loading'
import Product from '../Product'

export default function Products (props) {
    const { products: { loading, result, error }, addProductCart } = props

    return (
        <Container>
            <Row>
                {loading || !result ? (
                    <Loading />
                ) : (
                    result.map((product, index) => (
                        <Product product={product} key={index} addProductCart={addProductCart} />
                    ))
                )}
            </Row>
        </Container>
    )
}
