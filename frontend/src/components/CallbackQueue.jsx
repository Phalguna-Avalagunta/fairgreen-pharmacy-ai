export default function CallbackQueue({ callbacks }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold">Callback Queue</h2>
      <ul className="space-y-2 text-sm">
        {callbacks.map((item) => (
          <li key={item.id} className="rounded border p-2">
            <div>{item.patient_name}</div>
            <div className="text-slate-500">{item.reason}</div>
          </li>
        ))}
        {callbacks.length === 0 && <li className="text-slate-500">No callbacks pending</li>}
      </ul>
    </div>
  );
}
