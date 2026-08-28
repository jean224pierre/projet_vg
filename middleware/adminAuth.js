// Authentification HTTP Basic minimaliste pour protéger l'admin.
// Aucune librairie externe : le navigateur affiche nativement la boîte de connexion
// et renvoie automatiquement les identifiants sur les requêtes suivantes du même onglet.
function adminAuth(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Basic ')) {
        res.set('WWW-Authenticate', 'Basic realm="Admin Virgina Decoration"');
        return res.status(401).send('Authentification requise.');
    }

    const base64Credentials = header.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const separatorIndex = credentials.indexOf(':');
    const user = credentials.slice(0, separatorIndex);
    const password = credentials.slice(separatorIndex + 1);

    if (user === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
        return next();
    }

    res.set('WWW-Authenticate', 'Basic realm="Admin Virgina Decoration"');
    return res.status(401).send('Identifiants invalides.');
}

module.exports = adminAuth;