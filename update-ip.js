const os = require("os");
const fs = require("fs");
const path = require("path");

// Lấy danh sách network interfaces
const interfaces = os.networkInterfaces();
let ipAddress = "localhost";

// Tìm IP IPv4 nội bộ thật (ưu tiên Wi-Fi, Ethernet và bỏ qua các card mạng ảo)
const validIps = [];
for (const name of Object.keys(interfaces)) {
  const isVirtual = /vmnet|virtual|vEthernet|loopback|wsl/i.test(name);
  for (const net of interfaces[name]) {
    if (net.family === "IPv4" && !net.internal) {
      if (!isVirtual) {
        validIps.unshift(net.address);
      } else {
        validIps.push(net.address);
      }
    }
  }
}

if (validIps.length > 0) {
  ipAddress = validIps[0];
}

console.log(`[Viora-IP] Phát hiện IP nội bộ của máy tính: ${ipAddress}`);

// Cập nhật frontend/.env.local
const envPath = path.join(__dirname, "frontend", ".env.local");
let envContent = "";

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, "utf8");
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
envContent = envContent.trim() + "\n";

fs.writeFileSync(envPath, envContent, "utf8");
