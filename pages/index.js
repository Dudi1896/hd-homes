import client from '@/src/apollo/client';
import { gql } from '@apollo/client';

export default function Home(props) {
  console.log('Props-1: ', props)
  return <div>Next JS &amp; WordPress course.</div>;
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
    }`,
  })
  return{
    props: {
      blocks: data?.nodeByUri?.blocks,
      myexampleprop: "test"
    }
  }
}