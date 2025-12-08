// src/data/blog/preventive-screenings.ts
import { BlogPost } from "@/types/blog";

export const preventiveScreeningsPost: BlogPost = {
  id: 5,
  title: "Preventive Health Screenings: What You Need to Know",
  slug: "preventive-health-screenings",
  excerpt: "A comprehensive guide to recommended health screenings by age and risk factors to catch potential issues early.",
  content: `
      <p>Preventive health screenings are medical tests that help detect potential health problems before symptoms appear. Early detection often leads to more effective treatment and better outcomes. This guide outlines key screenings recommended for adults based on age and risk factors.</p>
      <h2>Screenings for Adults (18-39 years)</h2>
      <ul>
        <li><strong>Blood Pressure:</strong> Check every 2 years if normal (less than 120/80 mm Hg). If higher, your doctor may recommend more frequent monitoring.</li>
        <li><strong>Cholesterol:</strong> Start screening at age 20, then every 5 years if normal.</li>
        <li><strong>Diabetes:</strong> Test if you have high blood pressure or cholesterol.</li>
        <li><strong>HIV:</strong> Everyone ages 15 to 65 should be screened at least once.</li>
      </ul>
      <h2>Additional Screenings for Adults (40-64 years)</h2>
      <ul>
        <li><strong>Diabetes:</strong> Screen every 3 years after age 45, earlier if overweight.</li>
        <li><strong>Colorectal Cancer:</strong> Begin screening at age 45.</li>
        <li><strong>Lung Cancer:</strong> Annual screening with low-dose CT scan for adults 50-80 with a 20 pack-year smoking history who currently smoke or quit within the past 15 years.</li>
      </ul>
      <h2>Gender-Specific Screenings</h2>
      <h3>For Women:</h3>
      <ul>
        <li><strong>Cervical Cancer:</strong> Pap test every 3 years from age 21-29. From 30-65, either a Pap test every 3 years or an HPV test every 5 years, or both tests together every 5 years.</li>
        <li><strong>Breast Cancer:</strong> Mammograms every 1-2 years starting at age 40 or 50, depending on risk factors.</li>
        <li><strong>Osteoporosis:</strong> Bone density test starting at age 65, or earlier based on risk factors.</li>
      </ul>
      <h3>For Men:</h3>
      <ul>
        <li><strong>Prostate Cancer:</strong> Discuss PSA testing with your doctor starting at age 50 (or 45 for high-risk groups).</li>
        <li><strong>Abdominal Aortic Aneurysm:</strong> One-time screening for men ages 65-75 who have ever smoked.</li>
      </ul>
      <p>At Preventify, we offer comprehensive preventive health check packages tailored to your age, gender, and risk factors. Contact us today to schedule your screenings.</p>
    `,
  coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop",
  date: "May 15, 2024",
  author: "Dr. Vijay Krishnan",
  categories: ["prevention", "wellness", "healthcare"]
};
