// src/data/blog/glycemic-index.ts
import { BlogPost } from "@/types/blog";

export const glycemicIndexPost: BlogPost = {
  id: 6,
  title: "Understanding the Glycemic Index for Better Blood Sugar Control",
  slug: "understanding-glycemic-index",
  excerpt: "Learn how the glycemic index can help you make food choices that support stable blood sugar levels.",
  content: `
      <p>The Glycemic Index (GI) is a valuable tool for anyone looking to manage their blood sugar levels, whether you have diabetes, prediabetes, or simply want to optimize your health. This scale rates carbohydrate-containing foods according to how quickly they raise blood glucose levels.</p>
      <h2>What is the Glycemic Index?</h2>
      <p>The GI ranks foods on a scale from 0 to 100 based on how much they raise blood sugar levels after eating:</p>
      <ul>
        <li><strong>Low GI foods (55 or less):</strong> Slowly digested, absorbed, and metabolized, causing a lower and slower rise in blood glucose</li>
        <li><strong>Medium GI foods (56-69):</strong> Cause moderate blood sugar elevation</li>
        <li><strong>High GI foods (70 or above):</strong> Quickly digested and absorbed, causing rapid spikes in blood sugar</li>
      </ul>
      <h2>Common Foods by GI Rating</h2>
      <h3>Low GI Foods:</h3>
      <ul>
        <li>Most non-starchy vegetables</li>
        <li>Most fruits (especially apples, oranges, berries)</li>
        <li>Legumes (beans, lentils, chickpeas)</li>
        <li>Unprocessed whole grains (steel-cut oats, barley)</li>
        <li>Dairy products</li>
      </ul>
      <h3>Medium GI Foods:</h3>
      <ul>
        <li>Whole wheat products</li>
        <li>Brown rice</li>
        <li>Sweet potatoes</li>
        <li>Basmati rice</li>
      </ul>
      <h3>High GI Foods:</h3>
      <ul>
        <li>White bread</li>
        <li>White rice</li>
        <li>Potatoes</li>
        <li>Most breakfast cereals</li>
        <li>Processed snack foods</li>
      </ul>
      <h2>Traditional Kerala Foods and Their GI</h2>
      <p>Many traditional Kerala foods have favorable glycemic indices:</p>
      <ul>
        <li><strong>Idli and Dosa:</strong> Medium GI (especially when made with parboiled rice)</li>
        <li><strong>Brown Rice Puttu:</strong> Lower GI than white rice versions</li>
        <li><strong>Avial:</strong> Low GI due to the mix of vegetables</li>
        <li><strong>Sambar:</strong> Low GI thanks to the lentils and vegetables</li>
      </ul>
      <p>At Preventify's diabetes management program, our nutritionists work with you to create meal plans that incorporate low GI foods while respecting your cultural food preferences and taste preferences.</p>
    `,
  coverImage: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?q=80&w=1587&auto=format&fit=crop",
  date: "May 8, 2024",
  author: "Dr. Maya Joseph",
  categories: ["diabetes", "nutrition", "wellness"]
};
