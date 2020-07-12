export function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

export function decodeQueryParam(p) {
  return decodeURIComponent(p.replace(/\+/g, ' '));
}