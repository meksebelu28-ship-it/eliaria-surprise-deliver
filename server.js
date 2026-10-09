require("dotenv").config();

const express = require("express");
const Groq = require("groq-sdk");
const fs = require("fs");
const path = require("path");

const app = express();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use(express.json({ limit: "20kb" }));

// Load website files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Load products from products.json
function getProducts() {
  const filePath = path.join(__dirname, "products.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Check whether a product discount is active
function getActiveDiscount(product) {
  const today = new Date().toISOString().slice(0, 10);
  const percent = Number(product.discountPercent || 0);

  const isActive =
    percent > 0 &&
    product.discountStart &&
    product.discountEnd &&
    today >= product.discountStart &&
    today <= product.discountEnd;

  return isActive ? percent : 0;
}

// Search products and apply the customer's budget
function searchProducts(message, products) {
  const query = message.toLowerCase();

  const words = query
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 2);

  const budgetMatch = query.match(
    /(?:under|below|less than|budget of|around)\s*\$?\s*(\d+)/i
  );

  const budget = budgetMatch
    ? Number(budgetMatch[1])
    : null;

  const scored = products.map(product => {
    const searchable = [
      product.name,
      product.category,
      product.description
    ].join(" ").toLowerCase();

    const score = words.reduce(
      (total, word) =>
        total + (searchable.includes(word) ? 1 : 0),
      0
    );

    return { product, score };
  });

  let matches = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);

  if (budget !== null) {
    matches = matches.filter(product => {
      const discount = getActiveDiscount(product);
      const finalPrice =
        Number(product.price) * (1 - discount / 100);

      return finalPrice <= budget;
    });
  }

  // If no products match the keywords, suggest other gifts
  if (matches.length === 0) {
    matches = products.filter(product => {
      if (budget === null) return true;

      const discount = getActiveDiscount(product);
      const finalPrice =
        Number(product.price) * (1 - discount / 100);

      return finalPrice <= budget;
    });
  }

  return matches.slice(0, 6).map(product => {
    const discount = getActiveDiscount(product);

    return {
      ...product,
      activeDiscountPercent: discount,
      finalPrice: Number(
        (Number(product.price) * (1 - discount / 100)).toFixed(2)
      )
    };
  });
}

// Website home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// AI gift assistant
app.post("/api/chat", async (req, res) => {
  console.log("AI request received");

  try {
    const message = String(req.body.message || "").trim();

    if (!message) {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    const products = getProducts();
    const matches = searchProducts(message, products);

    const catalog = matches.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      activeDiscountPercent: product.activeDiscountPercent,
      finalPrice: product.finalPrice,
      description: product.description,
      url: product.url
    }));

    const systemPrompt = `
You are the friendly AI shopping assistant for Elaria Surprise Deliver.
Recommend gifts from the supplied product catalog.
Be friendly, concise, and honest about prices and discounts.
Use the customer's language when possible.
Do not invent products or prices.
If no products fit the budget, explain that politely.
Product catalog: ${JSON.stringify(catalog)}
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_completion_tokens: 500
    });

    res.json({
      reply: completion.choices[0].message.content,
      products: matches
    });

  } catch (error) {
    console.error("AI error:", error);

    res.status(500).json({
      error: "AI failed. Check the VS Code Terminal."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});