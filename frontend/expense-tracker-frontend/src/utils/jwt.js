// Minimal, dependency-free JWT payload decoder (no signature verification —
// verification always happens server-side; this is purely to read display
// claims like email/name/exp on the client).

export const decodeJwt = (token) => {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
    const decoded = atob(padded);
    const json = decodeURIComponent(
      decoded
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
    return JSON.parse(json);
  } catch (err) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const claims = decodeJwt(token);
  if (!claims || !claims.exp) return false;
  return Date.now() >= claims.exp * 1000;
};
