import styled from "styled-components";
export const AddText = (props: any) => {
  const { children } = props;
  return (
    <Text>{children}</Text>
  )
}

const Text = styled.div`
  text-align: center;
`;
