import styled from "styled-components";

export const WidthChanger = (props: any) => {
  const { children } = props;
  return (
    <>
      <Width>
        {children}
      </Width>
    </>
  )
}

const Width = styled.div`
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  color: #ff4400;
  justify-content: center;
  text-align: center;
`;
