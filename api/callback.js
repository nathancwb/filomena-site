export default async function handler(req, res) {
  const code = req.query.code;
  const client_id = process.env.OAUTH_GITHUB_CLIENT_ID;
  const client_secret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!code || !client_id || !client_secret) {
    return res.status(500).send('Variaveis de ambiente faltando ou code não recebido.');
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code
      })
    });
    
    const data = await response.json();
    const token = data.access_token;
    
    if (!token) {
      return res.status(500).send('Erro ao obter access token: ' + JSON.stringify(data));
    }
    
    // O Decap/Sveltia CMS espera esse postMessage na janela de pop-up
    const content = `
      <!DOCTYPE html>
      <html>
      <head><title>Autorizacao Sveltia CMS</title></head>
      <body>
        <script>
          (function() {
            function receiveMessage(e) {
              window.opener.postMessage(
                'authorization:github:success:{"token":"${token}","provider":"github"}',
                e.origin
              );
            }
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
          })()
        </script>
      </body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(content);
  } catch (error) {
    res.status(500).send('Falha na autenticacao: ' + error.message);
  }
}
