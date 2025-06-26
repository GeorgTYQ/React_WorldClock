import styled from "styled-components";

const StyledCity = styled.div`
  color: ${({light, theme})=>light ? theme.color.dark : theme.color.light};
  margin-bottom: ${props => props.margin_bottom};
`

const City = (props)=> {
  const {...rest} = props;
  const margin_bottom = "2rem"
  return (
    <StyledCity margin_button = {margin_bottom} {...rest}>
      {props.children}
    </StyledCity>
  )
}

export default City;