document.addEventListener('DOMContentLoaded', () => {
    const whatsappButton = document.getElementById('whatsappButton');
    const messageElement = document.getElementById('message');
    const callButton = document.getElementById('callButton');
    const callMessage = document.getElementById('callMessage');
    const qrCodeButton = document.getElementById('qrCodeButton');
    const qrCodeModal = document.getElementById('qrCodeModal');
    const qrModalClose = document.getElementById('qrModalClose');
    const qrCodeCanvas = document.getElementById('qrCodeCanvas');
    const randomVerseButton = document.getElementById('randomVerseButton');
    const bibleVerseContainer = document.getElementById('bibleVerseContainer');
    const contactButton = document.getElementById('contactButton');

    const fixedPrimaryColor = '#10B981';

    let qrcode = null;

    // --- Ajuste para o botão Salvar meu contato (vCard) ---
    // Define os dados do vCard de forma mais organizada no JavaScript.
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
FN:Humberto Rodrigues
TEL:+5592988444395
EMAIL:apamoveis.humberto@gmail.com
END:VCARD`;
    contactButton.href = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcardContent)}`;
    contactButton.download = "Humberto_Rodrigues.vcf";

    // --- Versículos da Bíblia ---
    const bibleVerses = [
      "O Senhor é o meu pastor; de nada terei falta. - Salmos 23:1",
      "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna. - João 3:16",
      "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. - Provérbios 3:5",
      "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e tenha misericórdia de ti. - Números 6:24-25",
      "Mas buscai primeiro o reino de Deus, e a sua justiça, e todas essas coisas vos serão acrescentadas. - Mateus 6:33",
      "O teu amor, Senhor, chega até os céus; a tua fidelidade, até às nuvens. - Salmos 36:5",
      "Portanto, se alguém está em Cristo, é nova criação; as coisas antigas já passaram, eis que surgiram coisas novas. - 2 Coríntios 5:17",
      "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito. - Romanos 8:28",
      "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais. - Jeremias 29:11",
      "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei? - Salmos 27:1"
    ];

    // --- Lógica do Botão WhatsApp ---
    whatsappButton.addEventListener('click', function() {
      messageElement.classList.remove('hidden');
      messageElement.classList.add('message-animation');
    });

    // --- Lógica do Botão Ligar Agora ---
    callButton.addEventListener('click', function() {
      callMessage.classList.remove('hidden');
      callMessage.classList.add('message-animation');
      setTimeout(() => {
        callMessage.classList.add('hidden');
        callMessage.classList.remove('message-animation');
      }, 3000);
    });

    // --- Lógica do Botão Versículo Aleatório ---
    randomVerseButton.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * bibleVerses.length);
      const selectedVerse = bibleVerses[randomIndex];

      bibleVerseContainer.textContent = selectedVerse;
      bibleVerseContainer.classList.remove('hidden');
      bibleVerseContainer.classList.add('message-animation');
      
      setTimeout(() => {
          bibleVerseContainer.classList.remove('message-animation');
      }, 500);
    });
    
    // --- Lógica do QR Code ---
    qrCodeButton.addEventListener('click', () => {
      qrCodeModal.classList.add('active'); // Adiciona a classe 'active'
      setTimeout(() => {
        // A URL do seu cartão digital, como você pediu
        const currentUrl = "https://humbertorodrigues13.github.io/Digital-2025/";
        const qrCodeColor = fixedPrimaryColor;

        if (!qrcode) {
          qrcode = new QRious({
            element: qrCodeCanvas,
            value: currentUrl,
            size: 200,
            padding: 10,
            foreground: qrCodeColor
          });
        } else {
          qrcode.set({
            value: currentUrl,
            foreground: qrCodeColor
          });
        }
      }, 50);
    });

    qrModalClose.addEventListener('click', () => {
      qrCodeModal.classList.remove('active'); // Remove a classe 'active'
    });

    qrCodeModal.addEventListener('click', (e) => {
      if (e.target === qrCodeModal) {
        qrCodeModal.classList.remove('active'); // Remove a classe 'active'
      }
    });

    function moveProfilePic() {
      const profilePicContainer = document.querySelector('.profile-pic-container');
      profilePicContainer.classList.add('animate-bounce-once');
      setTimeout(() => {
        profilePicContainer.classList.remove('animate-bounce-once');
      }, 1000);
    }
    window.moveProfilePic = moveProfilePic;
});
