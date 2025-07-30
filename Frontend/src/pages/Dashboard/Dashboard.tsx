import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getSessionId } from "../Login/LoginPage";

function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const sessionId = getSessionId();
        fetch(`/api/scrape/dashboard?sessionId=${sessionId}`)
            .then(res => res.json())
            .then(json => { setData(json); setLoading(false); })
            .catch(err => { setError(err.message); setLoading(false); });
    }, []);

    return (
        <div className="PageContainer">
            <div className="DashboardContainer">
                <h2>Dashboard</h2>
                {loading && <div className="h-screen flex items-center justify-center"><div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full" /></div>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                {data && <pre style={{ textAlign: 'left', background: '#f4f4f4', padding: 16, borderRadius: 8, overflowX: 'auto' }}>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        </div>
    );
}

export default Dashboard;