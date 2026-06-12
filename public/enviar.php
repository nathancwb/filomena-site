<?php
/**
 * Recebe o formulario de contato do site e envia por e-mail.
 * Roda no HostGator (PHP). O Astro copia este arquivo de public/ para a raiz.
 *
 * Para mudar o destino dos leads, altere a linha $para abaixo.
 */

// ===== Configuracao =====
$para     = 'contato@filomenapropaganda.com.br';        // caixa que recebe os leads
// Remetente: precisa ser uma conta de e-mail real do dominio (criada no cPanel)
// para a entrega funcionar. Por padrao usa a mesma caixa de destino, que ja existe.
// Para um visual mais limpo, crie no-reply@filomenapropaganda.com.br e troque aqui.
$de       = 'contato@filomenapropaganda.com.br';
$site     = 'Site Filomena Propaganda';

header('Content-Type: application/json; charset=utf-8');

// So aceita POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'erro' => 'Metodo nao permitido']);
    exit;
}

// Honeypot anti-spam: se o campo oculto veio preenchido, e bot.
// Finge sucesso para nao dar pista ao spammer e nao envia nada.
if (!empty($_POST['b_website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

// ===== Coleta e limpeza dos campos =====
function limpa($v) {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], '', (string) $v));
}

$nome     = limpa($_POST['nome'] ?? '');
$email    = limpa($_POST['email'] ?? '');
$telefone = limpa($_POST['telefone'] ?? '');
$mensagem = trim($_POST['mensagem'] ?? '');

// ===== Validacao =====
$erros = [];
if ($nome === '')                                     $erros[] = 'nome';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))       $erros[] = 'email';
if ($telefone === '')                                 $erros[] = 'telefone';
if ($mensagem === '')                                 $erros[] = 'mensagem';

if ($erros) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'erro' => 'Campos invalidos', 'campos' => $erros]);
    exit;
}

// ===== Monta o e-mail =====
$assunto = "Novo contato pelo site - $nome";

$corpo  = "Voce recebeu um novo contato pelo formulario do site:\n\n";
$corpo .= "Nome: $nome\n";
$corpo .= "E-mail: $email\n";
$corpo .= "Telefone/WhatsApp: $telefone\n\n";
$corpo .= "Mensagem:\n$mensagem\n\n";
$corpo .= "---\nEnviado em " . date('d/m/Y H:i') . "\n";

$headers  = "From: $site <$de>\r\n";
$headers .= "Reply-To: $nome <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ===== Envia =====
$enviado = @mail($para, '=?UTF-8?B?' . base64_encode($assunto) . '?=', $corpo, $headers);

if ($enviado) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'erro' => 'Falha ao enviar o e-mail']);
}
