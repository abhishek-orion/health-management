// Simple test to isolate Zod import issue
import { z } from "zod";

const testSchema = z.string();
console.log("Zod test schema created:", typeof testSchema);