import { WSF } from "components/atoms/wevesurfer/wavesurfer";
import { WidthChanger } from "templates/WidthChanger";
import { Container } from "@mui/material";
export const QuickMode = () => {
  return (
    <>
      <WidthChanger>
        <Container maxWidth={"xl"}>
          <WSF />
        </Container>
      </WidthChanger>
    </>
  );
};
