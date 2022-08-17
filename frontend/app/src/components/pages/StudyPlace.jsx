import { WSF_stock } from "../atoms/wavesurfer/wavesurfer";
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
