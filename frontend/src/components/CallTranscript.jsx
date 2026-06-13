export default function CallTranscript({ transcripts }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold">Transcript Audit Trail</h2>
      <ul className="space-y-2 text-sm">
        {transcripts.map((line) => (
          <li key={line.id} className="rounded border p-2">
            <span className="font-semibold">{line.speaker}: </span>
            {line.text}
          </li>
        ))}
        {transcripts.length === 0 && <li className="text-slate-500">No transcript selected</li>}
      </ul>
    </div>
  );
}
