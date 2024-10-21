import CryptoJS from 'crypto-js';

interface EncryptData {
  telegram_id: number;
  volunteer_rank: number;
}

export function createSecretToken(data: EncryptData) {
  const secret = import.meta.env.VITE_CMS_SECRET;

  const secretToken = CryptoJS.AES.encrypt(JSON.stringify(data), secret, {
    keySize: 128 / 8,
    iv: CryptoJS.enc.Utf8.parse(secret),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
  const secretStr = encodeURIComponent(secretToken);

  return { secretStr };
}
