export function setCookie(name, value, options = {}) {
  const ops = {
    path: '/',
    ...options,
  };

  if (ops.expires instanceof Date) {
    ops.expires = options.expires.toUTCString();
  }

  let newCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  for (const opsKey of Object.keys(ops)) {
    newCookie += `; ${opsKey}:${ops[opsKey]}`;
  }

  document.cookie = newCookie;
}

export function getCookie(name) {
  const cookieStr = document.cookie.toString();
  if (!cookieStr.includes(name)) return undefined;

  const start = cookieStr.indexOf(name) + name.length + 1;
  if (!cookieStr[start] || cookieStr[start] === ';') return undefined;
  const finish = cookieStr.indexOf(';', start) + 1;
  return finish ? cookieStr.slice(start, finish) : cookieStr.slice(start);
}

export function deleteCookie(name) {
  setCookie(name, '', {
    'max-age': -1,
  });
}
