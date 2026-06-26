const token = "vca_8q4N4L9OQtjDTNWm5JxXpmKsP5kf1nEbyFd6nI4f08KaXciWuH1dh1r8";
const dpl = "dpl_GrcQTVVWrwtYYryK6JJKUcbwB2oa";
async function run() {
  const res = await fetch(`https://api.vercel.com/v2/now/deployments/${dpl}/events?direction=backward&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const errors = data.filter(e => e.type === 'stderr');
  console.log(JSON.stringify(errors, null, 2));
}
run();
