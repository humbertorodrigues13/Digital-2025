document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggleButton = document.getElementById('themeToggleButton');
  const whatsappButton = document.getElementById('whatsappButton');
  const messageElement = document.getElementById('message');
  const callButton = document.getElementById('callButton');
  const callMessage = document.getElementById('callMessage');
  const qrCodeButton = document.getElementById('qrCodeButton');
  const qrCodeModal = document.getElementById('qrCodeModal');
  const qrModalClose = document.getElementById('qrModalClose');
  const qrCodeCanvas = document.getElementById('qrCodeCanvas');

  // --- Definição dos Temas ---
  const themes = [
    {
      name: 'green',
      '--primary-color': '#10B981', // Tailwind green-500
      '--dark-primary-color': '#059669', // Tailwind green-600
      '--light-bg-color': '#F0FDF4', // Tailwind green-50
      '--gradient-start': '#D1FAE5', // Tailwind green-100
      '--gradient-end': '#A7F3D0', // Tailwind emerald-200
      '--text-color': '#374151', // Tailwind gray-700
      '--text-light-color': '#6B7280', // Tailwind gray-500
      '--primary-color-rgb': '16, 185, 129' // RGB para a sombra
    },
    {
      name: 'blue',
      '--primary-color': '#3B82F6', // Tailwind blue-500
      '--dark-primary-color': '#2563EB', // Tailwind blue-600
      '--light-bg-color': '#EFF6FF', // Tailwind blue-50
      '--gradient-start': '#DBEAFE', // Tailwind blue-100
      '--gradient-end': '#BFDBFE', // Tailwind blue-200
      '--text-color': '#1F2937', // Tailwind gray-800
      '--text-light-color': '#4B5563', // Tailwind gray-600
      '--primary-color-rgb': '59, 130, 246'
    },
    {
      name: 'purple',
      '--primary-color': '#A855F7', // Tailwind purple-500
      '--dark-primary-color': '#9333EA', // Tailwind purple-600
      '--light-bg-color': '#F5F3FF', // Tailwind purple-50
      '--gradient-start': '#EDE9FE', // Tailwind purple-100
      '--gradient-end': '#DDD6FE', // Tailwind purple-200
      '--text-color': '#4B5563', // Tailwind gray-600
      '--text-light-color': '#6B7280', // Tailwind gray-500
      '--primary-color-rgb': '168, 85, 247'
    }
  ];

  let qrcode = null; // Para armazenar a instância do QRious
  let currentThemeIndex = 0;

  // Função para aplicar um tema
  function applyTheme() {
    const currentTheme = themes[currentThemeIndex];

    for (const [key, value] of Object.entries(currentTheme)) {
      if (key.startsWith('--')) { // Aplica apenas variáveis CSS
        root.style.setProperty(key, value);
      }
    }
    // Atualiza a sombra do cartão dinamicamente
    document.querySelector('.card-custom-shadow').style.boxShadow = `0 20px 50px rgba(${currentTheme['--primary-color-rgb']}, 0.2)`;
  }

  // Carrega o tema salvo ou o tema padrão
  const savedThemeIndex = localStorage.getItem('selectedThemeIndex');
  if (savedThemeIndex !== null && themes[parseInt(savedThemeIndex)]) {
    currentThemeIndex = parseInt(savedThemeIndex);
  }
  
  applyTheme(); // Aplica o tema inicial corretamente

  // Event listeners
  themeToggleButton.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    localStorage.setItem('selectedThemeIndex', currentThemeIndex);
    applyTheme(); // Reaplica o tema com o novo tema
    // Se o modal do QR code estiver aberto, atualiza a cor do QR code
    if (!qrCodeModal.classList.contains('hidden') && qrcode) {
      qrcode.set({ foreground: themes[currentThemeIndex]['--primary-color'] });
    }
  });

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
    }, 3000); // Esconde a mensagem após 3 segundos
  });


  // --- Lógica do QR Code ---
  qrCodeButton.addEventListener('click', () => {
    qrCodeModal.classList.remove('hidden'); // Mostra o modal

    // Geração do QR Code com pequeno atraso para garantir renderização do canvas
    setTimeout(() => {
      const currentUrl = "https://humbertorodrigues13.github.io/VENDAS-HUMBERTO/"; 
      const currentPrimaryColor = themes[currentThemeIndex]['--primary-color']; // Captura a cor atual

      console.log('Tentando gerar QR Code para URL:', currentUrl);
      console.log('Usando cor primária:', currentPrimaryColor);
      console.log('Canvas element:', qrCodeCanvas);
      console.log('Canvas width:', qrCodeCanvas.width, 'height:', qrCodeCanvas.height); // Log das dimensões do canvas

      if (!qrcode) {
        qrcode = new QRious({
          element: qrCodeCanvas,
          value: currentUrl,
          size: 200, // Usa o size definido no HTML
          padding: 10,
          foreground: currentPrimaryColor
        });
        console.log('Nova instância QRious criada.');
      } else {
        // Atualiza o QR code existente
        qrcode.set({
          value: currentUrl,
          foreground: currentPrimaryColor
        });
        console.log('Instância QRious existente atualizada.');
      }
      // Adiciona uma verificação para garantir que o QR code foi desenhado
      // Isso verifica se algum pixel foi desenhado no canvas
      try {
          const ctx = qrCodeCanvas.getContext('2d');
          const imageData = ctx.getImageData(0, 0, 1, 1).data;
          if (imageData[3] === 0) { // Verifica o canal alfa do pixel (se for 0, está transparente/vazio)
              console.warn("QR Code pode não ter sido desenhado no canvas. Pixel superior esquerdo é transparente.");
          } else {
              console.log("QR Code parece ter sido desenhado com sucesso.");
          }
      } catch (e) {
          console.error("Erro ao verificar dados do canvas (pode ser restrição de segurança):", e);
      }


    }, 50); // Atraso de 50ms para garantir que o modal esteja renderizado
  });

  qrModalClose.addEventListener('click', () => {
    qrCodeModal.classList.add('hidden');
  });

  // Fechar modal clicando fora
  qrCodeModal.addEventListener('click', (e) => {
    if (e.target === qrCodeModal) {
      qrCodeModal.classList.add('hidden');
    }
  });

  // --- Animação da Foto de Perfil ---
  function moveProfilePic() {
    const profilePicContainer = document.querySelector('.profile-pic-container');
    profilePicContainer.classList.add('animate-bounce-once');
    setTimeout(() => {
      profilePicContainer.classList.remove('animate-bounce-once');
    }, 1000);
  }
  // Torna a função global para ser acessível via onclick no HTML
  window.moveProfilePic = moveProfilePic;
});
