/*   loading gif图加载   */
const loadingCon=document.getElementById('loadingCon');
const loadingHeight=parseInt(getComputedStyle(loadingCon).height);
loadingCon.style.top=window.screen.height/2-loadingHeight/2-150+'px';