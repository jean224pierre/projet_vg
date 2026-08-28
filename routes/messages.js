const express = require('express');
const pool = require('../db');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.get('/', adminAuth, async function (req, res) {
    try {
        const result = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur chargement messages:', err.message);
        res.status(500).json({ error: 'Impossible de charger les messages.' });
    }
});

router.delete('/:id', adminAuth, async function (req, res) {
    try {
        await pool.query('DELETE FROM contact_messages WHERE id = $1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        console.error('Erreur suppression message:', err.message);
        res.status(500).json({ error: 'Impossible de supprimer le message.' });
    }
});

module.exports = router;