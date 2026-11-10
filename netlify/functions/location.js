// Releases the venue only on the reveal dates. Eswatini time (UTC+2).
// The venue is read from the EVENT_LOCATION environment variable,
// so it never appears in the page or in your code repository.
const OPENS = Date.parse('2026-11-28T00:00:00+02:00');
const CLOSES = Date.parse('2026-11-30T00:00:00+02:00');

const reply = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify(body)
});

exports.handler = async () => {
  const now = Date.now();
  if (now < OPENS) return reply(200, { status: 'locked' });
  if (now >= CLOSES) return reply(200, { status: 'over' });
  const place = process.env.EVENT_LOCATION;
  if (!place) return reply(500, { status: 'error', message: 'EVENT_LOCATION is not set' });
  return reply(200, { status: 'open', place });
};
