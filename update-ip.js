const os = require('os');
const fs = require('fs');
const path = require('path');

// Lấy danh sách network interfaces
const interfaces = os.networkInterfaces();
let ipAddress = 'localhost';

// Tìm IP IPv4 nội bộ (không phải loopback)
for (const name of Object.keys(interfaces)) {
  for (const net of interfaces[name]) {
    // Bỏ qua IPv6 và loopback
    if (net.family === 'IPv4' && !net.internal) {
      ipAddress = net.address;
      break;
    }
  }
  if (ipAddress !== 'localhost') break;
}

console.log(`[Viora-IP] Phát hiện IP nội bộ của máy tính: ${ipAddress}`);

// Cập nhật frontend/.env.local
const envPath = path.join(__dirname, 'frontend', '.env.local');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Cập nhật hoặc thêm NEXT_PUBLIC_API_URL
const apiPattern = /^NEXT_PUBLIC_API_URL=.*/m;
const apiValue = `NEXT_PUBLIC_API_URL=http://${ipAddress}:8080`;

if (apiPattern.test(envContent)) {
  envContent = envContent.replace(apiPattern, apiValue);
} else {
  envContent += `\n${apiValue}\n`;
}

// Làm sạch khoảng trắng thừa
envContent = envContent.trim() + '\n';

fs.writeFileSync(envPath, envContent, 'utf8');
console.log(`[Viora-IP] Đã tự động cập nhật frontend/.env.local thành:`);
console.log(`-----------------------------------------------`);
console.log(envContent);
console.log(`-----------------------------------------------`);
console.log(`\n👉 Thiết bị di động của bạn và máy tính phải kết nối cùng một mạng Wifi.`);
console.log(`👉 Trên điện thoại, truy cập giao diện web qua địa chỉ: http://${ipAddress}:3000`);
