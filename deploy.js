let pending = false;

start();

function trigger(node) {
  if (!pending) {
    try {
      if (['继续部署'].includes(node.textContent)) {
        console.log('%c 续部署触发成功', 'font-size:13px; background:#a7b335; color:#ebf779;', node, node.parentElement);
        node.parentElement.click();
      } else if (['开始部署'].includes(node.textContent)) {
        console.log('%c 开始部署触发成功', 'font-size:13px; background:#a7b335; color:#ebf779;', node, node.parentElement);
        node.childNodes && node.childNodes[0].click();
      } else {
        console.log('%c 触发失败', 'font-size:13px; background:#a7b335; color:#ebf779;', node, node.parentElement);
      }
    } catch (error) {
      
    }
    pending = true;
    setTimeout(() => {
      pending = false;
    }, 2000);
  }
}

function checkAndTrigger(node) {
  const triggerWords = ['继续部署', '开始部署'];
  if (triggerWords.includes(node.textContent)) {
    trigger(node, node.textContent);
  } else {
    if (node.childNodes.length > 0) {
      for (let child of node.childNodes) {
        checkAndTrigger(child);
      }
    }
  }
}

function start() {
  // 创建一个MutationObserver实例
  const observer = new MutationObserver((mutationsList, observer) => {
    console.log('%c 脚本检测中...', 'font-size:13px; background:#9be40a; color:#dfff4e;');
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // 检查新增的节点
        mutation.addedNodes.forEach(node => {
          checkAndTrigger(node);
        
        });
      }
    }
  });

  const configObserver = { childList: true, subtree: true, attributes: true };
  const targetNode = document.body;

  observer.observe(targetNode, configObserver);
}