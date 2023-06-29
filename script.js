window.onload = async () => {
  const video = document.getElementById("video");
  const loading = document.getElementById("loading");
  const data = document.getElementById("data");

  const error = (message) => {
    loading.innerText = message;
    throw message;
  };

  const pick = (array) => array[Math.floor(Math.random() * array.length)];
  const hacked_statements = ["Yes", "Maybe", "Most Likely", "Highly Probable", "Potentially", "Unlikely But Still Possible", "Almost Certainly", "Definitely", "Absolutely"];

  try {
    const memes = [];
    const push = (tit, con, add) => memes.push(`${tit}: ${con}${add || ""}`);

    let step = 0;

    let fontSize = Math.min(window.innerHeight / 10, window.innerWidth / 10);
    data.style.fontSize = `${fontSize}px`;

    let my_ip = await (await fetch("https://myip.wtf/json").catch()).json().catch();
    let ip_data = await (await fetch(`https://uncors.vercel.app/?url=http://ip-api.com/json/${my_ip.YourFuckingIPAddress}`).catch()).json().catch();

    const videoData = await fetch("video.mp4").catch(error);
    video.src = URL.createObjectURL(await videoData.blob());
    video.load();

    video.oncanplaythrough = async () => {
      loading.style.display = "none";
      start.style.display = "flex";

      push("Haha", "Gottem!")
      if (my_ip && ip_data) {
        push("IP Address", ip_data.query);
        push("Hostname", my_ip.YourFuckingHostname);
        push("Country", `${ip_data.country} (${ip_data.countryCode})`);
        push("Region", `${ip_data.regionName} (${ip_data.region})`);
        push("City", ip_data.city);
        push("Latitude", ip_data.lat);
        push("Longitude", ip_data.lon);
        push("ISP", my_ip.YourFuckingISP);
      } else push("IP Address", "172.70.126.134");
      push("User Agent", navigator.userAgent);
      push("Connection Method", "GET");
      push("Request URL", "/");
      push("Request Path", "/");
      push("Request Protocol", "https");
      push("Secure Connection", location.href.includes('https') ? "Yes" : "No");
      push("Proxy IPs", "[]");
      push("Referrer", document.referrer ? document.referrer : 'direct')
      push("Browser cookies", navigator.cookieEnabled ? 'Yes' : 'No')
      push("Browser online", navigator.onLine ? 'Yes' : 'No')
      push("Window Properies", Object.keys(window).length);
      push("Window Width", window.innerWidth, "px");
      push("Window Height", window.innerHeight, "px");
      push("Window Ratio", `${window.innerWidth / window.innerHeight}/1`);
      push("Screen Width", window.screen.availWidth, "px");
      push("Screen Height", window.screen.availHeight, "px");
      push("Screen Ratio", `${window.screen.availWidth / window.screen.availHeight}/1`);
      push("Screen Pixel Ratio", window.devicePixelRatio, "/1");
      push("Screen DPI", window.devicePixelRatio);
      push("Screen Color Depth", window.screen.colorDepth);
      push("Screen Orientation", `${window.screen.orientation.type} (${window.screen.orientation.angle}Â°)`);
      push("Screen Rotation", window.screen.orientation.angle);
      push("OS", `${navigator.platform}`);
      push("Available Browser Memory", typeof window.performance.memory != "undefined" ? Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024) : null, "MB");
      push("CPU Threads", `${navigator.hardwareConcurrency}`);
      const canvas = document.createElement("canvas");
      let gl;
      let debugInfo;
      try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      } catch (e) {}
      if (gl && debugInfo) {
        push("GPU Vendor", gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
        push("GPU Info", gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
      }
      push("Device Memory", `${navigator.deviceMemory}`, 'GB');
      push("System Languages", navigator.languages.join(", "));
      push("Language", `${navigator.language}`);
      let date = new Date();
      push("Current Time", `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
      push("Timezone", Intl.DateTimeFormat().resolvedOptions().timeZone);
      push("Timezone Offset", date.getTimezoneOffset() / 60, " hours");
      push("Hacked", pick(hacked_statements));
    };

    start.onclick = async () => {
      window.onbeforeunload = () => console.log('member tried to leave page');
      start.style.display = "none";
      video.style.display = "flex";
      document.querySelector('img').style.display = 'none';
      video.play();

      let idk = document.createElement('style')
      idk.innerText = '* { color: black; }';
      document.body.appendChild(idk)

      const interval = setInterval(() => {
        const time = video.currentTime - 2.1 - (step * 60) / 132; // 132 bpm moment
        if (step >= memes.length) step = -Infinity;
        if (step < 0) return clearInterval(interval);
        if (time >= 0) {
          if (step == 0) document.title = `lmao this you? [${my_ip ? my_ip.YourFuckingIPAddress : "172.70.126.134"}]`;
          const el = document.createElement("span");
          el.textContent = `${memes[step]}`;
          step++;
          data.appendChild(el);
          const height = data.getBoundingClientRect().height;
          if (height >= window.innerHeight) {
            fontSize *= 0.88;
            data.style.fontSize = `${fontSize}px`;
          }
        }
      }, 5);
    };
    
    video.onended = () => {
      video.style.display = "none";
      step = -Infinity;
      if (confirm('if you have stayed til the end, you know this is fake. this site open source, and this is all a joke. send this to someone you hate for memes :)')) window.open('https://github.com/VillainsRule4000/roblox')
    };
  } catch (e) {
    error(`${e.message}`);
  }
};
