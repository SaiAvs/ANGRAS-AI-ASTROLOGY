import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage for bookings
interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  birthPlace: string;
  preferredDate: string;
  message: string;
  paymentScreenshot?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  amount: number;
  createdAt: string;
}

const bookings: Booking[] = [
  {
    id: "ANG-8492",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    birthDate: "1994-06-15",
    birthPlace: "New Delhi, India",
    preferredDate: "2026-07-20",
    message: "Seeking career guidance for transition into leadership and spiritual alignment.",
    status: "Confirmed",
    amount: 2500,
    createdAt: "2026-07-10T10:30:00Z"
  },
  {
    id: "ANG-3921",
    fullName: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+91 91234 56789",
    birthDate: "1998-11-22",
    birthPlace: "Mumbai, India",
    preferredDate: "2026-07-22",
    message: "Questions regarding relationship compatibility and life path numbers.",
    status: "Pending",
    amount: 2500,
    createdAt: "2026-07-11T14:15:00Z"
  }
];

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Angras" });
});

// Bookings Endpoints
app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.post("/api/bookings", (req, res) => {
  const { fullName, email, phone, birthDate, birthPlace, preferredDate, message, paymentScreenshot } = req.body;
  if (!fullName || !email || !birthDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newBooking: Booking = {
    id: `ANG-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName,
    email,
    phone: phone || "",
    birthDate,
    birthPlace: birthPlace || "",
    preferredDate: preferredDate || new Date().toISOString().split('T')[0],
    message: message || "",
    paymentScreenshot: paymentScreenshot || "",
    status: "Pending",
    amount: 2500,
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  res.status(201).json(newBooking);
});

app.patch("/api/bookings/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const booking = bookings.find(b => b.id === id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  if (['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
    booking.status = status;
  }
  res.json(booking);
});

// AI Reading Endpoint
app.post("/api/generate-reading", async (req, res) => {
  const { name, dob, birthPlace, birthTime } = req.body;
  if (!name || !dob) {
    return res.status(400).json({ error: "Name and Date of Birth are required" });
  }

  // Calculate Mulank (sum of digits of birth day reduced to single digit 1-9)
  const day = parseInt(dob.split('-')[2] || dob.split('/')[2] || "1");
  const calculateSingleDigit = (num: number): number => {
    while (num > 9) {
      num = String(num).split('').reduce((acc, d) => acc + parseInt(d), 0);
    }
    return num || 1;
  };

  const mulank = calculateSingleDigit(day);

  // Calculate Bhagyank (sum of all digits of full DOB YYYYMMDD)
  const cleanDob = dob.replace(/[-\/]/g, '');
  const totalDobSum = cleanDob.split('').reduce((acc, d) => acc + parseInt(d), 0);
  const bhagyank = calculateSingleDigit(totalDobSum);

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Fallback deterministic reading if API key is not present
    return res.json({
      name,
      mulank,
      bhagyank,
      personalityTraits: ["Magnetic presence", "Intuitive depth", "Visionary mindset", "Empathetic listener"],
      strengths: ["Natural leadership", "High emotional intelligence", "Resilience through transformation", "Creative problem solving"],
      challenges: ["Overthinking minor details", "Impatience with slow progress", "Protecting personal energy from burnout"],
      careerGuidance: "You thrive in roles that combine strategic vision with human connection. Consider leadership, creative direction, consulting, or holistic ventures.",
      relationshipInsights: "You seek profound soulful connections. Transparency and emotional safety are your pillars in love.",
      luckyNumbers: [mulank, bhagyank, (mulank + 3) % 9 || 9],
      luckyColors: ["Celestial Blue", "Cosmic Gold", "Midnight Violet"],
      recommendedPractices: ["Daily 10-minute meditation at sunrise", "Journaling gratitude before sleep", "Wearing golden or blue crystals like Lapis Lazuli"],
      aiSummary: `Greetings ${name}. Guided by Mulank ${mulank} and Bhagyank ${bhagyank}, your cosmic chart reveals a rare alignment of ancient intuition and modern ambition. You possess an innate gift for inspiring others while navigating life's complex transitions with grace.`
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const prompt = `Act as an expert Vedic astrologer and master numerologist. Generate a deeply personalized, mystical, and uplifting astrological and numerological reading for:
Name: ${name}
Date of Birth: ${dob}
Birth Place: ${birthPlace || 'Unknown'}
Birth Time: ${birthTime || 'Unknown'}
Calculated Mulank (Day Number): ${mulank}
Calculated Bhagyank (Destiny/Life Path Number): ${bhagyank}

Return a valid JSON object with the following keys:
- name (string)
- mulank (number)
- bhagyank (number)
- personalityTraits (array of 4 strings)
- strengths (array of 4 strings)
- challenges (array of 3 strings)
- careerGuidance (string)
- relationshipInsights (string)
- luckyNumbers (array of 3 numbers)
- luckyColors (array of 3 strings)
- recommendedPractices (array of 3 strings)
- aiSummary (string, 3-4 inspiring sentences)
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const parsed = JSON.parse(text);
    res.json(parsed);

  } catch (error: any) {
    console.error("Gemini reading error:", error);
    // Fallback response on error
    res.json({
      name,
      mulank,
      bhagyank,
      personalityTraits: ["Deeply intuitive", "Charismatic aura", "Determined spirit", "Philosophical outlook"],
      strengths: ["Natural magnetism", "Unyielding perseverance", "Strong strategic insight", "Compassionate leadership"],
      challenges: ["Balancing ambition with inner peace", "Managing high expectations", "Overcoming occasional self-doubt"],
      careerGuidance: "Your chart indicates exceptional aptitude in pioneering enterprises, advisory roles, creative arts, and visionary entrepreneurship.",
      relationshipInsights: "You value loyalty and intellectual chemistry above all. Nurturing open dialogue deepens your bonds.",
      luckyNumbers: [mulank, bhagyank, 7],
      luckyColors: ["Cosmic Gold", "Royal Purple", "Deep Obsidian"],
      recommendedPractices: ["Morning breathwork (Pranayama)", "Moonlight meditation on full moon nights", "Crystal alignment with Amethyst"],
      aiSummary: `Welcome, ${name}. Your celestial signature, anchored by Mulank ${mulank} and Bhagyank ${bhagyank}, points toward a transformative cycle of personal growth, creative mastery, and spiritual awakening.`
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Angras server running on http://localhost:${PORT}`);
  });
}

startServer();
