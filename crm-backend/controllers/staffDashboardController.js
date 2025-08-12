// Staff Dashboard Controller
const db = require('../models/db');

module.exports = {
  async getKPIs(req, res) {
    try {
      const [[{ totalClients }]] = await db.promise().query('SELECT COUNT(*) AS totalClients FROM customers');
      const [[{ totalDebt }]] = await db.promise().query('SELECT SUM(debt_amount) AS totalDebt FROM leads');
      const [[{ newLeads }]] = await db.promise().query("SELECT COUNT(*) AS newLeads FROM leads WHERE lead_status='new'");
      const [[{ currentLeads }]] = await db.promise().query("SELECT COUNT(*) AS currentLeads FROM leads WHERE lead_status='current'");
      const [[{ activeCases }]] = await db.promise().query("SELECT COUNT(*) AS activeCases FROM leads WHERE lead_status='active'");
      // Checklist tasks can be implemented if you have a checklist table
      res.json({
        totalClients: totalClients || 0,
        totalDebt: totalDebt || 0,
        newLeads: newLeads || 0,
        currentLeads: currentLeads || 0,
        activeCases: activeCases || 0,
        checklistTasks: 0 // Placeholder, update if you have checklist data
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch KPIs' });
    }
  },

  async getTasks(req, res) {
    const staffId = req.params.staffId;
    try {
      const [tasks] = await db.query('SELECT * FROM tasks WHERE staff_id = ?', [staffId]);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  },

  async createCase(req, res) {
    const { title, description, assigned_to } = req.body;
    try {
      await db.query('INSERT INTO cases (title, description, assigned_to, status) VALUES (?, ?, ?, "Active")', [title, description, assigned_to]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create case' });
    }
  },

  async addLead(req, res) {
    const { name, contact, assigned_to } = req.body;
    try {
      await db.query('INSERT INTO leads (name, contact, assigned_to) VALUES (?, ?, ?)', [name, contact, assigned_to]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add lead' });
    }
  },

  async updateChecklist(req, res) {
    const { staff_id, task, completed } = req.body;
    try {
      await db.query('INSERT INTO checklist (staff_id, task, completed) VALUES (?, ?, ?)', [staff_id, task, completed]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update checklist' });
    }
  }
};
