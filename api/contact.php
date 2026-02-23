<?php
// Heartland Boys Home — Contact Form Handler (Resend API)
// Receives JSON POST from any form on the site and emails to rschroetlin78@gmail.com

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$RESEND_API_KEY = 're_F5HtSi58_D7MMgNq7YL3TEjvdZGJv8fqj';
$TO_EMAIL       = 'rschroetlin78@gmail.com';

$body = json_decode(file_get_contents('php://input'), true);
if (!$body) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$formType  = isset($body['form_type']) ? $body['form_type'] : 'Contact Form';
$emailField = isset($body['from_email']) ? $body['from_email']
            : (isset($body['contact_email']) ? $body['contact_email']
            : (isset($body['email']) ? $body['email'] : null));
$nameField  = isset($body['from_name']) ? $body['from_name']
            : (isset($body['contact_name']) ? $body['contact_name']
            : (isset($body['name']) ? $body['name'] : $emailField));

if (!$emailField) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required email field']);
    exit;
}

// Human-readable labels
$labels = [
    'form_type'     => null,
    'from_name'     => 'Name',
    'from_email'    => 'Email',
    'phone'         => 'Phone',
    'subject'       => 'Subject',
    'message'       => 'Message',
    'agency'        => 'Agency / Organization',
    'contact_name'  => 'Contact Name',
    'contact_email' => 'Contact Email',
    'contact_phone' => 'Contact Phone',
    'youth_age'     => 'Youth Age',
    'donation_type' => 'Type',
    'description'   => 'Description',
    'notes'         => 'Additional Notes',
    'email'         => 'Email',
    'name'          => 'Name',
];

// Build table rows
$rows = '';
foreach ($body as $key => $value) {
    if ($key === 'form_type') continue;
    if (isset($labels[$key]) && $labels[$key] === null) continue;
    $label   = isset($labels[$key]) ? $labels[$key] : ucwords(str_replace('_', ' ', $key));
    $display = (trim((string)$value) !== '') ? htmlspecialchars($value) : '<em style="color:#999">Not provided</em>';
    $rows   .= "
        <tr>
            <td style='padding:10px 14px;font-weight:600;white-space:nowrap;border-bottom:1px solid #f0f0f0;color:#555;width:160px;'>{$label}</td>
            <td style='padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#222;'>{$display}</td>
        </tr>";
}

$html = "
<div style='font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;'>
    <div style='background:linear-gradient(135deg,#c41e3a,#8b0000);padding:28px 32px;border-radius:10px 10px 0 0;'>
        <h2 style='color:#fff;margin:0;font-size:1.4rem;'>New {$formType} Submission</h2>
        <p style='color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:0.9rem;'>Heartland Boys Home — heartlandboyshomenebraska.org</p>
    </div>
    <div style='background:#fff;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 10px 10px;padding:8px 0;'>
        <table style='width:100%;border-collapse:collapse;'>{$rows}</table>
    </div>
    <p style='color:#aaa;font-size:0.8rem;text-align:center;margin-top:16px;'>Submitted via heartlandboyshomenebraska.org</p>
</div>";

$subject = "New {$formType} from {$nameField}";

$payload = json_encode([
    'from'     => 'Heartland Boys Home <onboarding@resend.dev>',
    'to'       => [$TO_EMAIL],
    'reply_to' => $emailField,
    'subject'  => $subject,
    'html'     => $html,
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $RESEND_API_KEY,
        'Content-Type: application/json',
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200 || $httpCode === 201) {
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    error_log("Resend API error ({$httpCode}): {$response}");
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
