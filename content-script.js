
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[p1.0] inject success')
  if (message.action === "getLocalStorage") {
    const allData = { ...localStorage };
    sendResponse(allData); // 返回所有 localStorage 内容
  }

  if (message.action === "clearLogin") {
    localStorage.removeItem('didih5_trinity_login_ticket');
    localStorage.removeItem('didih5_trinity_login_ticket_role_30004');
    sendResponse('success')
  }
});