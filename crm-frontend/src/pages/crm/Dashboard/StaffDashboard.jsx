import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import axios from 'axios';

const StaffDashboard = () => {
  const [staffDetails, setStaffDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionStart, setSessionStart] = useState(Date.now());
  const [sessionDuration, setSessionDuration] = useState('00:00:00');
  const [kpis, setKpis] = useState({
    activeCases: 0,
    leads: 0,
    newLeads: 0,
    currentLeads: 0,
    totalClients: 0,
    totalDebt: 0,
    checklistTasks: 0
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('employee');
    if (!data) {
      setError('No staff session found. Please log in.');
      setIsLoading(false);
      return;
    }
    const user = JSON.parse(data);
    axios.get(`http://localhost:5000/api/employee-auth/${user.staff_id}`)
      .then(res => setStaffDetails(res.data))
      .catch((err) => {
        console.error('Error fetching staff details:', err?.response?.data || err.message || err);
        setError('Failed to fetch staff details.');
      });
    axios.get(`http://localhost:5000/api/staff/${user.staff_id}/kpis`)
      .then(res => setKpis({
        activeCases: res.data.activeCases || 0,
        leads: res.data.leads || 0,
        newLeads: res.data.newLeads || 0,
        currentLeads: res.data.currentLeads || 0,
        totalClients: res.data.totalClients || 0,
        totalDebt: res.data.totalDebt || 0,
        checklistTasks: res.data.checklistTasks || 0
      }))
      .catch(() => setError('Failed to fetch KPIs.'));
    axios.get(`http://localhost:5000/api/staff/${user.staff_id}/tasks`)
      .then(res => setTasks(res.data))
      .catch(() => setError('Failed to fetch tasks.'));
    setIsLoading(false);
    setSessionStart(Date.now());
    const timer = setInterval(() => {
      const diff = Date.now() - sessionStart;
      const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setSessionDuration(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStart]);

  return (
    <div style={{ display: 'flex', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', minHeight: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '32px 8vw 32px 32px' }}>
        {/* Modern Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', background: 'rgba(255,255,255,0.95)', borderRadius: '16px', boxShadow: '0 4px 24px #dbeafe', padding: '24px 40px', margin: '0 0 32px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <span style={{ fontSize: '20px', color: '#0070f3', fontWeight: 'bold', letterSpacing: '2px', textShadow: '0 1px 4px #e3e3e3' }}>Staff Dashboard</span>
            <span style={{ fontSize: '32px', color: '#222', fontWeight: 'bold', marginLeft: '12px', textShadow: '0 2px 8px #e3e3e3', letterSpacing: '2px' }}>PENNY DEBT</span>
          </div>
          {staffDetails && (
            <div style={{ background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', borderRadius: '12px', boxShadow: '0 2px 12px #dbeafe', padding: '16px 28px', minWidth: '200px', textAlign: 'right' }}>
              <div style={{ fontSize: '15px', color: '#0070f3', fontWeight: 'bold', marginBottom: '2px', letterSpacing: '1px' }}>Logged in as</div>
              <div style={{ fontSize: '18px', color: '#222', fontWeight: 'bold', marginBottom: '2px' }}>{staffDetails.full_name}</div>
              <div style={{ fontSize: '14px', color: '#555', marginBottom: '2px' }}>ID: {staffDetails.staff_id}</div>
              <div style={{ fontSize: '14px', color: '#555' }}>{staffDetails.email}</div>
            </div>
          )}
        </div>
        {/* Session Timer */}
        <div style={{ marginBottom: '16px', color: '#555', fontSize: '15px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 6px #e3e3e3', padding: '10px 18px', display: 'inline-block' }}>
          <b>Session Duration:</b> {sessionDuration}
        </div>
        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <button style={{ background: 'linear-gradient(90deg,#0070f3,#4fc3f7)', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 22px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 8px #e3e3e3' }}
            onClick={async () => {
              const data = localStorage.getItem('employee');
              if (!data) return;
              const user = JSON.parse(data);
              await axios.post('http://localhost:5000/api/staff/case', {
                title: 'New Case',
                description: 'Auto-created from dashboard',
                assigned_to: user.staff_id
              });
              alert('New case created!');
            }}
          >New Case</button>
          <button style={{ background: '#00b894', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 18px', cursor: 'pointer' }}
            onClick={async () => {
              const data = localStorage.getItem('employee');
              if (!data) return;
              const user = JSON.parse(data);
              await axios.post('http://localhost:5000/api/staff/lead', {
                name: 'New Lead',
                contact: 'N/A',
                assigned_to: user.staff_id
              });
              alert('New lead added!');
            }}
          >Add Lead</button>
          <button style={{ background: '#fdcb6e', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 18px', cursor: 'pointer' }}
            onClick={async () => {
              const data = localStorage.getItem('employee');
              if (!data) return;
              const user = JSON.parse(data);
              await axios.post('http://localhost:5000/api/staff/checklist', {
                staff_id: user.staff_id,
                task: 'Checklist Task',
                completed: false
              });
              alert('Checklist task added!');
            }}
          >Checklist</button>
        </div>
        {/* KPIs - Dynamic Slabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
          <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px #e3e3e3', padding: '16px', minWidth: '120px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', color: '#0070f3', fontWeight: 'bold' }}>{kpis.newLeads}</div>
            <div style={{ color: '#555', fontSize: '13px' }}>New Leads</div>
          </div>
          <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px #e3e3e3', padding: '16px', minWidth: '120px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', color: '#00b894', fontWeight: 'bold' }}>{kpis.currentLeads}</div>
            <div style={{ color: '#555', fontSize: '13px' }}>Current Leads</div>
          </div>
          <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px #e3e3e3', padding: '16px', minWidth: '120px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', color: '#fdcb6e', fontWeight: 'bold' }}>{kpis.activeCases}</div>
            <div style={{ color: '#555', fontSize: '13px' }}>Active Cases</div>
          </div>
          <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px #e3e3e3', padding: '16px', minWidth: '120px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', color: '#6c5ce7', fontWeight: 'bold' }}>{kpis.totalClients}</div>
            <div style={{ color: '#555', fontSize: '13px' }}>Total Clients Enrolled</div>
          </div>
          <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px #e3e3e3', padding: '16px', minWidth: '120px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', color: '#d63031', fontWeight: 'bold' }}>{kpis.totalDebt}</div>
            <div style={{ color: '#555', fontSize: '13px' }}>Total Debt Enrolled</div>
          </div>
          <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px #e3e3e3', padding: '16px', minWidth: '120px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', color: '#00b894', fontWeight: 'bold' }}>{kpis.checklistTasks}</div>
            <div style={{ color: '#555', fontSize: '13px' }}>Checklist Tasks</div>
          </div>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {staffDetails && (
          <div style={{ background: 'rgba(255,255,255,0.98)', borderRadius: '14px', boxShadow: '0 2px 12px #dbeafe', padding: '28px', marginBottom: '30px', minWidth: '260px', transition: 'box-shadow 0.2s' }}>
            <h2 style={{ color: '#0070f3' }}>Staff Details</h2>
            <p><b>Name:</b> {staffDetails.full_name}</p>
            <p><b>Staff ID:</b> {staffDetails.staff_id}</p>
            <p><b>Email:</b> {staffDetails.email}</p>
            <p><b>Role:</b> {staffDetails.role}</p>
            <p><b>Status:</b> {staffDetails.status || 'Active'}</p>
          </div>
        )}
        <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px #e3e3e3', padding: '24px' }}>
          <h2 style={{ color: '#0070f3', marginBottom: '12px' }}>Assigned Tasks</h2>
          <ul style={{ paddingLeft: '18px', fontSize: '16px', color: '#333' }}>
            {tasks.length > 0 ? tasks.map((task, idx) => (
              <li key={idx} style={{ marginBottom: '6px', background: '#f5faff', borderRadius: '6px', padding: '6px 12px', boxShadow: '0 1px 4px #e3e3e3' }}>{task.task || task.title || 'Task'}{task.completed ? ' (Done)' : ''}</li>
            )) : <li>No tasks assigned.</li>}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
