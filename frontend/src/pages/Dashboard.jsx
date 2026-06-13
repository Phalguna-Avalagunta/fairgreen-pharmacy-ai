import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import socket from '../services/socket';
import Dashboard from '../components/Dashboard';

export default function DashboardPage() {
  const [calls, setCalls] = useState([]);
  const [transcripts, setTranscripts] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [callbacks, setCallbacks] = useState([]);

  const loadData = async () => {
    const [callsRes, prescriptionsRes, callbacksRes] = await Promise.all([
      api.get('/calls'),
      api.get('/prescriptions'),
      api.get('/callbacks'),
    ]);

    setCalls(callsRes.data || []);
    setPrescriptions(prescriptionsRes.data || []);
    setCallbacks(callbacksRes.data || []);

    if (callsRes.data?.[0]?.id) {
      const transcriptRes = await api.get(`/transcripts/${callsRes.data[0].id}`);
      setTranscripts(transcriptRes.data || []);
    }
  };

  useEffect(() => {
    loadData().catch(() => undefined);
    socket.connect();
    socket.on('call:update', loadData);

    return () => {
      socket.off('call:update', loadData);
      socket.disconnect();
    };
  }, []);

  const data = useMemo(() => ({ calls, transcripts, prescriptions, callbacks }), [calls, transcripts, prescriptions, callbacks]);

  return (
    <div>
      <header className="bg-emerald-700 p-4 text-white">
        <h1 className="text-2xl font-semibold">Fairgreen Pharmacy AI Dashboard</h1>
      </header>
      <Dashboard data={data} />
    </div>
  );
}
