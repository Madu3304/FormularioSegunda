document.getElementById('formLogin').addEventListener('submit', async function (e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message);
        window.location.href = "/FormularioSegunda/Views/html/teste.html"
        // Redirecionar ou carregar dados do usuário, se quiser
        // window.location.href = "/dashboard.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erro ao tentar dar login:', error);
      alert("Erro de conexão com o servidor.");
    }
})