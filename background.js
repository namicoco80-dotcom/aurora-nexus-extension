// 라이선스 검증 및 상태 관리
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.local.set({ isPro: false, trialEnds: Date.now() + 14 * 86400000 });
    chrome.tabs.create({ url: 'https://aurora-nexus.com/welcome' });
  }
});

// 결제 완료 시 호출될 메시지 리스너
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.type === 'LICENSE_ACTIVATED') {
    chrome.storage.local.set({ isPro: true, licenseKey: message.key });
    sendResponse({ success: true });
  }
});