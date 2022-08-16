import { WSF_stock } from "../atoms/wevesurfer/wavesurfer";
import { WidthChanger } from "templates/WidthChanger";

export const StudyPlace = () => {
  return (
    <>
      <WidthChanger>
        <WSF_stock />
      </WidthChanger>
    </>
  );
};
