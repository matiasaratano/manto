const toggle = document.querySelector('.menu'); const nav = document.querySelector('#nav'); if (toggle && nav) { toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); nav.classList.toggle('open', open) }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú') })); document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú'); toggle.focus() } }) } document.querySelectorAll('[data-contact]').forEach(b => b.addEventListener('click', () => { const note = b.parentElement.querySelector('.contact-note'); if (note) { note.hidden = false; note.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) } }));
const galleryLinks = [...document.querySelectorAll('[data-gallery]')];
const photoDialog = document.querySelector('#photo-dialog');
if (photoDialog && galleryLinks.length) {
  const galleryData = document.querySelector('#gallery-data');
  let allPhotos = galleryLinks.map(link => ({
    src: link.getAttribute('href'),
    alt: link.querySelector('img')?.alt || 'Foto de la propiedad'
  }));
  if (galleryData) {
    try { allPhotos = JSON.parse(galleryData.textContent); } catch (_) {}
  }
  let photoIndex = 0;
  let origin = null;
  const large = document.querySelector('#photo-large');
  const count = document.querySelector('#photo-count');
  const caption = document.querySelector('#photo-caption');
  function showPhoto(i) {
    photoIndex = (i + allPhotos.length) % allPhotos.length;
    const photo = allPhotos[photoIndex];
    large.src = photo.src;
    large.alt = photo.alt;
    caption.textContent = photo.alt;
    count.textContent = `${photoIndex + 1} / ${allPhotos.length}`;
  }
  function openDialog(startIndex, triggerEl) {
    if (typeof photoDialog.showModal !== 'function') return;
    origin = triggerEl || null;
    showPhoto(startIndex);
    photoDialog.showModal();
    document.body.classList.add('gallery-open');
  }
  galleryLinks.forEach((link, i) => link.addEventListener('click', event => {
    event.preventDefault();
    openDialog(i, link);
  }));
  document.querySelectorAll('#ver-todas-btn,#ver-todas-btn-bottom').forEach(button => {
    button.addEventListener('click', () => openDialog(0, button));
  });
  photoDialog.querySelector('[data-close]').addEventListener('click', () => photoDialog.close());
  photoDialog.querySelector('[data-prev]').addEventListener('click', () => showPhoto(photoIndex - 1));
  photoDialog.querySelector('[data-next]').addEventListener('click', () => showPhoto(photoIndex + 1));
  photoDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(photoIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(photoIndex + 1); }
  });
  photoDialog.addEventListener('click', event => {
    if (event.target === photoDialog) photoDialog.close();
  });
  photoDialog.addEventListener('close', () => {
    document.body.classList.remove('gallery-open');
    if (origin) origin.focus();
  });
}

const filterButtons=[...document.querySelectorAll('[data-filter]')];const catalogCards=[...document.querySelectorAll('[data-city]')];if(filterButtons.length&&catalogCards.length){const empty=document.querySelector('[data-empty]');filterButtons.forEach(button=>button.addEventListener('click',()=>{const value=button.dataset.filter;filterButtons.forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected))});let visible=0;catalogCards.forEach(card=>{const show=value==='all'||card.dataset.city===value;card.hidden=!show;if(show)visible++});if(empty)empty.hidden=visible!==0;}));}
