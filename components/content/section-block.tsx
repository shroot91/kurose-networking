interface SectionBlockProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function SectionBlock({ id, title, children }: SectionBlockProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
