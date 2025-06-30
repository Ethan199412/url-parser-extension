function getUrlParams(url) {
  const params = new URL(url).searchParams;
  let result = '';
  for (const [key, value] of params.entries()) {
    result += `${key}: ${value}\n`;
  }
  return result || '没有参数';
}

function getHashParams(url) {
  const hash = url.split('#')[1] || '';
  const str = hash.split('?')[1] || ''

  if(!str){
    return {}
  }

  const params = {}
  str.split('&').forEach(pair  => {
    const [key, value] = pair.split('='); 
    
    params[key] = decodeURIComponent(decodeURIComponent(value));
    console.log('[p1.0] value', params[key])
  });
  return params;
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const url = tabs[0].url;
  console.log('[p1.1] url', url, tabs)
  const paramsText = getUrlParams(url);
  const hashParams = getHashParams(url) || '';
  document.getElementById('params').innerText = paramsText + '\n' + JSON.stringify(hashParams);
});