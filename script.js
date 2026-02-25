const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    // ============================================================
    // ✏️  EDIT DATA DI BAWAH INI SESUAI KEBUTUHAN ANDA
    // ============================================================

    const namaLengkap = ref('Giza Jirndhara');
    const tagline = ref('Mahasiswa yang bersemangat menjelajahi dunia teknologi, kreativitas, dan inovasi.');

    const bio1 = ref('Saya adalah seorang mahasiswa yang memiliki minat mendalam di bidang teknologi informasi dan pengembangan perangkat lunak. Dengan semangat belajar yang tinggi, saya terus mengembangkan kompetensi diri melalui berbagai penugasan dan proyek.');
    const bio2 = ref('Saya percaya bahwa kolaborasi dan kreativitas adalah kunci untuk menciptakan solusi yang bermakna. Visi saya adalah berkontribusi nyata pada transformasi digital Indonesia.');

    const profilInfo = ref([
      { label: 'Perguruan Tinggi', value: 'Politeknik Negeri Bandung' },
      { label: 'Jurusan', value: 'Teknik Komputer dan Informatika'},
      { label: 'Program Studi', value: 'D4 - Teknik Informatika' },
      { label: 'Angkatan', value: '2025' },
      { label: 'Lokasi', value: 'Bandung, Indonesia' },
    ]);

    const skills = ref([
      { icon: '💻', name: 'Pemrograman', desc: 'Pengembangan aplikasi web dan mobile dengan berbagai bahasa pemrograman modern.', tags: ['Python', 'JavaScript', 'Java'] },
      { icon: '🤝', name: 'Kolaborasi', desc: 'Berkomunikasi efektif, dan berkolaborasi dalam lingkungan dinamis.', tags: ['Teamwork', 'Public Speaking'] },
    ]);

    const activeTab = ref('penugasan2');
    const penugasanTabs = ref([
      {
        id: 'penugasan2', label: 'Penugasan 2',
        items: [{
          title: 'Dokumen',
          date: 'Maret 2025',
          desc: 'Deskripsi penugasan kedua. Jelaskan apa yang dikerjakan, tujuan, dan metodologi yang digunakan dalam menyelesaikan penugasan ini secara detail.',
          result: 'Hasil yang dicapai: laporan, dokumen, atau output lainnya yang dihasilkan dari penugasan ini.',
        }],
      },
      {
        id: 'penugasan3', label: 'Penugasan 3',
        items: [{
          title: 'Infografis',
          date: 'April 2025',
          desc: 'Deskripsi penugasan ketiga. Jelaskan apa yang dikerjakan, tujuan, dan metodologi yang digunakan dalam penugasan ini.',
          result: 'Hasil yang dicapai beserta evaluasi dan pembelajaran yang didapat dari penugasan ketiga ini.',
        }],
      },
      {
        id: 'penugasan4', label: 'Penugasan 4',
        items: [{
          title: 'Video',
          date: 'Mei 2025',
          desc: 'Deskripsi penugasan keempat. Jelaskan apa yang dikerjakan, tujuan, dan metodologi yang digunakan dalam penugasan ini.',
          result: 'Hasil akhir penugasan keempat dan dampak yang dihasilkan dari pekerjaan ini.',
        }],
      },
    ]);

    // Ganti title & isi jika ingin tampilkan Portofolio/Proyek
    const portfolioTitle = ref('Riwayat Organisasi');
    const portfolioItems = ref([
      { emoji: '🏛️', category: 'Organisasi Kampus', title: 'Ketua Ekstrakulikuler', desc: 'Aktif sebagai ketua ekstrakulikuler karate.', year: '2023–2024' },
    ]);

    // ============================================================

    const firstName = computed(() => namaLengkap.value.split(' ')[0]);

    const form = ref({ nama: '', email: '', pesan: '' });
    const formSent = ref(false);
    function submitForm() {
      formSent.value = true;
      form.value = { nama: '', email: '', pesan: '' };
      setTimeout(() => formSent.value = false, 4000);
    }

    const navItems = [
      { id: 'profil', label: 'Profil' },
      { id: 'skill', label: 'Skill' },
      { id: 'penugasan', label: 'Penugasan' },
      { id: 'portfolio', label: 'Organisasi' },
      { id: 'kontak', label: 'Kontak' },
    ];
    const scrolled = ref(false);
    const activeSection = ref('beranda');

    onMounted(() => {
      window.addEventListener('scroll', () => {
        scrolled.value = window.scrollY > 60;
        const ids = ['kontak', 'portfolio', 'penugasan', 'skill', 'profil', 'beranda'];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && window.scrollY + 140 >= el.offsetTop) {
            activeSection.value = id; break;
          }
        }
      });

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

      const cursor = document.getElementById('cursor');
      const ring = document.getElementById('cursorRing');
      document.addEventListener('mousemove', e => {
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        ring.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
      });
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
      });
    });

    return {
      namaLengkap, firstName, tagline, bio1, bio2, profilInfo,
      skills, activeTab, penugasanTabs,
      portfolioTitle, portfolioItems,
      form, formSent, submitForm,
      navItems, scrolled, activeSection,
    };
  }
}).mount('#app');