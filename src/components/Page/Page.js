import { MainMenu } from "../MainMenu";
import { BlockRenderer } from "../BlockRenderer";

export const Page = (props) => {
  console.log("Props-144: ", props);
  return (
    <div>
      <MainMenu
        items={props.mainMenuItems}
        callToActionDestination={props.callToActionDestination}
        callToActionLabel={props.callToActionLabel}
      />
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
};
