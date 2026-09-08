// ============================================================
// ADMIN JS - Virgina Decoration
// ============================================================

// Identifiants Cloudinary publics (pour upload unsigned)
var CLOUDINARY_CLOUD_NAME = "REMPLACER_PAR_TON_CLOUD_NAME";
var CLOUDINARY_UPLOAD_PRESET = "REMPLACER_PAR_TON_UPLOAD_PRESET";

var pendingUpload = null;
var currentGalleryFilter = 'all';

// ============================================================
// GESTION DES ONGLETS (TABS)
// ============================================================
function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === tabId);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Écouteurs pour les onglets
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'));
        });
    });

    // ============================================================
    // WIDGET CLOUDINARY
    // ============================================================
    var widget = cloudinary.createUploadWidget({
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        resourceType: 'auto',
        multiple: false
    }, function (error, result) {
        if (!error && result && result.event === 'success') {
            pendingUpload = {
                url: result.info.secure_url,
                type: result.info.resource_type === 'video' ? 'video' : 'image'
            };
            var form = document.getElementById('upload-form');
            if (form) form.style.display = 'block';
            
            var previewImg = document.getElementById('upload-preview');
            if (previewImg) {
                previewImg.src = pendingUpload.url;
                previewImg.style.display = 'block';
            }
        }
    });

    var uploadBtn = document.getElementById('upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function () {
            widget.open();
        });
    }

    var saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            if (!pendingUpload) {
                alert('Veuillez d\'abord choisir une photo ou vidéo.');
                return;
            }

            var title = document.getElementById('new-title').value.trim();
            var category = document.getElementById('new-category').value;
            var order = parseInt(document.getElementById('new-order').value, 10) || 0;

            fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    media_url: pendingUpload.url,
                    media_type: pendingUpload.type,
                    category: category,
                    display_order: order
                })
            }).then(function (res) {
                if (!res.ok) throw new Error('Échec de l\'enregistrement');
                document.getElementById('upload-form').style.display = 'none';
                document.getElementById('new-title').value = '';
                pendingUpload = null;
                loadGallery();
                alert('Réalisation ajoutée avec succès !');
            }).catch(function (err) {
                alert(err.message);
            });
        });
    }

    // Filtres de la galerie
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentGalleryFilter = this.getAttribute('data-filter');
            loadGallery();
        });
    });

    // Chargement initial des données
    loadGallery();
    loadMessages();
    loadReviews();
});

// ============================================================
// CHARGEMENT & GESTION DE LA GALERIE
// ============================================================
function loadGallery() {
    fetch('/api/gallery')
        .then(res => res.json())
        .then(items => {
            var container = document.getElementById('gallery-list');
            var statCount = document.getElementById('stat-gallery-count');
            if (statCount) statCount.textContent = items.length;

            var filteredItems = currentGalleryFilter === 'all' 
                ? items 
                : items.filter(i => (i.category || 'mariage') === currentGalleryFilter);

            if (!filteredItems.length) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-images"></i>
                        <p>Aucune réalisation dans cette catégorie.</p>
                    </div>`;
                return;
            }

            container.innerHTML = '';
            filteredItems.forEach(item => {
                var card = document.createElement('div');
                card.className = 'media-card';
                var mediaHtml = item.media_type === 'video'
                    ? `<video src="${item.media_url}" muted></video>`
                    : `<img src="${item.media_url}" alt="${item.title || ''}" loading="lazy">`;

                card.innerHTML = `
                    <div class="media-preview">
                        ${mediaHtml}
                        <span class="media-badge">${item.category || 'Événement'}</span>
                    </div>
                    <div class="media-body">
                        <div>
                            <h4 class="media-title">${item.title || '(Sans titre)'}</h4>
                            <span class="media-meta"><i class="fas fa-sort-numeric-down"></i> Ordre: ${item.display_order || 0}</span>
                        </div>
                        <div class="media-actions">
                            <span class="media-meta"><i class="far fa-calendar-alt"></i> ${item.media_type}</span>
                            <button class="btn btn-danger" onclick="deleteGalleryItem(${item.id})">
                                <i class="fas fa-trash-alt"></i> Supprimer
                            </button>
                        </div>
                    </div>`;
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error('Erreur galerie:', err);
        });
}

function deleteGalleryItem(id) {
    if (!confirm('Voulez-vous vraiment supprimer cette réalisation ?')) return;
    fetch('/api/gallery/' + id, { method: 'DELETE' })
        .then(loadGallery)
        .catch(err => alert('Erreur: ' + err.message));
}

// ============================================================
// CHARGEMENT & GESTION DES PROSPECTS / MESSAGES
// ============================================================
function loadMessages() {
    fetch('/api/messages')
        .then(res => res.json())
        .then(msgs => {
            var tbody = document.getElementById('messages-tbody');
            var statCount = document.getElementById('stat-messages-count');
            if (statCount) statCount.textContent = msgs.length;

            if (!msgs.length) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6">
                            <div class="empty-state">
                                <i class="fas fa-inbox"></i>
                                <p>Aucun message ou demande reçue pour le moment.</p>
                            </div>
                        </td>
                    </tr>`;
                return;
            }

            tbody.innerHTML = '';
            msgs.forEach(msg => {
                var date = new Date(msg.created_at).toLocaleDateString('fr-FR', {
                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                });
                
                // Nettoyage du numéro pour WhatsApp
                var cleanPhone = (msg.phone || '').replace(/[^0-9]/g, '');
                var waText = encodeURIComponent(`Bonjour ${msg.name}, suite à votre demande sur Virgina Decoration concernant votre événement...`);
                var waLink = `https://wa.me/${cleanPhone}?text=${waText}`;

                var tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${msg.name}</strong></td>
                    <td>
                        <a href="mailto:${msg.email}" style="color:var(--color-dark); text-decoration:none;"><i class="fas fa-envelope"></i> ${msg.email}</a><br>
                        <small style="color:var(--color-text-muted);"><i class="fas fa-phone"></i> ${msg.phone}</small>
                    </td>
                    <td style="max-width:300px; font-size:0.85rem; color:#4a5568;">${msg.message}</td>
                    <td><span class="status-badge status-new"><i class="fas fa-circle" style="font-size:0.5rem;"></i> Nouveau</span></td>
                    <td style="font-size:0.8rem; color:var(--color-text-muted);">${date}</td>
                    <td>
                        <div style="display:flex; gap:0.4rem; align-items:center;">
                            ${cleanPhone ? `<a href="${waLink}" target="_blank" class="btn btn-whatsapp" title="Répondre sur WhatsApp"><i class="fab fa-whatsapp"></i> WhatsApp</a>` : ''}
                            <button class="btn btn-danger" onclick="deleteMessage(${msg.id})" title="Supprimer"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>`;
                tbody.appendChild(tr);
            });
        })
        .catch(err => {
            console.error('Erreur messages:', err);
        });
}

function deleteMessage(id) {
    if (!confirm('Supprimer cette demande ?')) return;
    fetch('/api/messages/' + id, { method: 'DELETE' })
        .then(loadMessages)
        .catch(err => alert('Erreur: ' + err.message));
}

// ============================================================
// CHARGEMENT & GESTION DES AVIS CLIENTS (EXEMPLE LOCAL / API)
// ============================================================
function loadReviews() {
    var reviews = JSON.parse(localStorage.getItem('virgina_reviews') || '[]');
    var container = document.getElementById('reviews-list');
    var statCount = document.getElementById('stat-reviews-count');
    if (statCount) statCount.textContent = reviews.length;

    if (!container) return;

    if (!reviews.length) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-star"></i>
                <p>Aucun avis client enregistré pour le moment.</p>
            </div>`;
        return;
    }

    container.innerHTML = '';
    reviews.forEach((rev, index) => {
        var card = document.createElement('div');
        card.className = 'panel-card';
        card.style.padding = '1rem';
        card.style.marginBottom = '0.8rem';
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                    <strong style="color:var(--color-dark); font-size:1rem;">${rev.name}</strong> 
                    <span style="color:var(--color-gold); margin-left:0.5rem;">${'★'.repeat(rev.rating)}</span>
                    <br><small style="color:var(--color-text-muted);">${rev.event}</small>
                    <p style="margin-top:0.4rem; font-size:0.9rem; color:#4a5568;">"${rev.comment}"</p>
                </div>
                <button class="btn btn-danger" onclick="deleteReview(${index})"><i class="fas fa-trash"></i></button>
            </div>`;
        container.appendChild(card);
    });
}

function saveReview() {
    var name = document.getElementById('review-name').value.trim();
    var eventType = document.getElementById('review-event').value.trim();
    var rating = parseInt(document.getElementById('review-rating').value, 10) || 5;
    var comment = document.getElementById('review-comment').value.trim();

    if (!name || !comment) {
        alert('Veuillez remplir le nom et le commentaire.');
        return;
    }

    var reviews = JSON.parse(localStorage.getItem('virgina_reviews') || '[]');
    reviews.push({ name: name, event: eventType, rating: rating, comment: comment, date: new Date().toISOString() });
    localStorage.setItem('virgina_reviews', JSON.stringify(reviews));

    document.getElementById('review-name').value = '';
    document.getElementById('review-event').value = '';
    document.getElementById('review-comment').value = '';

    loadReviews();
    alert('Avis ajouté avec succès !');
}

function deleteReview(index) {
    if (!confirm('Supprimer cet avis ?')) return;
    var reviews = JSON.parse(localStorage.getItem('virgina_reviews') || '[]');
    reviews.splice(index, 1);
    localStorage.setItem('virgina_reviews', JSON.stringify(reviews));
    loadReviews();
}
