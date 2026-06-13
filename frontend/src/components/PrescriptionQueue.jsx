export default function PrescriptionQueue({ prescriptions }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold">Prescription Queue</h2>
      <ul className="space-y-2 text-sm">
        {prescriptions.map((item) => (
          <li key={item.id} className="rounded border p-2">
            <div>{item.patient_name} — {item.medication}</div>
            <div className="text-slate-500">{item.gp_surgery} ({item.status})</div>
          </li>
        ))}
        {prescriptions.length === 0 && <li className="text-slate-500">No pending prescriptions</li>}
      </ul>
    </div>
  );
}
