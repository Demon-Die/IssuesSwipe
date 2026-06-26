const { execSync } = require('child_process');
const token = "vca_8q4N4L9OQtjDTNWm5JxXpmKsP5kf1nEbyFd6nI4f08KaXciWuH1dh1r8";
const dpl = "dpl_GrcQTVVWrwtYYryK6JJKUcbwB2oa";

async function run() {
  console.log("Triggering request...");
  execSync('curl -s -I https://issues-swipe-eta.vercel.app/swipe > /dev/null');
  
  await new Promise(r => setTimeout(r, 2000));
  console.log("Fetching logs...");
  const res = await fetch(`https://api.vercel.com/v2/now/deployments/${dpl}/events?direction=backward&limit=10`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log(JSON.stringify(data.filter(e => e.type !== 'build'), null, 2));
}
run();
