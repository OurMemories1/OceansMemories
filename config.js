/* Konten bisa diedit sesuai nama, foto, dan pesan yang ingin kamu kenang.
   Simpan foto di folder assets/ lalu sesuaikan nilai src di bawah.
   Autoplay audio dicoba otomatis, tetapi browser HP mungkin meminta interaksi pertama. */
const CONFIG = {
    pageTitle: "Our Last Memories",
    crushName: "Ryy",
    senderName: "Zull",
    typingSpeed: 30,
    ui: { dear: "For", back: "Back" },
    theme: {},
    effects: {
        floaters: true,       // hati & kilau naik pelan
        snow: true,           // salju turun perlahan
        snowAmount: 1,        // 0.5 = lebih sedikit, 1.5 = lebih lebat
        waves: true,          // ombak di bawah layar
        boat: true,           // perahu kertas berlayar
        stars: true,          // bintang & bulan
        shootingStars: true,  // bintang jatuh sesekali
        cursorTrail: true,    // jejak salju di kursor (desktop)
        mascot: true          // Pipi si penguin
    },
    mascot: {
        name: "Acidd",
        hint: "psst… coba ketuk penguinnya atau bulannya ✨",
        moonWish: "bulan nya indah yaa,kaya kamu hehehe ✨",
        pageLines: [
            "Hai Ryy… aku acid. Aku temani kamu baca ya ❄",
            "Pelan-pelan aja bacanya, aku ngga ke mana-mana.",
            "Kata owner, suara kamu indah, aku si gapercaya yaa",
            "Owwwwwshittt,there's so cute fr",
            "Ini foto yg masih owner simpan, katanya si selamanya.",
            "Makasii yaa?.",
            "Dibaca yaa,makasi udah baca sampai akhir,i love you,ryy♡"
        ],
        tapLines: [
            "Kenapaa cantikk?.",
            "*kepak kepak* 🐧",
            "bulannya pencet juga dong,jangan aku teruss.",
            "Makasi yaa udah jadi bagian dari hidup owner",
            "Kamu baca aja aku jagain perahu kertasnya. ⛵",
            "Semangat yaa kuliahnyaaa.",
            "from owner: i love u,always"
        ]
    },
    music: { src: "song.mp3", enabled: true },
    opening: {
        badge: "Surat yg tersimpan oleh lautan",
        headline: "Ada yg masih tersimpan",
        subhead: "di antara ombak yang pulang dan senja yang perlahan hilang.",
        message: "Tentang kenangan yang tak benar-benar pergi, meski kita sudah lama tak kembali.",
        signature: "dibaca yaa, semoga kamu bisa maafin aku setelah ini",
        button: "Open The Memories"
    },
    letter: {
        title: "Untuk kenangan yang pernah ada",
        message: "Kadang aku merindukan hal-hal sederhana yang dulu terasa biasa saja. Percakapan kecil, tawa yang datang tanpa alasan, dan waktu yang seolah berjalan lebih lambat saat kita bersama.\n\nSekarang semuanya hanya tinggal ingatan. Seperti jejak kaki di pasir, ombak datang dan menghapusnya, tetapi bukan berarti jejak itu tak pernah ada.\n\nAku tidak menulis ini untuk memintamu kembali. Aku hanya ingin memberi tempat bagi kenangan itu, agar ia bisa tinggal dengan tenang, seperti laut yang menyimpan banyak cerita di dasarnya.",
        button: "Lihat isi Surat"
    },
    little: {
        title: "Tentang kamu yg selalu aku ingat",
        items: [
            { icon: "🌊", title: "Suara", text: "Suaramu,caramu memanggil namaku, caramu memanggilku sayang dengan lembut,serta tawamu yg selalu aku rindukan,selalu terdengar disaat dunia sedang tidak berpihak padaku" },
            { icon: "🌫️", title: "Jarak", text: "Waktu membuat kita jauh, tanpa benar-benar menjelaskan bagaimana caranya." },
            { icon: "🕯️", title: "Sisa cahaya", text: "Beberapa kenangan redup, namun tak sepenuhnya padam." }
        ],
        button: "See The Memories"
    },
    memories: {
        title: "Four Pict Of Us",
        photos: [
            { src: "ssml.jpg", caption: "Inget ga waktu kita cp nama?lucu yaa,ini akun smurf kita ber2" },
            { src: "sscall.jpg", caption: "Dulu,hampir setiap hari kita ngobrol di tlpon,jirlah" },
            { src: "her.jpg", caption: "Namaku yg kamu simpan didalam baju" },
            { src: "us2.jpg", caption: "Our First Date" }
        ],
        paragraphs: [
            "Ada masa ketika kita tidak sadar sedang menciptakan kenangan. Kita hanya menjalani hari, tertawa untuk hal-hal kecil, dan mengira esok akan selalu memberi kesempatan yang sama.",
            "Kini, saat mengingatnya kembali, semuanya terasa seperti memandang laut dari kejauhan. Indah, sedikit menyakitkan, dan tak mungkin kugenggam lagi.",
            "Empat foto ini bukan cara untuk menahan masa lalu. Ini hanya ruang kecil untuk berterima kasih pada waktu yang pernah mempertemukan kita."
        ],
        button: "Ada satu lagi"
    },
    soloMemory: {
        title: "Satu foto, banyak yang kurindukan",
        photo: { src: "us.jpg", caption: "Satu kenangan yang tak ingin kubenci" },
        paragraphs: [
            "Dari semua hal yang berlalu, kadang satu gambar saja cukup untuk membawa kita kembali ke waktu yang jauh. Bukan karena kita ingin tinggal di sana selamanya, melainkan karena pernah ada bagian hidup yang terasa begitu berarti.",
            "Seperti laut yang menyimpan suara ombak bahkan setelah pantainya sepi, aku menyimpan kenangan ini tanpa harus mengubah apa pun yang telah terjadi.",
            "Semoga suatu hari nanti, saat foto ini kulihat lagi, yang tersisa bukan hanya rasa kehilangan, tetapi juga rasa syukur karena pernah memiliki momen seindah itu."
        ],
        button: "Lanjutkan"
    },
    why: {
        title: "Yang ingin kusampaikan",
        items: [
            { title: "Terima kasih", text: "Untuk waktu yang pernah kita bagi, meski akhirnya tidak berjalan selamanya." },
            { title: "Maaf", text: "Maaf atas semua rasa sakit dan rasa kecewa yg aku berikan padamu." },
            { title: "Rindu", text: "Rindu yg kau sebut akan hilang seiring berjalannya waktu,namun hingga kini rasa itu masih tetap untuh,dan akan terus seperti itu." },
            { title: "Something", text: "Haii ryy, di block ini boleh aku bicara sedikit? makasi ya,makasi buat semua nya,bisa menjadi milikmu adalah suatu anugerah terbesar dalam hidupku,aku harap,kita akan terus seperti ini sampai waktu mempertemukan kita kembali,aku akan selalu mencintaimu,dimanapun,kapapun." }
        ],
        button: "Baca pesan terakhir"
    },
    final: {
        badge: "sebelum halaman ini ditutup",
        headline: "Semoga laut menjaga cerita kita",
        paragraphs: [
            "Mungkin kita tak akan kembali menjadi seperti dulu. Dan mungkin memang tidak semua cerita diciptakan untuk memiliki akhir yang sama seperti awalnya.",
            "Jika suatu hari angin laut membawa ingatan tentang kita, semoga aku bisa tersenyum kecil. Karena meski semuanya telah lama berlalu, pernah ada waktu ketika kenangan itu membuat hidup terasa lebih hangat.",
            "Terima kasih telah menjadi bagian dari cerita yang akan selalu kuingat. Aku akan membiarkan ombak membawa sisanya, perlahan, tanpa membenci apa pun.", 
            "Maaf,aku tidak bermaksud mengganggu mu lagi, aku janji ini adalah pesan terakhir yangg aku kirimkan padamu, biarlah rasa ini terus ada sampai batas waktu yang tidak akan ada batasnya",
            "Rasanya seperti halaman terakhir dari buku yang sangat kusayangi, kuletakkan perlahan, bukan karena tak ingin membacanya lagi, tapi karena tau tak akan ada kisah yg mampu menyamai perasaan ini, maafkan segala salah yg pernah kubuat selama ini, maafkan semua kecewa yg aku berikan padamu, beribu maaf mungkin tak cukup untuk memaafkan orang sepertiku, namun, aku harap dengan web yang aku buat sendiri ini, kamu bisa membuka pintu maaf untukku, jika ombak terlalu keras padamu,menepilah,aku akan selalu menjadi pulau terdekat diantara lautan yang kamu sebrangi. "
        ],
        from: "Namamu selalu punya ruang tersendiri dihatiku,",
        button: "Baca dari awal"
    },
    /* Kotak pesan di halaman terakhir, untuk membalas ke pembuat web.
       Isi SALAH SATU supaya pesan langsung sampai ke kamu:
         whatsapp: nomor format 62..., tanpa + atau spasi (contoh "6281234567890")
         email: alamat email yang menerima pesan
       Kalau keduanya kosong, pesan hanya bisa dibagikan lewat menu HP atau disalin. */
    reply: {
        whatsapp: "6285723562786",
        email: "rasyidzull7@gmail.com",
        title: "Kalau kamu mau membalas",
        hint: "Tulis apa saja untuk Zull di sini, sependek atau sepanjang yang kamu mau.",
        namePlaceholder: "nama (boleh kosong)",
        messagePlaceholder: "tulis pesanmu di sini…",
        button: "Kirim pesan"
    }
};
