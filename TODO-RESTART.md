# TODO RESTART: Profile Sistema (Professional Implementation)

**Original Request:** Kontak → Profile Sistema, hapus FAQ, tambah foto/profile fields di Admin Konfigurasi (site_settings), navbar pubik ubah, admin ubah tampil di profile.

**Status:** Restart

## PLAN
1. **DB:** site_settings tambah profile_photo, profile_title, profile_description (INSERT defaults)
2. **Backend:** hapus /api/faqs route & file
3. **Frontend:** 
   - ContactPage.jsx → ProfileSystemPage.jsx (fetch settings, show foto + info + form)
   - Navbar: 'Kontaktu' → 'Profile Sistema' path '/profile' icon User
   - Sidebar: hapus FAQ
   - Footer: Kontak → Profile
   - App.js: route /profile ProfileSystemPage, hapus admin/faqs
   - AdminSettings.jsx: tambah profile_title, description, photo upload (/api/upload/image)
4. **Delete:** AdminFaqs.jsx
5. **Test:** npm start backend/frontend, /profile, admin/settings upload

**Key Files:**
- frontend/src/pages/Contact
