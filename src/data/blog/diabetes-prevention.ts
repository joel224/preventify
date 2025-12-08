// src/data/blog/diabetes-prevention.ts
import { BlogPost } from "@/types/blog";

export const diabetesPreventionPost: BlogPost = {
  id: 1,
  title: "Understanding Type 2 Diabetes Prevention",
  slug: "understanding-type-2-diabetes-prevention",
  excerpt: "Learn the essential strategies for preventing type 2 diabetes through lifestyle changes and regular health monitoring.",
  content: `
      <h2 class="text-2xl font-bold mt-8 mb-6 text-preventify-blue">Real Talk Q&A: Your Guide to Diabetes Prevention</h2>
      <div class="qa-grid">
        <div class="qa-card">
            <p class="question">Q: Can I actually prevent type 2 diabetes?</p>
            <p class="answer"><strong>A:</strong> Absolutely YES. Your daily choices matter more than your genes. Small changes today build powerful protection for tomorrow.</p>
        </div>
        <div class="qa-card">
            <p class="question">Q: What's the #1 thing I should do?</p>
            <p class="answer"><strong>A:</strong> Move your body. Just 30 minutes of walking daily can cut your risk by over 50%. No gym required - even dancing in your kitchen counts!</p>
        </div>
        <div class="qa-card">
            <p class="question">Q: I hate veggies. What now?</p>
            <p class="answer"><strong>A:</strong> Start with ONE. Add cherry tomatoes to your sandwich or try frozen berries in yogurt. Your taste buds adapt faster than you think.</p>
        </div>
        <div class="qa-card">
            <p class="question">Q: How much weight do I really need to lose?</p>
            <p class="answer"><strong>A:</strong> The surprising truth: losing just 5-7% of your body weight is a game-changer. For a 200lb person, that's only 10-14 pounds.</p>
        </div>
        <div class="qa-card">
            <p class="question">Q: Sugar - how bad is it really?</p>
            <p class="answer"><strong>A:</strong> Liquid sugar is the main culprit. One soda daily can significantly increase your diabetes risk. Swap to water with lemon; your body will feel the difference.</p>
        </div>
        <div class="qa-card">
            <p class="question">Q: I'm always stressed. Does that matter?</p>
            <p class="answer"><strong>A:</strong> Big time. Stress hormones spike your blood sugar. Try this: 60 seconds of deep breathing, three times a day. It works better than you think.</p>
        </div>
        <div class="qa-card">
            <p class="question">Q: What about sleep?</p>
            <p class="answer"><strong>A:</strong> Skimping on sleep makes you crave junk food and disrupts blood sugar control. Aim for a minimum of 7 hours. Your future self will high-five you.</p>
        </div>
        <div class="qa-card">
            <p class="question">Q: What's the easiest first step?</p>
            <p class="answer"><strong>A:</strong> Ditch sugary drinks TODAY. Replace them with water, herbal tea, or sparkling water. This single change can make the biggest difference, fast.</p>
        </div>
      </div>

      <div class="bg-blue-50 border-l-4 border-preventify-blue p-4 mt-8">
        <p class="font-bold text-preventify-blue m-0">Remember: You don't need a perfect plan. You need one small action that sticks.</p>
      </div>
    `,
  coverImage: "/food.webp",
  date: "June 10, 2024",
  author: "Dr. Anjali Menon",
  categories: ["diabetes", "wellness", "prevention"]
};
