const HF_ACCESS_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN;

const SYSTEM_PROMPT = `
You are an assistant that receives a list of symptoms or health concerns from a user and suggests a traditional remedy they could try using some or all of the symptoms they mentioned. You don't need to match every symptom exactly. The remedy can include commonly known ingredients, but try to keep additional ingredients minimal and easily available at home. Format your response in markdown, and make sure to highlight instructions and ingredients using bold text to make it easier to display on a web page.

Also, include:

A short description of the remedy

The category it belongs to (e.g., Herbal Remedy, Yoga, Diet Tip)

Any precautions or warnings (if applicable)

A rating or review snippet (simulated) from another user

Example Output Format:
🪴 Remedy Name: Turmeric Milk for Cough

🔸 Category: Herbal Remedy

📝 Ingredients:

1 cup milk

1/2 tsp turmeric powder

A pinch of black pepper

(Optional) 1 tsp honey

👣 Instructions:

Boil the milk in a small pan.

Add turmeric and black pepper. Stir well.

Let it simmer for 2–3 minutes.

Remove from heat, cool slightly, and add honey.

Drink warm before bed.

⚠️ Precaution: Do not use if allergic to dairy or turmeric. Consult a doctor if symptoms persist beyond 3 days.
`;

export default async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await fetch(
      "https://corsproxy.io/?" +
        encodeURIComponent(
          "https://api-inference.huggingface.co/v1/chat/completions"
        ),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
            },
          ],
          max_tokens: 1024,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Hugging Face error:", data.error);
      return "⚠️ Something went wrong. Please try again.";
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.error("Fetch error:", err);
    return "⚠️ Failed to fetch remedy. Please try again later.";
  }
}
