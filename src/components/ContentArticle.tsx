import { ArrowUpRight, Check } from 'lucide-react';
interface Block {
  type: string;
  text: string;
  href?: string;
}
function Paragraphs({ blocks }: { blocks: Block[] }) {
  const nodes = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "item") {
      const items = [];
      do {
        items.push(
          <li key={i}>
            <Check size={16} />
            <span>{blocks[i].text}</span>
          </li>,
        );
        i++;
      } while (i < blocks.length && blocks[i].type === "item");
      i--;
      nodes.push(
        <ul className="detail-list" key={`list-${i}`}>
          {items}
        </ul>,
      );
    } else if (block.type === "link")
      nodes.push(
        <a className="text-link" href={block.href || "#"} key={i}>
          {block.text}
          <ArrowUpRight size={16} />
        </a>,
      );
    else nodes.push(<p key={i}>{block.text}</p>);
  }
  return <>{nodes}</>;
}
function sectionsFor(blocks: Block[]) {
  const sections: { title: string; blocks: Block[] }[] = [
    { title: "Overview", blocks: [] },
  ];
  for (const block of blocks) {
    if (block.type === "heading")
      sections.push({ title: block.text, blocks: [] });
    else sections.at(-1)!.blocks.push(block);
  }
  return sections.filter((s) => s.blocks.length > 0 || s.title !== "Overview");
}
export function ContentArticle({ blocks }: { blocks: Block[] }) {
  const sections = sectionsFor(blocks);
  return (
    <div className="article-layout">
      <aside className="contents-panel">
        <p className="eyebrow">ON THIS PAGE</p>
        <nav aria-label="Page contents">
          {sections.map((section, i) => (
            <a key={i} href={`#section-${i}`}>
              {section.title}
            </a>
          ))}
        </nav>
        <a className="button button-dark" href="/contact/">
          Discuss your project
        </a>
      </aside>
      <div className="detail-body">
        {sections.map((section, i) =>
          section.title.endsWith("?") ? (
            <details className="faq-section" key={i} id={`section-${i}`} open>
              <summary>{section.title}</summary>
              <Paragraphs blocks={section.blocks} />
            </details>
          ) : (
            <section id={`section-${i}`} className="content-section" key={i}>
              <h2>{section.title}</h2>
              <Paragraphs blocks={section.blocks} />
            </section>
          ),
        )}
      </div>
    </div>
  );
}
