import client from "@/src/apollo/client";
import { BlockRenderer } from "@/src/components/BlockRenderer";
import { cleanAndTransformBlocks } from "@/utils/cleanAndTransformBlocks";
import { gql } from "@apollo/client";

export default function Home(props) {
  console.log("Props-1: ", props);
  return (
    <div>
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query PagesQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocks
          }
        }
      }
    `,
  });
  return {
    props: {
      blocks: cleanAndTransformBlocks(data?.nodeByUri?.blocks),
    },
  };
};
