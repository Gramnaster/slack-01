// Generates three-character codes for the main menu
export default function Codegen() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < 21; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result.replace(/(.{3})/g, '$1 ').trim();
}

