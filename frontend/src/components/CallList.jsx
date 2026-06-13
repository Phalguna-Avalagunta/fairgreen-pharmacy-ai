export default function CallList({ calls }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold">Recent Calls</h2>
      <ul className="space-y-2 text-sm">
        {calls.map((call) => (
          <li key={call.id} className="rounded border p-2">
            <div>{call.phone_number}</div>
            <div className="text-slate-500">{call.category}</div>
          </li>
        ))}
        {calls.length === 0 && <li className="text-slate-500">No calls yet</li>}
      </ul>
    </div>
  );
}
