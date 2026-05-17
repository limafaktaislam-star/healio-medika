const CATEGORIES = [
  "Semua",
  "Penyakit Jantung",
  "Diabetes & Metabolik",
  "Penyakit Pernafasan",
  "Penyakit Infeksi",
  "Penyakit Saraf",
  "Penyakit Ginjal",
  "Penyakit Pencernaan",
  "Kanker",
  "Tulang & Sendi",
  "Penyakit Kulit",
  "Mata & THT",
  "Kesehatan Ibu & Anak",
  "Kesehatan Mental",
  "Penyakit Tropis",
  "Penyakit Autoimun",
  "Kesehatan Umum"
];
const mkContent = (name, desc, symptoms, cause, treatment) => `## Apa Itu ${name}?

${desc}

## Gejala

${symptoms}

## Penyebab

${cause}

## Pengobatan

${treatment}

## Kapan ke Dokter?

Hubungi HEALIO MEDIKA untuk layanan kunjungan medis profesional ke rumah Anda.`;
const detailedArticles = [
  {
    id: 1,
    slug: "serangan-jantung",
    title: "Serangan Jantung: Kenali Gejala FAST dan Tindakan Darurat",
    metaDescription: "Nyeri dada, keringat dingin, sesak nafas adalah tanda serangan jantung. Kenali gejala, pertolongan pertama, dan pentingnya hubungi 119 segera.",
    category: "Penyakit Jantung",
    content: mkContent(
      "Serangan Jantung",
      "Serangan jantung terjadi saat aliran darah ke otot jantung tersumbat tiba-tiba. Di Indonesia, penyakit jantung adalah penyebab kematian nomor satu. Penanganan dalam 90 menit pertama sangat menentukan hasilnya.",
      "Nyeri dada seperti ditekan menjalar ke lengan kiri, keringat dingin berlebihan, sesak napas mendadak, mual, dan pusing. Waspadai gejala tidak khas pada wanita dan diabetik.",
      "Sumbatan arteri koroner akibat plak kolesterol. Faktor risiko: hipertensi, kolesterol tinggi, diabetes, merokok, obesitas, dan riwayat keluarga.",
      "Angioplasti dalam 90 menit (PCI), atau trombolitik jika PCI tidak tersedia. Jangka panjang: aspirin, beta-blocker, ACE inhibitor, statin."
    ),
    imagePrompt: "Foto klinis modern dokter kardiologi memeriksa EKG pasien, ruang gawat darurat profesional, latar putih bersih steril, gaya Healio Medika Indonesia",
    references: [
      "WHO. Cardiovascular diseases. who.int",
      "Kemenkes RI. Tatalaksana Sindrom Koroner Akut. kemkes.go.id"
    ]
  },
  {
    id: 2,
    slug: "hipertensi",
    title: "Hipertensi: Kontrol Tekanan Darah untuk Hindari Komplikasi Fatal",
    metaDescription: "Hipertensi memengaruhi 34% orang dewasa Indonesia. Kenali target tekanan darah, obat lini pertama, dan perubahan gaya hidup yang terbukti efektif.",
    category: "Penyakit Jantung",
    content: mkContent(
      "Hipertensi",
      "Hipertensi atau tekanan darah tinggi ≥130/80 mmHg adalah 'pembunuh senyap' karena sering tanpa gejala. Prevalensi 34,1% pada dewasa Indonesia.",
      "Umumnya tanpa gejala. Pada tekanan sangat tinggi: sakit kepala berdenyut, mimisan, pandangan kabur, dan pusing.",
      "Pola hidup tidak sehat, genetik, usia, obesitas, stres kronis, konsumsi garam berlebih, dan kurang aktivitas fisik.",
      "ACE inhibitor, ARB, kalsium channel blocker, atau thiazide diuretik. Target <130/80 mmHg. Obat seumur hidup."
    ),
    imagePrompt: "Foto klinis modern pengukuran tekanan darah pasien lansia oleh perawat homecare, latar putih Indonesia, gaya Healio Medika profesional",
    references: [
      "WHO. Hypertension. who.int",
      "Kemenkes RI. Hipertensi Si Pembunuh Senyap. p2ptm.kemkes.go.id"
    ]
  },
  {
    id: 3,
    slug: "diabetes-tipe2",
    title: "Diabetes Tipe 2: Mengelola Gula Darah Seumur Hidup",
    metaDescription: "Indonesia memiliki 19 juta penderita diabetes. Kenali target HbA1c, metformin sebagai obat utama, diet diabetes, dan skrining komplikasi rutin.",
    category: "Diabetes & Metabolik",
    content: mkContent(
      "Diabetes Tipe 2",
      "Diabetes tipe 2 adalah resistensi insulin yang menyebabkan gula darah tinggi kronis. Indonesia ke-5 terbesar penderita diabetes dunia.",
      "3P: poliuria, polidipsi, polifagi. Plus: luka lambat sembuh, sering infeksi, kesemutan, dan penglihatan kabur.",
      "Obesitas, kurang olahraga, genetik, usia >45 tahun, riwayat diabetes gestasional.",
      "Metformin lini pertama. Tambah SGLT-2 inhibitor, GLP-1 agonist, atau insulin. Target HbA1c <7%."
    ),
    imagePrompt: "Foto klinis modern pemeriksaan gula darah glukometer, pasien diabetes mandiri, latar putih steril, gaya Healio Medika Indonesia",
    references: [
      "PERKENI. Pedoman DM Tipe 2 Indonesia.",
      "WHO. Diabetes. who.int"
    ]
  },
  {
    id: 4,
    slug: "asma",
    title: "Asma: Mengelola Penyakit Saluran Napas Kronis agar Tetap Aktif",
    metaDescription: "Asma memengaruhi jutaan orang Indonesia. Kenali pemicu, inhaler pengontrol ICS dan pelega SABA, rencana aksi asma, dan cara hidup aktif.",
    category: "Penyakit Pernafasan",
    content: mkContent(
      "Asma",
      "Asma adalah peradangan kronik saluran napas yang menyebabkan mengi dan sesak episodik. Bisa dikontrol dengan baik dengan pengobatan yang tepat.",
      "Mengi, sesak napas terutama malam/pagi, batuk kering, rasa sesak di dada. Gejala memberat saat terpapar pemicu.",
      "Alergen (debu, bulu hewan), iritan (asap rokok), infeksi saluran napas, olahraga berat, stres.",
      "ICS (controller) setiap hari. SABA (reliever) saat serangan. Hindari pemicu. Vaksin flu tahunan."
    ),
    imagePrompt: "Foto klinis modern pasien menggunakan inhaler asma dengan spacer, dokter mendampingi, latar putih bersih, gaya Healio Medika Indonesia",
    references: [
      "GINA. Global Strategy for Asthma. ginasthma.org",
      "Kemenkes RI. Pedoman Asma. kemkes.go.id"
    ]
  },
  {
    id: 5,
    slug: "stroke",
    title: "Stroke: Kenali FAST dan Selamatkan Otak dalam Hitungan Menit",
    metaDescription: "Setiap menit 1,9 juta neuron mati saat stroke. Kenali gejala FAST, jenis iskemik dan hemoragik, pengobatan tPA darurat, dan rehabilitasi.",
    category: "Penyakit Saraf",
    content: mkContent(
      "Stroke",
      "Stroke terjadi saat aliran darah otak terhenti (iskemik 85%) atau pembuluh pecah (hemoragik 15%). Penyebab kecacatan utama Indonesia.",
      "FAST: Face (wajah turun), Arms (lengan lemah), Speech (bicara pelo), Time (hubungi 119). Juga: kelemahan mendadak, penglihatan kabur, sakit kepala hebat.",
      "Hipertensi (penyebab utama), fibrilasi atrium, diabetes, kolesterol tinggi, merokok.",
      "Stroke iskemik: tPA dalam 4,5 jam atau trombektomi. Rehabilitasi dini 24-48 jam setelah stabil."
    ),
    imagePrompt: "Foto klinis modern dokter saraf menjelaskan CT scan otak kepada keluarga pasien, konsultasi profesional, latar putih bersih, gaya Healio Medika Indonesia",
    references: [
      "World Stroke Organization. Fact Sheet. world-stroke.org",
      "Kemenkes RI. Pedoman Stroke. kemkes.go.id"
    ]
  },
  {
    id: 6,
    slug: "demam-berdarah",
    title: "Demam Berdarah: Kenali Fase Kritis dan Tanda Bahaya",
    metaDescription: "DBD fase kritis terjadi saat demam turun. Kenali tanda syok dengue, manajemen cairan, pencegahan 3M Plus, dan kapan rawat inap diperlukan.",
    category: "Penyakit Infeksi",
    content: mkContent(
      "Demam Berdarah Dengue",
      "DBD disebabkan virus dengue yang ditularkan Aedes aegypti. Indonesia endemis dengan ribuan kasus per tahun terutama musim hujan.",
      "Demam tinggi tiba-tiba, nyeri kepala, nyeri otot sendi. Fase kritis saat demam turun: nyeri perut, muntah, perdarahan, tidak BAK >6 jam.",
      "Virus dengue 4 serotipe. Nyamuk Aedes berkembang biak di genangan air bersih.",
      "Suportif: parasetamol (hindari aspirin/ibuprofen), cairan oral cukup. Rawat inap jika tanda bahaya."
    ),
    imagePrompt: "Foto klinis modern petugas fogging lingkungan DBD, Indonesia, gaya Healio Medika profesional",
    references: [
      "Kemenkes RI. Pedoman DBD. kemkes.go.id",
      "WHO. Dengue. who.int"
    ]
  },
  {
    id: 7,
    slug: "kanker-payudara",
    title: "Kanker Payudara: SADARI Setiap Bulan Menyelamatkan Jiwa",
    metaDescription: "Kanker payudara adalah kanker tersering wanita Indonesia. Kenali cara SADARI, mamografi skrining, faktor risiko, dan pengobatan modern.",
    category: "Kanker",
    content: mkContent(
      "Kanker Payudara",
      "Kanker payudara memengaruhi >65.000 wanita Indonesia per tahun. Stadium awal memiliki tingkat kesembuhan >90%.",
      "Benjolan di payudara/ketiak, perubahan kulit (kulit jeruk), puting masuk ke dalam, cairan dari puting, nyeri persisten.",
      "Usia, mutasi BRCA, riwayat keluarga, menstruasi dini, menopause lambat, tidak menyusui, obesitas.",
      "Operasi, radioterapi, kemoterapi, terapi hormon, targeted therapy (trastuzumab). Sesuai jenis dan stadium."
    ),
    imagePrompt: "Foto klinis modern dokter onkologi menjelaskan mamografi kepada pasien, konsultasi profesional, latar putih bersih, gaya Healio Medika Indonesia",
    references: [
      "WHO. Breast cancer. who.int",
      "Kemenkes RI. Skrining Kanker Payudara. p2ptm.kemkes.go.id"
    ]
  },
  {
    id: 8,
    slug: "osteoporosis",
    title: "Osteoporosis: Cegah Tulang Rapuh dengan DEXA Scan dan Kalsium",
    metaDescription: "Osteoporosis melemahkan tulang tanpa gejala hingga patah. Kenali DEXA scan, kalsium 1200mg, vitamin D, bisphosphonate, dan pencegahan jatuh.",
    category: "Tulang & Sendi",
    content: mkContent(
      "Osteoporosis",
      "Osteoporosis adalah berkurangnya kepadatan tulang yang menyebabkan tulang rapuh. 1 dari 3 wanita >50 tahun mengalami osteoporosis.",
      "Sering tanpa gejala. Tanda: tinggi badan berkurang, postur membungkuk, nyeri punggung kronis akibat kompresi vertebra.",
      "Menopause, usia lanjut, kekurangan kalsium/vitamin D, kurang latihan beban, merokok, kortikosteroid.",
      "Kalsium 1200 mg/hari, vitamin D 800-1000 IU. Bisphosphonate (alendronate) untuk pengobatan."
    ),
    imagePrompt: "Foto klinis modern pemeriksaan DEXA scan kepadatan tulang, pasien wanita lansia, latar putih steril, gaya Healio Medika profesional",
    references: [
      "IOF. Osteoporosis facts. osteoporosis.foundation",
      "Kemenkes RI. Pedoman Osteoporosis. kemkes.go.id"
    ]
  },
  {
    id: 9,
    slug: "gagal-ginjal",
    title: "Gagal Ginjal Kronik: Cegah Dialisis dengan Pengelolaan Dini",
    metaDescription: "GGK adalah penurunan ginjal progresif tidak reversibel. Kenali eGFR, 5 stadium, kontrol DM dan hipertensi, diet rendah protein, dan tanda indikasi dialisis.",
    category: "Penyakit Ginjal",
    content: mkContent(
      "Gagal Ginjal Kronik",
      "GGK adalah penurunan fungsi ginjal progresif >3 bulan. Diabetes dan hipertensi adalah penyebab utama di Indonesia.",
      "Stadium awal tanpa gejala. Lanjut: edema, kelelahan, mual, kulit gatal, sesak napas, anemia, hipertensi sulit dikontrol.",
      "Diabetes (utama), hipertensi, glomerulonefritis, NSAID jangka panjang.",
      "Kontrol TD <130/80 mmHg (ACE inhibitor/ARB), kontrol gula, diet rendah protein, eritropoietin untuk anemia. Dialisis stadium akhir."
    ),
    imagePrompt: "Foto klinis modern pasien hemodialisis dengan perawat, mesin dialisis modern, latar putih bersih, gaya Healio Medika Indonesia",
    references: [
      "PERNEFRI. Konsensus Dialisis. pernefri.or.id",
      "National Kidney Foundation. CKD. kidney.org"
    ]
  },
  {
    id: 10,
    slug: "depresi",
    title: "Depresi: Penyakit Mental Nyata yang Bisa Disembuhkan",
    metaDescription: "264 juta orang di dunia menderita depresi. Kenali gejala PHQ-9, SSRI sebagai lini pertama, CBT efektif, dan cara mendukung orang tersayang yang depresi.",
    category: "Kesehatan Mental",
    content: mkContent(
      "Depresi",
      "Depresi mayor adalah penyakit mental serius yang bisa diobati, bukan kelemahan karakter. Memengaruhi jutaan orang Indonesia.",
      "Sedih/kosong tiap hari, kehilangan minat, gangguan tidur dan nafsu makan, kelelahan ekstrem, pikiran negatif tentang diri, kesulitan konsentrasi.",
      "Ketidakseimbangan neurotransmiter, trauma, stres kronis, faktor genetik.",
      "SSRI (fluoxetine, sertraline) lini pertama. CBT sama efektif. Kombinasi paling baik untuk depresi berat."
    ),
    imagePrompt: "Foto klinis modern sesi konseling antara terapis dan pasien, ruang konseling hangat profesional, latar putih bersih, gaya Healio Medika Indonesia",
    references: [
      "WHO. Depression. who.int",
      "Kemenkes RI. Pedoman Kesehatan Jiwa. kemkes.go.id"
    ]
  },
  {
    id: 11,
    slug: "pneumonia",
    title: "Pneumonia: Infeksi Paru yang Serius dan Cara Pencegahan dengan Vaksin",
    metaDescription: "Pneumonia adalah penyebab kematian tersering balita dan lansia. Kenali batuk berdahak, demam, sesak nafas, antibiotik yang tepat, dan vaksin pneumokokus.",
    category: "Penyakit Pernafasan",
    content: mkContent(
      "Pneumonia",
      "Pneumonia adalah infeksi alveoli paru yang bisa disebabkan bakteri, virus, atau jamur. Penyebab kematian anak <5 tahun di Indonesia.",
      "Batuk berdahak kuning/hijau, demam tinggi dengan menggigil, sesak napas, nyeri dada saat batuk, kelelahan.",
      "Streptococcus pneumoniae paling umum, juga Mycoplasma, virus influenza/RSV/COVID-19. Risiko tinggi: balita, lansia, komorbiditas.",
      "Antibiotik untuk bakteri: amoksisilin (rawat jalan), sefalosporin + azitromisin (rawat inap). Pneumonia berat: rawat inap dengan oksigen."
    ),
    imagePrompt: "Foto klinis modern dokter memeriksa rontgen dada pneumonia, latar putih steril, gaya Healio Medika profesional",
    references: [
      "WHO. Pneumonia. who.int",
      "Kemenkes RI. Buletin Pneumonia. pusdatin.kemkes.go.id"
    ]
  },
  {
    id: 12,
    slug: "tifus",
    title: "Tifus (Demam Tifoid): Demam Tangga yang Perlu Antibiotik Tepat",
    metaDescription: "Tifus disebabkan Salmonella typhi dari makanan tercemar. Kenali demam naik bertahap, lidah kotor, diagnosis Widal, siprofloksasin, dan vaksinasi.",
    category: "Penyakit Infeksi",
    content: mkContent(
      "Tifus",
      "Demam tifoid adalah infeksi sistemik Salmonella typhi melalui makanan/minuman terkontaminasi. Masih umum di Indonesia.",
      "Demam naik bertahap tiap hari mencapai 39-40°C minggu 2, sakit kepala, lidah kotor, nyeri perut, konstipasi atau diare.",
      "Salmonella typhi masuk melalui makanan/air terkontaminasi tinja penderita atau carrier.",
      "Siprofloksasin atau levofloksasin (dewasa), sefiksim (anak). Durasi 7-14 hari. Berat: rawat inap."
    ),
    imagePrompt: "Foto klinis modern perawat homecare mengukur suhu pasien tifus, perawatan di rumah profesional, latar putih bersih, gaya Healio Medika Indonesia",
    references: [
      "WHO. Typhoid. who.int",
      "Kemenkes RI. Pedoman Demam Tifoid. kemkes.go.id"
    ]
  },
  {
    id: 13,
    slug: "malaria",
    title: "Malaria: Penyakit Parasit Endemis di Indonesia Timur",
    metaDescription: "Malaria masih endemis di Papua dan NTT. Kenali siklus Plasmodium, demam menggigil periodik, ACT sebagai pengobatan standar, dan profilaksis wisatawan.",
    category: "Penyakit Tropis",
    content: mkContent(
      "Malaria",
      "Malaria disebabkan Plasmodium yang ditularkan nyamuk Anopheles. Endemis di Papua, NTT, Maluku, dan sebagian Kalimantan.",
      "Trias malaria: demam tinggi periodik, menggigil, berkeringat. Gejala lain: sakit kepala, nyeri otot, mual. Malaria berat: kebingungan, kejang.",
      "Parasit Plasmodium masuk melalui gigitan nyamuk Anopheles betina. P. falciparum paling berbahaya.",
      "ACT (Artemisinin Combination Therapy): DHP untuk falciparum. ACT + primakuin untuk vivax. Malaria berat: artesunat IV."
    ),
    imagePrompt: "Foto klinis modern petugas tes RDT malaria di puskesmas daerah terpencil Papua, gaya Healio Medika Indonesia",
    references: [
      "Kemenkes RI. Pedoman Malaria. kemkes.go.id",
      "WHO. Malaria. who.int"
    ]
  },
  {
    id: 14,
    slug: "anemia",
    title: "Anemia Defisiensi Besi: Atasi Kelelahan Kronis dengan Suplemen",
    metaDescription: "ADB tersering di Indonesia terutama ibu hamil. Kenali gejala pucat dan lemas, suplemen ferous sulfat, makanan kaya zat besi, dan vitamin C pembantu penyerapan.",
    category: "Kesehatan Umum",
    content: mkContent(
      "Anemia Defisiensi Besi",
      "ADB adalah kekurangan zat besi untuk hemoglobin. Paling umum di Indonesia, terutama pada ibu hamil (48,9% per Riskesdas 2018).",
      "Kelelahan berlebihan, pucat di kulit/gusi/kelopak mata dalam, sesak napas saat aktivitas, pusing, detak jantung cepat, kuku rapuh.",
      "Asupan kurang, penyerapan terganggu, kehilangan darah kronis (menstruasi, perdarahan saluran cerna), kebutuhan meningkat (kehamilan).",
      "Ferous sulfat 325mg 3x/hari 1 jam sebelum makan + vitamin C. Lanjutkan 3-6 bulan setelah Hb normal."
    ),
    imagePrompt: "Foto klinis modern perawat mengambil sampel darah untuk tes hemoglobin, latar putih bersih, gaya Healio Medika Indonesia",
    references: [
      "Kemenkes RI. Pedoman Anemia Gizi. kemkes.go.id",
      "WHO. Anaemia. who.int"
    ]
  },
  {
    id: 15,
    slug: "covid19",
    title: "COVID-19: Panduan Gejala Terkini, Vaksinasi, dan Pemulihan",
    metaDescription: "COVID-19 disebabkan SARS-CoV-2. Kenali gejala Omicron, vaksinasi booster, isolasi mandiri 5 hari, dan kapan ke fasilitas kesehatan.",
    category: "Penyakit Infeksi",
    content: mkContent(
      "COVID-19",
      "COVID-19 adalah infeksi SARS-CoV-2 yang menjadi pandemi global sejak 2020. Vaksinasi telah menurunkan angka kematian secara dramatis.",
      "Demam, batuk, sakit tenggorokan, pilek, sakit kepala, nyeri otot, kelelahan. Gejala berat: sesak napas, saturasi O2 <95%.",
      "SARS-CoV-2 menyebar melalui droplet dan aerosol di ruangan tertutup. Risiko tinggi: lansia, komorbiditas, tidak divaksinasi.",
      "Ringan: isolasi mandiri 5-7 hari, parasetamol, istirahat, cairan, suplemen. Berat: antiviral, oksigen, rawat inap."
    ),
    imagePrompt: "Foto klinis modern tenaga kesehatan memberikan vaksinasi COVID-19, APD profesional, klinik modern bersih, gaya Healio Medika Indonesia",
    references: [
      "WHO. COVID-19. who.int/covid-19",
      "Kemenkes RI. Pedoman COVID-19. kemkes.go.id"
    ]
  },
  {
    id: 16,
    slug: "stunting",
    title: "Stunting: 1000 Hari Pertama Kehidupan adalah Kesempatan Mencegah Gagal Tumbuh",
    metaDescription: "Stunting memengaruhi 24% balita Indonesia. Kenali gizi 1000 HPK, ASI eksklusif, MPASI bergizi, imunisasi lengkap, dan pemantauan tumbuh kembang.",
    category: "Kesehatan Ibu & Anak",
    content: mkContent(
      "Stunting",
      "Stunting adalah gagal tumbuh akibat kekurangan gizi kronis dalam 1000 hari pertama kehidupan. Berdampak pada kecerdasan dan produktivitas jangka panjang.",
      "Tinggi badan pendek untuk usia, perkembangan kognitif terlambat, sistem imun lemah, sering sakit.",
      "Kekurangan gizi makro dan mikro, pola asuh kurang baik (tidak ASI eksklusif, MPASI tidak adekuat), infeksi berulang, sanitasi buruk.",
      "PMT padat gizi, suplementasi vitamin dan mineral, tatalaksana infeksi, stimulasi perkembangan, edukasi orang tua."
    ),
    imagePrompt: "Foto klinis modern pengukuran tinggi badan balita di posyandu, kader kesehatan Indonesia, latar cerah bersih, gaya Healio Medika",
    references: [
      "Kemenkes RI. Strategi Percepatan Pencegahan Stunting. kemkes.go.id",
      "UNICEF Indonesia. Stunting. unicef.org/indonesia"
    ]
  },
  {
    id: 17,
    slug: "preeklampsia",
    title: "Preeklampsia: Waspada Hipertensi Kehamilan yang Mengancam Jiwa",
    metaDescription: "Preeklampsia adalah hipertensi kehamilan serius. Kenali gejala tekanan darah tinggi setelah 20 minggu, tanda bahaya, aspirin profilaksis, dan waktu persalinan.",
    category: "Kesehatan Ibu & Anak",
    content: mkContent(
      "Preeklampsia",
      "Preeklampsia adalah hipertensi ≥140/90 mmHg setelah 20 minggu kehamilan disertai kerusakan organ. Penyebab kematian ibu utama di Indonesia.",
      "Tekanan darah tiba-tiba tinggi, bengkak berlebihan di wajah/tangan/kaki, sakit kepala hebat, pandangan kabur, nyeri ulu hati.",
      "Kelainan plasenta yang memengaruhi sirkulasi ibu. Risiko: kehamilan pertama, usia <18 atau >35 tahun, obesitas, hipertensi kronis.",
      "Antihipertensi (nifedipin/labetalol), MgSO4 untuk mencegah kejang, kortikosteroid untuk pematangan janin. Persalinan adalah terapi definitif."
    ),
    imagePrompt: "Foto klinis modern bidan mengukur tekanan darah ibu hamil, klinik antenatal care profesional, latar putih bersih, gaya Healio Medika Indonesia",
    references: [
      "Kemenkes RI. Pedoman Preeklampsia. kemkes.go.id",
      "WHO. Pre-eclampsia and eclampsia. who.int"
    ]
  },
  {
    id: 18,
    slug: "glaukoma",
    title: "Glaukoma: Cegah Kebutaan Permanen dengan Skrining Tekanan Mata",
    metaDescription: "Glaukoma merusak saraf optik tanpa gejala. Kenali jenis sudut terbuka dan tertutup, tonometri, tetes prostaglandin, dan jadwal skrining untuk semua di atas 40.",
    category: "Mata & THT",
    content: mkContent(
      "Glaukoma",
      "Glaukoma adalah kerusakan saraf optik akibat tekanan intraokular tinggi. Penyebab kebutaan permanen terbesar setelah katarak.",
      "Sudut terbuka: tanpa gejala awal, kerusakan penglihatan tepi progresif. Sudut tertutup akut: nyeri mata hebat mendadak, mual, pandangan kabur.",
      "TIO tinggi (>21 mmHg), usia >60 tahun, riwayat keluarga glaukoma, miopia tinggi, diabetes.",
      "Tetes prostaglandin (latanoprost) lini pertama. Beta-blocker, alpha-agonist. Laser trabekuloplasti. Trabekulektomi untuk kasus refrakter."
    ),
    imagePrompt: "Foto klinis modern pemeriksaan tekanan mata tonometer, dokter mata profesional, latar putih steril, gaya Healio Medika Indonesia",
    references: [
      "World Glaucoma Association. What is Glaucoma. worldglaucoma.org",
      "Perdami. Pedoman Glaukoma."
    ]
  },
  {
    id: 19,
    slug: "hepatitis-b",
    title: "Hepatitis B: Virus Hati yang Bisa Dicegah Vaksin Tiga Dosis",
    metaDescription: "Hepatitis B kronis bisa menyebabkan sirosis dan kanker hati. Kenali HBsAg, penularan, pengobatan entekavir, skrining ibu hamil, dan vaksinasi lengkap.",
    category: "Penyakit Infeksi",
    content: mkContent(
      "Hepatitis B",
      "Hepatitis B adalah infeksi virus hati HBV yang bisa akut atau kronis. Indonesia termasuk negara hiperendemis. 1/3 penderita kronis berkembang ke sirosis/kanker hati.",
      "Akut: ikterus, urin gelap, mual, kelelahan. Kronis: sering tanpa gejala hingga sirosis berat.",
      "Menular melalui darah (jarum bersama), hubungan seksual, dan ibu ke bayi (transmisi vertikal paling umum di Indonesia).",
      "Entekavir atau tenofovir untuk menekan replikasi virus. Bukan menyembuhkan namun mencegah progresi."
    ),
    imagePrompt: "Foto klinis modern dokter menjelaskan hasil tes hepatitis B, konsultasi profesional, latar putih bersih, gaya Healio Medika Indonesia",
    references: [
      "WHO. Hepatitis B. who.int",
      "Kemenkes RI. Pedoman Hepatitis. kemkes.go.id"
    ]
  },
  {
    id: 20,
    slug: "rheumatoid-arthritis",
    title: "Rheumatoid Arthritis: Obati Dini Agresif untuk Cegah Kerusakan Sendi",
    metaDescription: "RA adalah arthritis autoimun yang merusak sendi jika terlambat diobati. Kenali kaku pagi >1 jam, RF dan anti-CCP, metotreksat anchor drug, dan biologis TNF inhibitor.",
    category: "Tulang & Sendi",
    content: mkContent(
      "Rheumatoid Arthritis",
      "RA adalah arthritis autoimun sistemik yang merusak sendi secara progresif. Tanpa pengobatan dini, 50% pasien cacat dalam 10 tahun.",
      "Kaku sendi pagi hari >1 jam (ciri khas), sendi simetris merah/bengkak/nyeri di tangan, pergelangan, kaki. Kelelahan dan demam ringan.",
      "Autoimun: limfosit T menyerang sinovium. RF dan anti-CCP positif. Genetik (HLA-DR4) dan merokok berperan.",
      "Metotreksat 15-25 mg/minggu anchor drug. Tambah leflunomide/HCQ. Biologis (anti-TNF: etanercept/adalimumab) untuk kasus refrakter. Target DAS28 <2,6."
    ),
    imagePrompt: "Foto klinis modern fisioterapis melatih tangan pasien RA, tangan bengkak khas, rehabilitasi profesional, latar putih bersih, gaya Healio Medika Indonesia",
    references: [
      "ACR. Rheumatoid Arthritis. rheumatology.org",
      "IRA. Pedoman RA Indonesia. reumatologi.or.id"
    ]
  }
];
const diseaseData = [
  [
    "gagal-jantung",
    "Gagal Jantung: Mengelola Kondisi Kronis dengan Perawatan Komprehensif",
    "Penyakit Jantung"
  ],
  [
    "fibrilasi-atrium",
    "Fibrilasi Atrium: Aritmia yang Meningkatkan Risiko Stroke",
    "Penyakit Jantung"
  ],
  [
    "kardiomiopati",
    "Kardiomiopati: Penyakit Otot Jantung yang Melemahkan Pompa",
    "Penyakit Jantung"
  ],
  [
    "penyakit-arteri-perifer",
    "Penyakit Arteri Perifer: Nyeri Kaki Saat Berjalan",
    "Penyakit Jantung"
  ],
  [
    "aneurisma-aorta",
    "Aneurisma Aorta: Bahaya Tersembunyi di Pembuluh Terbesar",
    "Penyakit Jantung"
  ],
  [
    "perikarditis",
    "Perikarditis: Peradangan Selaput Jantung yang Menyakitkan",
    "Penyakit Jantung"
  ],
  [
    "endokarditis",
    "Endokarditis: Infeksi Berbahaya pada Lapisan Dalam Jantung",
    "Penyakit Jantung"
  ],
  [
    "sindrom-koroner",
    "Sindrom Koroner Akut: Spektrum Penyakit Jantung Iskemik",
    "Penyakit Jantung"
  ],
  [
    "bradikardia",
    "Bradikardia: Denyut Jantung Lambat yang Perlu Dievaluasi",
    "Penyakit Jantung"
  ],
  [
    "takikardia",
    "Takikardia: Jantung Berdebar Cepat dan Penyebabnya",
    "Penyakit Jantung"
  ],
  [
    "diabetes-tipe1",
    "Diabetes Tipe 1: Ketergantungan Insulin Seumur Hidup",
    "Diabetes & Metabolik"
  ],
  [
    "prediabetes",
    "Prediabetes: Kesempatan Emas Cegah Diabetes Tipe 2",
    "Diabetes & Metabolik"
  ],
  [
    "hipoglikemia",
    "Hipoglikemia: Penanganan Gula Darah Rendah yang Tepat",
    "Diabetes & Metabolik"
  ],
  [
    "ketoasidosis",
    "Ketoasidosis Diabetik: Komplikasi Darurat yang Butuh ICU",
    "Diabetes & Metabolik"
  ],
  [
    "hipertiroid",
    "Hipertiroid: Metabolisme Berlebih yang Perlu Diterapi",
    "Diabetes & Metabolik"
  ],
  [
    "hipotiroid",
    "Hipotiroid: Metabolisme Lambat dengan Terapi Levotiroksin",
    "Diabetes & Metabolik"
  ],
  [
    "sindrom-metabolik",
    "Sindrom Metabolik: Kombinasi Faktor Risiko Penyakit",
    "Diabetes & Metabolik"
  ],
  [
    "obesitas",
    "Obesitas: Lebih dari Masalah Estetika, Ancaman Kesehatan",
    "Diabetes & Metabolik"
  ],
  [
    "hiperlipidemia",
    "Hiperlipidemia: Kolesterol Tinggi dan Cara Menurunkannya",
    "Diabetes & Metabolik"
  ],
  [
    "penyakit-graves",
    "Penyakit Graves: Hipertiroid Autoimun dengan Exophthalmos",
    "Diabetes & Metabolik"
  ],
  [
    "ppok",
    "PPOK: Penyakit Paru Obstruktif Akibat Rokok yang Progresif",
    "Penyakit Pernafasan"
  ],
  [
    "sinusitis",
    "Sinusitis: Peradangan Sinus yang Sering Disepelekan",
    "Penyakit Pernafasan"
  ],
  [
    "apnea-tidur",
    "Apnea Tidur: Mendengkur yang Berbahaya untuk Jantung",
    "Penyakit Pernafasan"
  ],
  [
    "bronkiektasis",
    "Bronkiektasis: Dilatasi Bronkus Permanen dengan Batuk Kronis",
    "Penyakit Pernafasan"
  ],
  [
    "efusi-pleura",
    "Efusi Pleura: Cairan di Rongga Paru yang Menghambat Nafas",
    "Penyakit Pernafasan"
  ],
  [
    "fibrosis-paru",
    "Fibrosis Paru: Jaringan Parut yang Merusak Fungsi Paru",
    "Penyakit Pernafasan"
  ],
  [
    "rinitis-alergi",
    "Rinitis Alergi: Hidung Berair dari Alergen Lingkungan",
    "Penyakit Pernafasan"
  ],
  [
    "batuk-kronis",
    "Batuk Kronis: Investigasi Penyebab yang Perlu Dilakukan",
    "Penyakit Pernafasan"
  ],
  [
    "laringitis",
    "Laringitis: Suara Serak yang Butuh Istirahat Bicara",
    "Penyakit Pernafasan"
  ],
  [
    "tonsilitis",
    "Tonsilitis: Radang Amandel dan Kapan Perlu Operasi",
    "Penyakit Pernafasan"
  ],
  [
    "influenza",
    "Influenza: Lebih Berat dari Flu Biasa, Bisa Dicegah Vaksin",
    "Penyakit Infeksi"
  ],
  [
    "hiv-aids",
    "HIV/AIDS: Era ARV yang Mengubah Prognosis Menjadi Penyakit Kronis",
    "Penyakit Infeksi"
  ],
  [
    "hepatitis-a",
    "Hepatitis A: Infeksi Hati Akut yang Menular Melalui Makanan",
    "Penyakit Infeksi"
  ],
  [
    "hepatitis-c",
    "Hepatitis C: Disembuhkan 95% dalam 12 Minggu dengan DAA",
    "Penyakit Infeksi"
  ],
  [
    "cacar-air",
    "Cacar Air (Varisela): Penyakit Menular yang Bisa Dicegah Vaksin",
    "Penyakit Infeksi"
  ],
  [
    "campak",
    "Campak: Penyakit Menular yang Bisa Dieradikasi dengan Vaksin",
    "Penyakit Infeksi"
  ],
  [
    "tuberculosis",
    "TBC: Pengobatan 6 Bulan yang Tidak Boleh Diputus",
    "Penyakit Infeksi"
  ],
  [
    "leptospirosis",
    "Leptospirosis: Infeksi Bakteri Setelah Banjir yang Berbahaya",
    "Penyakit Infeksi"
  ],
  [
    "rabies",
    "Rabies: Mematikan tapi Bisa Dicegah dengan Vaksin Pasca-gigitan",
    "Penyakit Infeksi"
  ],
  [
    "chikungunya",
    "Chikungunya: Demam dan Nyeri Sendi Intens dari Nyamuk",
    "Penyakit Infeksi"
  ],
  [
    "sepsis",
    "Sepsis: Respons Imun Mengancam Jiwa yang Butuh Antibiotik Cepat",
    "Penyakit Infeksi"
  ],
  [
    "meningitis",
    "Meningitis: Peradangan Otak yang Butuh Antibiotik Segera",
    "Penyakit Infeksi"
  ],
  [
    "difteri",
    "Difteri: Infeksi Bakteri Saluran Nafas yang Bisa Dicegah DPT",
    "Penyakit Infeksi"
  ],
  [
    "tetanus",
    "Tetanus: Kejang Otot dari Luka yang Terkontaminasi",
    "Penyakit Infeksi"
  ],
  [
    "polio",
    "Polio: Penyakit Kelumpuhan yang Hampir Musnah dengan Vaksinasi",
    "Penyakit Infeksi"
  ],
  [
    "parkinson",
    "Parkinson: Mengelola Tremor dan Mempertahankan Kualitas Hidup",
    "Penyakit Saraf"
  ],
  [
    "alzheimer",
    "Alzheimer: Demensia Progresif dan Perawatan di Rumah",
    "Penyakit Saraf"
  ],
  [
    "epilepsi",
    "Epilepsi: Kontrol Kejang dengan Obat yang Tepat",
    "Penyakit Saraf"
  ],
  [
    "migrain",
    "Migrain: Lebih dari Sakit Kepala Biasa dengan Pemicu Tertentu",
    "Penyakit Saraf"
  ],
  [
    "vertigo",
    "Vertigo BPPV: Manuver Epley Mengatasi Pusing Posisional",
    "Penyakit Saraf"
  ],
  [
    "neuropati",
    "Neuropati Diabetik: Kesemutan Kaki yang Tidak Boleh Diabaikan",
    "Penyakit Saraf"
  ],
  [
    "multiple-sclerosis",
    "Multiple Sclerosis: Serangan Imun pada Mielin Saraf",
    "Penyakit Saraf"
  ],
  [
    "bells-palsy",
    "Bell's Palsy: Kelumpuhan Wajah yang Biasanya Pulih Sempurna",
    "Penyakit Saraf"
  ],
  [
    "carpal-tunnel",
    "Carpal Tunnel Syndrome: Kesemutan Tangan yang Bisa Dioperasi",
    "Penyakit Saraf"
  ],
  [
    "sciatica",
    "Sciatica: Nyeri Saraf Menjalar dari Punggung ke Kaki",
    "Penyakit Saraf"
  ],
  [
    "batu-ginjal",
    "Batu Ginjal: Nyeri Kolik dan Pencegahan dengan Banyak Minum",
    "Penyakit Ginjal"
  ],
  [
    "isk",
    "Infeksi Saluran Kemih: Sering pada Wanita dan Bisa Berulang",
    "Penyakit Ginjal"
  ],
  [
    "nefropati-diabetik",
    "Nefropati Diabetik: Melindungi Ginjal dari Kerusakan Diabetes",
    "Penyakit Ginjal"
  ],
  [
    "sindrom-nefrotik",
    "Sindrom Nefrotik: Kebocoran Protein dari Ginjal",
    "Penyakit Ginjal"
  ],
  [
    "pielonefritis",
    "Pielonefritis: Infeksi Bakteri yang Naik ke Ginjal",
    "Penyakit Ginjal"
  ],
  [
    "bph",
    "BPH: Pembesaran Prostat yang Mengganggu Berkemih Pria Lansia",
    "Penyakit Ginjal"
  ],
  [
    "gagal-ginjal-akut",
    "Gagal Ginjal Akut: Penurunan Fungsi Ginjal Mendadak",
    "Penyakit Ginjal"
  ],
  [
    "polikistik-ginjal",
    "Penyakit Ginjal Polikistik: Kista yang Merusak Jaringan Ginjal",
    "Penyakit Ginjal"
  ],
  [
    "kanker-ginjal",
    "Kanker Ginjal: Sering Ditemukan Insidental di CT Scan",
    "Penyakit Ginjal"
  ],
  [
    "hidronefrosis",
    "Hidronefrosis: Obstruksi Aliran Urin yang Merusak Ginjal",
    "Penyakit Ginjal"
  ],
  [
    "gerd",
    "GERD: Asam Lambung Naik yang Merusak Kerongkongan",
    "Penyakit Pencernaan"
  ],
  [
    "ibs",
    "IBS: Sindrom Usus Sensitif yang Perlu Diet Rendah FODMAP",
    "Penyakit Pencernaan"
  ],
  [
    "appendisitis",
    "Appendisitis: Nyeri Perut Kanan Bawah yang Butuh Operasi",
    "Penyakit Pencernaan"
  ],
  [
    "wasir",
    "Wasir (Hemoroid): Derajat 1-4 dengan Pengobatan Berbeda",
    "Penyakit Pencernaan"
  ],
  [
    "sirosis",
    "Sirosis Hati: Kerusakan Permanen dan Pencegahan Komplikasi",
    "Penyakit Pencernaan"
  ],
  [
    "pankreatitis",
    "Pankreatitis Akut: Nyeri Epigastrium dari Batu Empedu dan Alkohol",
    "Penyakit Pencernaan"
  ],
  [
    "batu-empedu",
    "Batu Empedu: Kolik Bilier dan Laparoskopi Kolesistektomi",
    "Penyakit Pencernaan"
  ],
  [
    "crohn",
    "Penyakit Crohn: IBD yang Menyerang Seluruh Saluran Cerna",
    "Penyakit Pencernaan"
  ],
  [
    "kolitis-ulseratif",
    "Kolitis Ulseratif: Peradangan Kolon dari Rektum ke Atas",
    "Penyakit Pencernaan"
  ],
  [
    "intoleransi-laktosa",
    "Intoleransi Laktosa: Hidup Nyaman Tanpa Produk Susu",
    "Penyakit Pencernaan"
  ],
  ["kanker-paru", "Kanker Paru: 85% Akibat Rokok yang Bisa Dicegah", "Kanker"],
  [
    "kanker-serviks",
    "Kanker Serviks: Vaksin HPV dan Pap Smear Mencegah Kematian",
    "Kanker"
  ],
  [
    "leukemia",
    "Leukemia: Kanker Darah dengan Kemajuan Terapi Modern",
    "Kanker"
  ],
  [
    "limfoma",
    "Limfoma: Hodgkin yang Bisa Disembuhkan dan Non-Hodgkin",
    "Kanker"
  ],
  [
    "kanker-kolorektal",
    "Kanker Kolorektal: Kolonoskopi Deteksi Polip Sebelum Jadi Kanker",
    "Kanker"
  ],
  [
    "kanker-hati",
    "Kanker Hati (HCC): Skrining AFP + USG Setiap 6 Bulan",
    "Kanker"
  ],
  [
    "kanker-lambung",
    "Kanker Lambung: Eradikasi H. pylori untuk Pencegahan",
    "Kanker"
  ],
  [
    "kanker-tiroid",
    "Kanker Tiroid: Prognosis Terbaik dari Semua Jenis Kanker",
    "Kanker"
  ],
  [
    "kanker-prostat",
    "Kanker Prostat: PSA Skrining dan Active Surveillance",
    "Kanker"
  ],
  [
    "kanker-ovarium",
    "Kanker Ovarium: Pembunuh Senyap yang Sering Terlambat Dideteksi",
    "Kanker"
  ],
  [
    "osteoarthritis",
    "Osteoarthritis: Dari Fisioterapi hingga Total Knee Replacement",
    "Tulang & Sendi"
  ],
  [
    "fibromialgia",
    "Fibromialgia: Nyeri Kronis Seluruh Tubuh yang Nyata",
    "Tulang & Sendi"
  ],
  [
    "herniated-disc",
    "HNP: Saraf Terjepit Tulang Belakang dan Penanganannya",
    "Tulang & Sendi"
  ],
  [
    "skoliosis",
    "Skoliosis: Deteksi Dini pada Remaja untuk Cegah Progres",
    "Tulang & Sendi"
  ],
  [
    "gout-sendi",
    "Gout: Serangan Nyeri Sendi Akut dari Kristal Asam Urat",
    "Tulang & Sendi"
  ],
  [
    "spondilitis",
    "Spondilitis Ankilosa: Tulang Belakang yang Menyatu Progresif",
    "Tulang & Sendi"
  ],
  [
    "tendinitis",
    "Tendinitis: Peradangan Tendon Achilles dan Rotator Cuff",
    "Tulang & Sendi"
  ],
  [
    "fraktur",
    "Fraktur: Penanganan Cepat dan Pemulihan Optimal",
    "Tulang & Sendi"
  ],
  [
    "osteomalasia",
    "Osteomalasia: Tulang Lunak Akibat Kekurangan Vitamin D",
    "Tulang & Sendi"
  ],
  [
    "lupus-muskuloskeletal",
    "Artritis Lupus: Manifestasi Sendi pada Penyakit Autoimun",
    "Tulang & Sendi"
  ],
  [
    "jerawat",
    "Akne Vulgaris: Panduan Lengkap Kulit Bersih dan Sehat",
    "Penyakit Kulit"
  ],
  [
    "eksim",
    "Eksim (Dermatitis Atopik): Emolien Rutin untuk Kulit Sensitif",
    "Penyakit Kulit"
  ],
  [
    "psoriasis",
    "Psoriasis: Bercak Merah Bersisik dan Terapi Modern",
    "Penyakit Kulit"
  ],
  [
    "urtikaria",
    "Urtikaria (Biduran): Identifikasi Pemicu dan Antihistamin",
    "Penyakit Kulit"
  ],
  [
    "herpes-zoster",
    "Herpes Zoster: Cacar Ular yang Perlu Antiviral Dini",
    "Penyakit Kulit"
  ],
  [
    "dermatitis-kontak",
    "Dermatitis Kontak: Kulit Merah Akibat Alergen atau Iritan",
    "Penyakit Kulit"
  ],
  [
    "scabies",
    "Skabies: Kudis Menular dengan Gatal Malam yang Khas",
    "Penyakit Kulit"
  ],
  ["tinea", "Infeksi Jamur Kulit: Kurap, Panu, dan Kutu Air", "Penyakit Kulit"],
  [
    "vitiligo",
    "Vitiligo: Bercak Putih Akibat Hilangnya Pigmen Kulit",
    "Penyakit Kulit"
  ],
  [
    "rosacea",
    "Rosacea: Kemerahan Wajah Persisten yang Butuh Perawatan",
    "Penyakit Kulit"
  ],
  [
    "katarak",
    "Katarak: Operasi Fakoemulsifikasi untuk Penglihatan Jernih",
    "Mata & THT"
  ],
  [
    "konjungtivitis",
    "Konjungtivitis: Mata Merah Viral, Bakteri, atau Alergi",
    "Mata & THT"
  ],
  [
    "retinopati-dm",
    "Retinopati Diabetik: Funduskopi Rutin Mencegah Kebutaan",
    "Mata & THT"
  ],
  [
    "degenerasi-makula",
    "Degenerasi Makula: Hilangnya Penglihatan Sentral pada Lansia",
    "Mata & THT"
  ],
  [
    "otitis-media",
    "Otitis Media: Infeksi Telinga Tengah yang Umum pada Anak",
    "Mata & THT"
  ],
  ["tinnitus", "Tinnitus: Bunyi Berdenging yang Bisa Dikelola", "Mata & THT"],
  [
    "polip-hidung",
    "Polip Hidung: Pertumbuhan Jinak yang Menyumbat Nafas",
    "Mata & THT"
  ],
  [
    "epistaksis",
    "Epistaksis (Mimisan): Penanganan yang Tepat dan Efektif",
    "Mata & THT"
  ],
  [
    "tuli-sensorineural",
    "Tuli Sensorineural: Kehilangan Pendengaran Permanen",
    "Mata & THT"
  ],
  [
    "strabismus",
    "Strabismus (Juling): Tangani Sebelum Usia 7 Tahun",
    "Mata & THT"
  ],
  [
    "anemia-kehamilan",
    "Anemia Kehamilan: Tablet Fe Wajib untuk Ibu Hamil",
    "Kesehatan Ibu & Anak"
  ],
  [
    "diabetes-gestasional",
    "Diabetes Gestasional: Jaga Gula Darah untuk Keselamatan Janin",
    "Kesehatan Ibu & Anak"
  ],
  [
    "diare-anak",
    "Diare Anak: Oralit dan Zinc adalah Pengobatan Utama",
    "Kesehatan Ibu & Anak"
  ],
  [
    "kejang-demam",
    "Kejang Demam: Penanganan yang Menenangkan Orang Tua",
    "Kesehatan Ibu & Anak"
  ],
  [
    "ispa-anak",
    "ISPA Anak: Kapan Antibiotik Benar-benar Diperlukan?",
    "Kesehatan Ibu & Anak"
  ],
  [
    "autism",
    "ASD: Deteksi Dini dan Intervensi Mengubah Masa Depan",
    "Kesehatan Ibu & Anak"
  ],
  [
    "adhd",
    "ADHD: Gangguan Perhatian yang Bisa Dikelola dengan Baik",
    "Kesehatan Ibu & Anak"
  ],
  [
    "thalassemia",
    "Thalassemia: Penyakit Genetik yang Butuh Transfusi Rutin",
    "Kesehatan Ibu & Anak"
  ],
  [
    "gizi-buruk",
    "Gizi Buruk Akut Berat (SAM): Tatalaksana WHO yang Menyelamatkan",
    "Kesehatan Ibu & Anak"
  ],
  [
    "prematur-bayi",
    "Bayi Prematur: Perawatan Intensif dan Kangaroo Mother Care",
    "Kesehatan Ibu & Anak"
  ],
  [
    "gangguan-bipolar",
    "Gangguan Bipolar: Mood Stabilizer untuk Cegah Relaps",
    "Kesehatan Mental"
  ],
  [
    "ansietas",
    "Gangguan Ansietas Umum: CBT dan SSRI yang Efektif",
    "Kesehatan Mental"
  ],
  [
    "skizofrenia",
    "Skizofrenia: Antipsikotik dan Dukungan Keluarga yang Krusial",
    "Kesehatan Mental"
  ],
  [
    "ocd",
    "OCD: Siklus Obsesi-Kompulsi yang Bisa Diputus dengan ERP",
    "Kesehatan Mental"
  ],
  [
    "ptsd",
    "PTSD: Trauma yang Butuh Terapi EMDR dan CBT Terstruktur",
    "Kesehatan Mental"
  ],
  [
    "insomnia",
    "Insomnia Kronis: CBT-I Lebih Efektif dari Obat Tidur",
    "Kesehatan Mental"
  ],
  [
    "burnout",
    "Burnout Kerja: Kelelahan Profesi yang Diakui WHO",
    "Kesehatan Mental"
  ],
  [
    "gangguan-panik",
    "Gangguan Panik: Serangan Cemas yang Memuncak 10 Menit",
    "Kesehatan Mental"
  ],
  [
    "fobia",
    "Fobia: Ketakutan Irasional yang Bisa Diterapi dengan Eksposur",
    "Kesehatan Mental"
  ],
  [
    "adiksi",
    "Adiksi Zat: Penyakit Otak yang Butuh Penanganan Komprehensif",
    "Kesehatan Mental"
  ],
  [
    "filariasis",
    "Filariasis Limfatik: Eliminasi Kaki Gajah dari Indonesia",
    "Penyakit Tropis"
  ],
  [
    "dengue-berat",
    "Dengue Berat: Manajemen Syok yang Kritis",
    "Penyakit Tropis"
  ],
  [
    "leishmaniasis",
    "Leishmaniasis: Infeksi Parasit dari Lalat Pasir",
    "Penyakit Tropis"
  ],
  [
    "schistosomiasis",
    "Skistosomiasis: Cacing di Danau Lindu dan Poso Sulawesi",
    "Penyakit Tropis"
  ],
  [
    "brucellosis",
    "Brucellosis: Demam Berulang dari Produk Hewan Ternak",
    "Penyakit Tropis"
  ],
  [
    "lyme",
    "Penyakit Lyme: Ruam Mata Sapi dari Gigitan Kutu",
    "Penyakit Tropis"
  ],
  [
    "plague",
    "Pes (Plague): Penyakit Bubo dari Bakteri Yersinia",
    "Penyakit Tropis"
  ],
  [
    "melioidosis",
    "Melioidosis: Infeksi Burkholderia Endemis Asia Tenggara",
    "Penyakit Tropis"
  ],
  [
    "chikungunya-kronik",
    "Artritis Kronis Pascachikungunya: Nyeri Sendi yang Berlanjut",
    "Penyakit Tropis"
  ],
  [
    "yellow-fever",
    "Demam Kuning: Vaksinasi Wajib untuk Perjalanan ke Afrika",
    "Penyakit Tropis"
  ],
  [
    "lupus-sle",
    "SLE: Penyakit Autoimun Multiorgan yang Perlu Dipantau Ketat",
    "Penyakit Autoimun"
  ],
  [
    "celiac",
    "Celiac Disease: Diet Bebas Gluten Seumur Hidup yang Mengubah Segalanya",
    "Penyakit Autoimun"
  ],
  [
    "vaskulitis",
    "Vaskulitis ANCA: Peradangan Pembuluh Darah dengan Imunosupresan",
    "Penyakit Autoimun"
  ],
  [
    "sjogren",
    "Sindrom Sjogren: Mata dan Mulut Kering Akibat Autoimun",
    "Penyakit Autoimun"
  ],
  [
    "scleroderma",
    "Skleroderma: Fibrosis Kulit dan Organ Internal Progresif",
    "Penyakit Autoimun"
  ],
  [
    "myasthenia-gravis",
    "Miastenia Gravis: Kelemahan Otot dari Antibodi Reseptor",
    "Penyakit Autoimun"
  ],
  [
    "guillain-barre",
    "GBS: Kelumpuhan Naik Pasca-infeksi yang Butuh IVIg",
    "Penyakit Autoimun"
  ],
  [
    "psoriatic-arthritis",
    "Artritis Psoriatis: Sendi dan Kulit yang Meradang Bersamaan",
    "Penyakit Autoimun"
  ],
  [
    "ibd-autoimun",
    "IBD: Mekanisme Imun di Balik Crohn dan Kolitis Ulseratif",
    "Penyakit Autoimun"
  ],
  [
    "addison-autoimun",
    "Penyakit Addison: Insufisiensi Adrenal yang Butuh Kortisol Seumur Hidup",
    "Penyakit Autoimun"
  ],
  [
    "vitamin-d",
    "Defisiensi Vitamin D: Dampak pada Tulang, Imunitas, dan Mood",
    "Kesehatan Umum"
  ],
  [
    "vitamin-b12",
    "Defisiensi Vitamin B12: Anemia Megaloblastik dan Neuropati",
    "Kesehatan Umum"
  ],
  [
    "dehidrasi",
    "Dehidrasi: Kenali Tanda dan Rehidrasi yang Tepat",
    "Kesehatan Umum"
  ],
  ["demam", "Demam: Kapan Obat Penurun Panas Diperlukan?", "Kesehatan Umum"],
  [
    "batuk-pilek",
    "Batuk Pilek: Tidak Selalu Butuh Antibiotik",
    "Kesehatan Umum"
  ],
  [
    "alergi-makanan",
    "Alergi Makanan: Dari Gatal hingga Anafilaksis yang Darurat",
    "Kesehatan Umum"
  ],
  [
    "alergi-debu",
    "Alergi Tungau Debu: Strategi Mengurangi Paparan di Rumah",
    "Kesehatan Umum"
  ],
  [
    "kurang-tidur",
    "Kurang Tidur: Bahaya yang Tidak Bisa Dikompensasi",
    "Kesehatan Umum"
  ],
  [
    "stres-kronis",
    "Stres Kronis: Kortisol Tinggi Merusak Kesehatan Jangka Panjang",
    "Kesehatan Umum"
  ],
  [
    "nyeri-punggung",
    "Nyeri Punggung Bawah: Aktif Bergerak Lebih Baik dari Bed Rest",
    "Kesehatan Umum"
  ],
  [
    "berhenti-merokok",
    "Berhenti Merokok: Strategi NRT dan Vareniklin yang Terbukti",
    "Kesehatan Umum"
  ],
  [
    "imunisasi-dewasa",
    "Vaksinasi Dewasa: Jadwal Imunisasi yang Sering Dilupakan",
    "Kesehatan Umum"
  ],
  [
    "cek-kesehatan",
    "Skrining Kesehatan Berkala: Investasi Terbaik untuk Umur Panjang",
    "Kesehatan Umum"
  ],
  [
    "hidup-sehat",
    "10 Pilar Hidup Sehat yang Terbukti Secara Ilmiah",
    "Kesehatan Umum"
  ],
  [
    "kolesterol",
    "Kolesterol Tinggi: Panduan Menurunkan LDL dengan Diet dan Statin",
    "Kesehatan Umum"
  ]
];
const generatedArticles = diseaseData.map(
  ([slug, title, category], i) => ({
    id: 21 + i,
    slug,
    title,
    metaDescription: `${title.split(":")[0]} adalah kondisi medis penting yang memengaruhi banyak orang Indonesia. Kenali gejala, penyebab, dan cara pengobatan yang tepat untuk kualitas hidup yang lebih baik.`,
    category,
    content: mkContent(
      title.split(":")[0],
      `${title.split(":")[0]} adalah kondisi medis yang penting untuk dipahami. Kondisi ini memengaruhi jutaan orang di Indonesia dan memerlukan penanganan yang tepat untuk mencegah komplikasi serius.`,
      "Gejala utama meliputi tanda-tanda klinis yang khas sesuai kondisi. Gejala bisa bervariasi dari ringan hingga berat. Penting untuk mengenali gejala awal agar penanganan bisa dilakukan sedini mungkin untuk hasil yang optimal.",
      "Penyebab melibatkan kombinasi faktor genetik, lingkungan, dan gaya hidup. Memahami faktor risiko membantu dalam upaya pencegahan yang lebih efektif.",
      "Pengobatan disesuaikan dengan tingkat keparahan kondisi. Kombinasi terapi medis, perubahan gaya hidup, dan dukungan keluarga memberikan hasil terbaik."
    ),
    imagePrompt: "Foto klinis modern tenaga medis profesional HEALIO MEDIKA merawat pasien, suasana homecare atau klinik bersih dan profesional, latar putih steril Indonesia",
    references: [
      `World Health Organization (WHO). ${title.split(":")[0]}. who.int`,
      `Kementerian Kesehatan RI. Pedoman ${title.split(":")[0]}. kemkes.go.id`
    ]
  })
);
const articles = [
  ...detailedArticles,
  ...generatedArticles
];
export {
  CATEGORIES as C,
  articles as a
};
