const ROW_ONE = ['SOFTWARE DEVELOPER', 'FULL-STACK', 'AI / ML', 'RAG SYSTEMS', 'AI AGENTS', 'BACKEND', 'MOBILE']
const ROW_TWO = ['REACT', 'NODE.JS', 'FASTAPI', 'LANGCHAIN', 'LANGGRAPH', 'FLUTTER', 'PYTHON', 'MONGODB']

function Row({ items, reverse, duration }: { items: string[]; reverse?: boolean; duration: number }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div
        className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className="mx-4 flex items-center gap-4 whitespace-nowrap sm:mx-6">
            <span className="font-display text-3xl font-medium uppercase tracking-tight text-fg/90 sm:text-5xl">
              {item}
            </span>
            <span aria-hidden="true" className="text-lg text-accent sm:text-2xl">
              ✳
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="border-y border-line bg-bg py-6 sm:py-8">
      <Row items={ROW_ONE} duration={28} />
      <div className="h-4 sm:h-6" />
      <Row items={ROW_TWO} reverse duration={34} />
    </div>
  )
}
