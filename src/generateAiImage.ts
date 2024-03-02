export default async function generateAiImage(prompt: string) {
  try {
    const image = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt || "random car material or texture",
        n: 1,
        size: "256x256",
      }),
    }).then((res) => res.json());

    console.log(image.data[0].url);

    return image.data[0].url;
  } catch (error) {
    console.log(error);
    return "Error Generating Image";
  }
}
