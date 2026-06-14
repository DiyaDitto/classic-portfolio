export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields are required." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: "Invalid email address." });
  if (message.length < 10)
    return res.status(400).json({ error: "Message too short." });

  res.json({ success: true, message: "Message received! I'll get back to you soon." });
}