function getUrlParams(url) {
  const params = new URL(url).searchParams;
  let result = '';
  for (const [key, value] of params.entries()) {
    result += `${key}: ${value}\n`;
  }
  return result || '没有参数';
}

function getHashParams(url) {
  const hash = url.split('#')[1];
  const str = hash.split('?')[1]

  const params = {}
  str.split('&').forEach(pair  => {
    const [key, value] = pair.split('='); 
    params[key] = decodeURIComponent(value);
  });
  return params;
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const url = tabs[0].url;
  const paramsText = getUrlParams(url);
  const hashParams = getHashParams(url);
  document.getElementById('params').innerText = paramsText + '\n' + JSON.stringify(hashParams);
});