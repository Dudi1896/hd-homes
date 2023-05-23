import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocksJSON) => {
  const blocks = JSON.parse(JSON.stringify(blocksJSON));

  const asssignIds = (b) => {
    b.forEach((block) => {
      block.id = uuid();
      if (block.innerBlocks?.length) {
        asssignIds(block.innerBlocks);
      }
    });
  };

  asssignIds(blocks);

  return blocks;
};
