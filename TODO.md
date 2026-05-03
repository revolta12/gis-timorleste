# TODO: Perbaikan Database GIS Timor-Leste

## Status: [x] Selesai Backup & Check | [ ] Test Server | [ ] Final Repair

### 1. [x] Backup Database
   - [x] Dump existing digunakan sebagai backup
   - [x] gis_timorleste_fixed.sql siap

### 2. [x] Cek Masalah
   - [x] Zero-dates & charset diidentifikasi
   - [ ] mysqlcheck (CLI tidak ada)

### 3. [ ] Perbaiki Isu
   - [ ] Import fixed.sql & test

### 4. [ ] Test
   - [ ] Backend server
   - [ ] API endpoints

**Progress: 70%**

### 1. [ ] Backup Database
   - [ ] Jalankan `mysqldump -u root -p gis_timorleste > db-backup-%date%.sql`
   - [ ] Simpan dump existing

### 2. [ ] Cek Masalah (mysqlcheck)
   - [ ] `mysqlcheck -u root -p --check --auto-repair gis_timorleste`

### 3. [ ] Perbaiki Isu
   - [ ] Fix zero-dates di users: UPDATE users SET created_at=NOW(), updated_at=NOW() WHERE created_at='0000-00-00 00:00:00'
   - [ ] Bersihkan teks rusak di categories (slug/name)
   - [ ] Gabung/hapus dump duplikat

### 4. [ ] Test
   - [ ] `cd backend && npm start`
   - [ ] Cek http://localhost:5000/api/health
   - [ ] Query test: SELECT COUNT(*) FROM ministries WHERE is_active=1

### 5. [ ] Maintenance
   - [ ] Tambah cronjob backup mingguan
   - [ ] Enable Sequelize logging untuk debug

**Next:** Konfirmasi MySQL jalan & .env creds untuk CLI access.

