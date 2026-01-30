// File: src/app/api/admin/update-status/route.js
import connectDB from "@/lib/db";
import User from "@/Models/User.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, newStatus } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: newStatus },
      { new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}