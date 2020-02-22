window.onload = function () {
  var qrcode = new QRCode(document.getElementById("qrcode"),{
    text: "http://www.baidu.com",
    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
    width: 160,
    height: 160,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
  var copyBtn = document.querySelector('.copyBtn')
  function handleClick(){
    var copytext = document.getElementById('copytext');
    const range = document.createRange();
    range.selectNode(copytext);
    const selection = window.getSelection();
    if(selection.rangeCount > 0) {
    selection.removeAllRanges();
    }
    selection.addRange(range);
    document.execCommand("Copy");
    alert('复制成功');
  }
  copyBtn.addEventListener('click', handleClick)
}