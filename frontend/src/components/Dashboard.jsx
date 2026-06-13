import CallList from './CallList';
import CallTranscript from './CallTranscript';
import PrescriptionQueue from './PrescriptionQueue';
import CallbackQueue from './CallbackQueue';

export default function Dashboard({ data }) {
  return (
    <main className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      <CallList calls={data.calls} />
      <CallTranscript transcripts={data.transcripts} />
      <PrescriptionQueue prescriptions={data.prescriptions} />
      <CallbackQueue callbacks={data.callbacks} />
    </main>
  );
}
