
// src/data/blogPosts.ts
import { BlogPost } from "@/types/blog";
import { diabetesPreventionPost } from "./blog/diabetes-prevention";
import { heartHealthCuisinePost } from "./blog/heart-health-cuisine";
import { exerciseRoutinesPost } from "./blog/exercise-routines";
import { stressManagementPost } from "./blog/stress-management";
import { preventiveScreeningsPost } from "./blog/preventive-screenings";
import { glycemicIndexPost } from "./blog/glycemic-index";
import { keralaHealthCrisisPost } from "./blog/kerala-health-crisis";

export const blogPosts: BlogPost[] = [
  keralaHealthCrisisPost,
  diabetesPreventionPost,
  heartHealthCuisinePost,
  exerciseRoutinesPost,
  stressManagementPost,
  preventiveScreeningsPost,
  glycemicIndexPost,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
