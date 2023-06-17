import client from "@/src/apollo/client";
import { gql } from "@apollo/client";
import { BlockRenderer } from "@/src/components/BlockRenderer";
import { getPageStaticProps } from '@/utils/getPageStaticProps';

export default function Page(props) {
  console.log("PAGE PROPS: ", props);
  return (
    <div>
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
}

export const getStaticProps = getPageStaticProps;

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPagesQuery {
        pages {
          nodes {
            uri
          }
        }
        properties {
          nodes {
            uri
          }
        }
      }
    `,
  });

  return {
    paths: [...data.pages.nodes, ...data.properties.nodes]
      .filter((page) => page.uri !== "/")
      .map((page) => ({
        params: {
          slug: page.uri.substring(1, page.uri.length - 1).split("/"),
        },
      })),
    fallback: "blocking",
  };
};
