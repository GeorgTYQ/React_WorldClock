import styled from "styled-components";
// import Core from "./Core";

const CenterStyled = styled.div`
  width: ${props => props.size};
  aspect-ratio: 1/1;
  background-color: ${props => props.light ? props.black : props.white};
  border-radius: 50%;
  z-index: 10;
  border: ${props => props.border};
`

const Center = (props) =>{
  const {...rest} = props;
  const config ={
    light: true,
    size: "15px",
    white: "#fff",
    black: "#222",
    border: "2px solid #ffffff",
  }
  return ( 
    <>
    <CenterStyled {...config} {...rest} />
    </>
  )
}

export default Center;