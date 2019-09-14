import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    display: flex;
    margin-top: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    justify-content: center;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 24%;
    box-sizing: border-box;
    background-color: #fff;
    -webkit-border-radius: 2px;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    margin: 7px;
    overflow: hidden;
    position: relative;
    -webkit-transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
    transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
    img {
        width: 100%;
        flex: 1;
    }
`;

const GridTwo = () => {
    const [images, setImage] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/images').then(result => {
            console.log('res', result);
            setImage(result.data);
        });
    }, []);

    return (
        <Container>
            {images.map(image => (
                <ImageContainer key={image.src}>
                    <picture>
                        <source
                            srcSet={getSrcSet([
                                image.optimized_webp,
                                image.desktop_webp,
                                image.ipad_landscape_webp,
                                image.ipad_portrait_webp,
                                image.large_webp,
                                image.phone_landscape_webp,
                                image.phone_portrait_webp,
                            ])}
                            sizes="400px"
                            type="image/webp"
                        />
                        <source
                            srcSet={getSrcSet([
                                image.optimized_jpg,
                                image.desktop_jpg,
                                image.ipad_landscape_jpg,
                                image.ipad_portrait_jpg,
                                image.large_jpg,
                                image.phone_landscape_jpg,
                                image.phone_portrait_jpg,
                            ])}
                            sizes="400px"
                            type="image/jpeg"
                        />
                        <img src={image.optimized_jpg.url} alt="Alt Text!" />
                    </picture>
                    <FileName src={image.src} />
                </ImageContainer>
            ))}
        </Container>
    );
};

const getSrcSet = images => {
    const srcset = images.reduce((acc, image) => {
        acc = image.url ? acc + `${image.url} ${image.width}w, ` : acc;
        return acc;
    }, '');
    let cleanSrcset = srcset.substring(0, srcset.length - 2);

    return cleanSrcset;
};

const FileName = ({ src }) => {
    const name = src.substring(src.lastIndexOf('/') + 1, src.indexOf('.'));
    return <h3>{name}</h3>;
};

export default GridTwo;