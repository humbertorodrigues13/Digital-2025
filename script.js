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

  const fixedPrimaryColor = '#10B981';

  let qrcode = null;

  // --- Versículos da Bíblia ---
  const bibleVerses = [
    // (A lista completa de versículos que você já tinha)
    "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos. - Hebreus 11:1",
    "Pois vivemos por fé, e não pelo que vemos. - 2 Coríntios 5:7",
    "Consequentemente, a fé vem por ouvir a mensagem, e a mensagem é ouvida mediante a palavra de Cristo. - Romanos 10:17",
    "Confie no Senhor de todo o seu coração e não se apoie no seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas. - Provérbios 3:5-6",
    "Por isso não tema, pois estou com você; não tenha medo, pois sou o seu Deus. Eu o fortalecerei e o ajudarei; eu o segurarei com a minha mão direita vitoriosa. - Isaías 41:10",
    "Jesus respondeu: 'Eu lhes garanto que, se vocês tiverem fé do tamanho de um grão de mostarda, poderão dizer a este monte: ‘Vá daqui para lá’, e ele irá. Nada lhes será impossível.' - Mateus 17:20",
    "O Senhor é a minha luz e a minha salvação; de quem terei temor? O Senhor é o meu forte refúgio; de quem terei medo? - Salmos 27:1",
    "Não se perturbe o coração de vocês. Creiam em Deus; creiam também em mim. - João 14:1",
    "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus. - Filipenses 4:6-7",
    "Quando estiver com medo, confiarei em ti. - Salmos 56:3",
    "Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna. - João 3:16",
    "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura os seus interesses, não se ira facilmente, não guarda rancor. O amor não se alegra com a injustiça, mas se alegra com a verdade. Tudo sofre, tudo crê, tudo espera, tudo suporta. - 1 Coríntios 13:4-7",
    "Amados, amemo-nos uns aos outros, pois o amor procede de Deus. Aquele que ama é nascido de Deus e o conhece. Quem não ama não conhece a Deus, porque Deus é amor. - 1 João 4:7-8",
    "Jesus respondeu: ‘Ame o Senhor, o seu Deus de todo o seu coração, de toda a sua alma e de todo o seu entendimento’. Este é o primeiro e maior mandamento. E o segundo, semelhante a ele, é: ‘Ame o seu próximo como a si mesmo’. - Mateus 22:37-39",
    "Mas Deus demonstra seu amor por nós: Cristo morreu em nosso favor quando ainda éramos pecadores. - Romanos 5:8",
    "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito. - Colossenses 3:14",
    "Sejam bondosos e compassivos uns com os outros, perdoando-se mutuamente, assim como Deus os perdoou em Cristo. - Efésios 4:32",
    "Mas o fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio. - Gálatas 5:22-23",
    "Acima de tudo, amem-se sinceramente, pois o amor perdoa muitíssimos pecados. - 1 Pedro 4:8",
    "O ódio provoca dissensão, mas o amor cobre todos os pecados. - Provérbios 10:12",
    "Porque sou eu que conheço os planos que tenho para vocês', diz o Senhor, 'planos de fazê-los prosperar e não de lhes causar dano, planos de dar-lhes esperança e um futuro'. - Jeremias 29:11",
    "Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito. - Romanos 8:28",
    "Deus é o nosso refúgio e a nossa fortaleza, auxílio sempre presente na adversidade. - Salmos 46:1",
    "Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, o Pai das misericórdias e Deus de toda a consolação, que nos consola em todas as nossas tribulações, para que, com a consolação que recebemos de Deus, possamos consolar os que estão passando por tribulações. - 2 Coríntios 1:3-4",
    "Mas aqueles que esperam no Senhor renovam as suas forças. Voam bem alto como águias; correm e não ficam exaustos, andam e não se cansam. - Isaías 40:31",
    "Tudo posso naquele que me fortalece. - Filipenses 4:13",
    "O Senhor está perto dos que têm o coração partido e salva os de espírito oprimido. - Salmos 34:18",
    "Ele o encherá de riso e os seus lábios de brados de alegria. - Jó 8:21",
    "O Senhor é bom, um refúgio em tempos de angústia. Ele protege os que nele confiam. - Naum 1:7",
    "Que o Deus da esperança os encha de toda alegria e paz, por meio da fé, para que vocês transbordem de esperança, pelo poder do Espírito Santo. - Romanos 15:13",
    "Não fui eu que lhe ordenei? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar. - Josué 1:9",
    "Tudo posso naquele que me fortalece. - Filipenses 4:13",
    "Mesmo quando eu andar por um vale de trevas e morte, não temerei perigo algum, pois tu estás comigo; a tua vara e o teu cajado me protegem. - Salmos 23:4",
    "Pois Deus não nos deu espírito de covardia, mas de poder, de amor e de equilíbrio. - 2 Timóteo 1:7",
    "Sejam fortes e corajosos. Não tenham medo nem fiquem apavorados por causa delas, pois o Senhor, o seu Deus, vai com vocês; nunca os deixará, nunca os abandonará. - Deuteronômio 31:6",
    "Ele fortalece o cansado e dá grande vigor ao que está sem forças. - Isaías 40:29",
    "É Deus quem me reveste de força e faz o meu caminho perfeito. - Salmos 18:32",
    "O meu corpo e o meu coração poderão fraquejar, mas Deus é a força do meu coração e a minha herança para sempre. - Salmos 73:26",
    "Não se entristeçam, porque a alegria do Senhor é a força de vocês. - Neemias 8:10",
    "Finalmente, fortaleçam-se no Senhor e no seu forte poder. - Efésios 6:10",
    "Pois o Senhor é quem dá sabedoria; de sua boca vêm o conhecimento e o entendimento. - Provérbios 2:6",
    "Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente, de forma alguma, sem restrições, e ser-lhe-á concedida. - Tiago 1:5",
    "A tua palavra é lâmpada para os meus pés e luz para o meu caminho. - Salmos 119:105",
    "O temor do Senhor é o princípio do conhecimento, mas os insensatos desprezam a sabedoria e a disciplina. - Provérbios 1:7",
    "A sabedoria é a coisa principal; adquire, pois, a sabedoria; sim, com tudo o que possuis, adquire o entendimento. - Provérbios 4:7",
    "Não se amoldem ao padrão deste mundo, mas transformem-se pela renovação da sua mente, para que sejam capazes de experimentar e comprovar a boa, agradável e perfeita vontade de Deus. - Romanos 12:2",
    "Eu o instruirei e o ensinarei no caminho que você deve seguir; eu o aconselharei e cuidarei de você. - Salmos 32:8",
    "Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos. - Provérbios 16:3",
    "Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção e para a instrução na justiça, para que o homem de Deus seja apto e plenamente preparado para toda boa obra. - 2 Timóteo 3:16-17",
    "Nele estão escondidos todos os tesouros da sabedoria e do conhecimento. - Colossenses 2:3",
    "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça. - 1 João 1:9",
    "Pois vocês são salvos pela graça, por meio da fé, e isto não vem de vocês, é dom de Deus; não por obras, para que ninguém se glorie. - Efésios 2:8-9",
    "Pois o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor. - Romanos 6:23",
    "Pois, se perdoarem as ofensas uns dos outros, o Pai celestial também lhes perdoará. - Mateus 6:14",
    "Sou eu, eu mesmo, aquele que apaga as suas transgressões, por amor de mim, e que não se lembra mais dos seus pecados. - Isaías 43:25",
    "Quem é comparável a ti, ó Deus, que perdoas o pecado e esqueces a transgressão do remanescente da sua herança? Tu não permaneces irado para sempre, mas tens prazer em mostrar a tua misericórdia. - Miqueias 7:18",
    "Arrependam-se, pois, e convertam-se para que os seus pecados sejam cancelados, a fim de que venham tempos de refrigério da parte do Senhor. - Atos 3:19",
    "Assim como o oriente está longe do ocidente, assim ele afasta de nós as nossas transgressões. - Salmos 103:12",
    "Em quem temos a redenção, a saber, o perdão dos pecados. - Colossenses 1:14",
    "O Senhor não demora em cumprir a sua promessa, como alguns a julgam demora. Pelo contrário, ele é paciente com vocês, não querendo que ninguém pereça, mas que todos cheguem ao arrependimento. - 2 Pedro 3:9",
    "Deixo-lhes a paz; a minha paz lhes dou. Não a dou como o mundo a dá. Não se perturbem os seus corações, nem tenham medo. - João 14:27",
    "E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus. - Filipenses 4:7",
    "Em paz me deito e logo durmo, pois só tu, Senhor, me fazes viver em segurança. - Salmos 4:8",
    "Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso. Tomem sobre vocês o meu jugo e aprendam de mim, pois sou manso e humilde de coração, e vocês encontrarão descanso para as suas almas. Pois o meu jugo é suave e o meu fardo é leve. - Mateus 11:28-30",
    "Tu guardarás em perfeita paz aquele cujo propósito está firme, porque em ti confia. - Isaías 26:3",
    "Que a paz de Cristo seja o juiz em seus corações, visto que vocês foram chamados para viver em paz, como membros de um só corpo. E sejam agradecidos. - Colossenses 3:15",
    "Que o Deus da esperança os encha de toda alegria e paz, por meio da fé, para que vocês transbordem de esperança, pelo poder do Espírito Santo. - Romanos 15:13",
    "Fui crucificado com Cristo. Assim, já não sou eu quem vive, mas Cristo vive em mim. A vida que agora vivo no corpo, vivo-a pela fé no Filho de Deus, que me amou e se entregou por mim. - Gálatas 2:20",
    "Portanto, se alguém está em Cristo, é nova criação. As coisas antigas já passaram; eis que surgiram coisas novas! - 2 Coríntios 5:17",
    "Tu criaste o íntimo do meu ser e me teceste no ventre de minha mãe. Eu te louvo porque me fizeste de modo especial e admirável. Tuas obras são maravilhosas! Digo isso com convicção. - Salmos 139:13-14",
    "Porque somos criação de Deus realizada em Cristo Jesus para fazermos boas obras, as quais Deus preparou de antemão para nós as praticarmos. - Efésios 2:10",
    "Portanto, irmãos, rogo-lhes pelas misericórdias de Deus que se ofereçam em sacrifício vivo, santo e agradável a Deus; este é o culto racional de vocês. - Romanos 12:1",
    "Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus. - 1 Tessalonicenses 5:18",
    "Este é o dia em que o Senhor agiu; alegremo-nos e exultemos nele. - Salmos 118:24",
    "O ladrão vem apenas para roubar, matar e destruir; eu vim para que tenham vida, e a tenham plenamente. - João 10:10",
    "Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas lhes serão acrescentadas. - Mateus 6:33",
    "O Senhor o guiará constantemente; satisfará as suas necessidades numa terra escaldada e fortalecerá os seus ossos. Você será como um jardim bem regado, como uma fonte cujas águas nunca faltam. - Isaías 58:11"
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
  
  // --- Lógica do QR Code CORRIGIDA ---
  qrCodeButton.addEventListener('click', () => {
    console.log("Botão 'Gerar QR Code' clicado."); // Adicionado para depuração
    qrCodeModal.classList.remove('hidden');
    
    // Removi o setTimeout, a geração acontece imediatamente
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
  });

  qrModalClose.addEventListener('click', () => {
    qrCodeModal.classList.add('hidden');
  });

  qrCodeModal.addEventListener('click', (e) => {
    if (e.target === qrCodeModal) {
      qrCodeModal.classList.add('hidden');
    }
  });

  // --- Função da foto de perfil ---
  // A função original procurava por uma classe que não existia no HTML.
  // Por favor, garanta que a tag <div> que contém a imagem tenha a classe "profile-pic-container".
  function moveProfilePic() {
    const profilePicContainer = document.querySelector('.profile-pic-container');
    if (profilePicContainer) {
      profilePicContainer.classList.add('animate-bounce-once');
      setTimeout(() => {
        profilePicContainer.classList.remove('animate-bounce-once');
      }, 1000);
    }
  }
  window.moveProfilePic = moveProfilePic;
});
