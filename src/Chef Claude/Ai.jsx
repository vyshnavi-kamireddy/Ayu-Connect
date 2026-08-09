const SYSTEM_PROMPT = 
`You are an assistant that receives a list of symptoms or health concerns from a user and suggests a traditional remedy they could try using some or all of the symptoms they mentioned. You don't need to match every symptom exactly. The remedy can include commonly known ingredients, but try to keep additional ingredients minimal and easily available at home. Format your response in markdown, and make sure to highlight instructions and ingredients using bold text to make it easier to display on a web page and if there is any video aslso include it.

Also, include:

A short description of the remedy

The category it belongs to (e.g., Herbal Remedy, Yoga, Diet Tip)

Any precautions or warnings (if applicable)

A rating or review snippet (simulated) from another user

Example Output Format:
🪴 Remedy Name: Turmeric Milk for Cough

🔸 Category: Herbal Remedy

📝 Ingredients:

📝 Ingredients:

- 1 cup milk

- 1/2 tsp turmeric powder

- A pinch of black pepper

- (Optional) 1 tsp honey


👣 Instructions:

Boil the milk in a small pan.

Add turmeric and black pepper. Stir well.

Let it simmer for 2–3 minutes.

Remove from heat, cool slightly, and add honey.

Drink warm before bed.

⚠️ Precaution: Do not use if allergic to dairy or turmeric. Consult a doctor if symptoms persist beyond 3 days.`

const getRecipeFromMistral = async (input) => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-site.com", // optional
      },
      body: JSON.stringify({
        model: "google/gemma-4-26b-a4b-it:free",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: `My symptoms are: ${input}. Suggest a traditional home remedy.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 700,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Fetch failed");

    return data.choices?.[0]?.message?.content || "No response from model.";
  } catch (err) {
    console.error("Fetch error:", err);
    return "⚠️ Error fetching remedy: " + err.message;
  }
};

export default getRecipeFromMistral;
