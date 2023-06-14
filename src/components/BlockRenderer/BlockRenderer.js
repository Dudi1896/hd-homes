import { theme } from "@/theme";
import { Cover } from "../Cover";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";
import { CallToActionButton } from "../CallToActionButton";
import { Columns } from "../Columns";
import { Column } from "../Column";
import Image from "next/image";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "acf/ctabutton": {
        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            destination={block.attributes.data.destination || "/"}
            align={block.attributes.data.align}
          />
        );
      }

      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes.align}
            content={block.attributes.content}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        );
      }

      case "core/heading": {
        return (
          <Heading
            key={block.id}
            textAlign={block.attributes.textAlign}
            content={block.attributes.content}
            level={block.attributes.level}
          ></Heading>
        );
      }

      case "core/cover": {
        console.log("BLOCK: ", block);
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        );
      }

      case "core/columns": {
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        );
      }

      case "core/column": {
        return (
          <Column key={block.id} width={block.attributes.width}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }

      case "core/image": {
        return (
          <Image
            key={block.id}
            src={block.attributes.url}
            height={block.attributes.height}
            width={block.attributes.width}
            alt={block.attributes.alt || ""}
          />
        );
      }

      default:
        console.log("UNKNOWN-144: ", block);
        return null;
    }
  });
};
