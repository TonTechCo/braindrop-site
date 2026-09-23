(() => {
  const match = location.search.match(/^\?date=(\d{4}-\d{2}-\d{2})(?:&score=(0|[1-9]\d{0,3})&v=2)?$/);
  const date = match ? new Date(`${match[1]}T12:00:00`) : null;
  const day = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  if (!match || !Number.isFinite(date.getTime()) || day(date)!==match[1] || match[1]>day(new Date()) || (match[2]!==undefined && Number(match[2])>750)) {
    document.getElementById('invalid').hidden=false;
    return;
  }
  document.getElementById('challenge').hidden=false;
  document.getElementById('summary').textContent=`${date.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})} · Classic${match[2]!==undefined ? ` · Friend: ${match[2]} points` : ''}`;
  document.getElementById('open').href=`braindrop://challenge/${match[1]}${match[2]!==undefined ? `?score=${match[2]}&v=2` : ''}`;
  const config=window.brainDropInstall || {};
  const install=document.getElementById('install');
  const android=/Android/i.test(navigator.userAgent);
  if(android) {
    document.getElementById('device-note').textContent='Android is also in private testing. Contact support for access.';
  } else if(config.appStoreReleased || /^https:\/\/testflight\.apple\.com\/join\/[A-Za-z0-9]+$/.test(config.testFlightUrl || '')) {
    install.href=config.appStoreReleased ? config.appStoreUrl : config.testFlightUrl;
    install.textContent=config.appStoreReleased ? 'Get BrainDrop on the App Store' : 'Get BrainDrop through TestFlight';
    install.hidden=false;
    document.getElementById('availability').hidden=true;
  }
})();
