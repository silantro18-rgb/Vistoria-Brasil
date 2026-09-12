// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Fecha menu ao clicar em link
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTop.classList.add('show');
  } else {
    backTop.classList.remove('show');
  }
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== FORMULÁRIO =====
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const servico = document.getElementById('servico').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !telefone || !servico) {
    formMsg.textContent = '⚠️ Por favor, preencha todos os campos obrigatórios.';
    formMsg.className = 'form-msg error';
    return;
  }

  // Simulação de envio
  formMsg.textContent = '✅ Solicitação enviada com sucesso! Entraremos em contato em breve.';
  formMsg.className = 'form-msg success';

  // Monta mensagem para WhatsApp (opcional)
  const texto = `Olá! Gostaria de agendar uma vistoria.%0A%0A*Nome:* ${nome}%0A*E-mail:* ${email}%0A*Telefone:* ${telefone}%0A*Serviço:* ${servico}%0A*Mensagem:* ${mensagem}`;
  const whatsappURL = `https://wa.me/551239422447?text=${texto}`;

  setTimeout(() => {
    window.open(whatsappURL, '_blank');
  }, 1200);

  form.reset();

  setTimeout(() => {
    formMsg.textContent = '';
    formMsg.className = 'form-msg';
  }, 6000);
});

// ===== MÁSCARA TELEFONE =====
const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 6) {
    v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  } else if (v.length > 2) {
    v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
  } else if (v.length > 0) {
    v = `(${v}`;
  }
  e.target.value = v;
});

// ===== ANIMAÇÃO AO ROLAR =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .feature, .company-card, .about-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = '0.6s ease';
  observer.observe(el);
});

// ===== ANO DINÂMICO NO FOOTER =====
const anoAtual = new Date().getFullYear();
const footerBottom = document.querySelector('.footer-bottom p');
if (footerBottom) {
  footerBottom.textContent = `© ${anoAtual} Vistoria Brasil — Todos os direitos reservados.`;
}
