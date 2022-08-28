import styled from "styled-components";

export const BackgroundColor = (props: any) => {
  const { children } = props;
  return (
    <Background>{children}</Background>
  )
}

const Background = styled.div`
  background-color: #f7f7ff;
`;
