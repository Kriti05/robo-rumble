import connectDB from "@/lib/db";
import User from "@/Models/User.js";
import { NextResponse } from "next/server";

// Isse ensure hoga ki naya registration hote hi list update ho jaye
export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).sort({ createdAt: -1 }); 
    return NextResponse.json(users);
  } catch (error) {
    console.error("Fetch Error:", error); // Debugging ke liye log zaruri hai
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}