import client from "@/src/apollo/client";
import { BlockRenderer } from "@/src/components/BlockRenderer";
import { MainMenu } from "@/src/components/MainMenu";
import { cleanAndTransformBlocks } from "@/utils/cleanAndTransformBlocks";
import { mapMainMenuItems } from "@/utils/mapMainMenuItems";
import { gql } from "@apollo/client";

export default function Home(props) {
  console.log("Props-1: ", props);
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
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query PageQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocks
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              label
              destination {
                ... on Page {
                  id
                  uri
                }
              }
            }
            menuItems {
              menuItem {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
              items {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      mainMenuItems: mapMainMenuItems(
        data.acfOptionsMainMenu.mainMenu.menuItems
      ),
      callToActionLabel:
        data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination:
        data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
      blocks: cleanAndTransformBlocks(data?.nodeByUri?.blocks),
    },
  };
};
