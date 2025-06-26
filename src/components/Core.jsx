import React from 'react'
import styled from 'styled-components'


const StyledCore = styled.div`
  display:flex;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  border-radius: 50%;
  width: ${props => props.block_size}px;
  aspect-ratio: 1/1;
  z-index: ${props => props.z_index};
  transform: rotate(${props => props.angle}deg);
  &::before {
    content: "";
    width: ${props => props.pointer_width}px;
    height: ${props => `calc(${props.block_size / 2}px + ${props.tail}px)`};
    background: ${props => props.light ? props.pointer_light : props.pointer_dark}; 
    border-radius: ${props => props.pointer_radius};
  }
`

const Core = (props) => {
  const { ...rest } = props
  const config = {
    light: true,
    block_size: 100,
    tail: 20,
    z_index: 0,
    pointer_width: 4,
    pointer_light: "#ff6767",
    pointer_dark: "#69c0ff",
    pointer_radius: "6px 6px 3px 3px",
    angle: 0
  }
  return <StyledCore {...config} {...rest} />

}

export default Core