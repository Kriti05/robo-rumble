import connectDB from "@/lib/db";
import User from "@/Models/User.js"; // Fixed extension
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    // 1. Check if leader email is already registered
    const existingEmail = await User.findOne({ "leader.email": body.leader.email });
    if (existingEmail) {
      return NextResponse.json({ message: "Leader email already registered!" }, { status: 400 });
    }

    // 2. Check if Transaction ID is already used (to prevent fake entries)
    if (body.transactionId) {
      const existingUTR = await User.findOne({ transactionId: body.transactionId });
      if (existingUTR) {
        return NextResponse.json({ message: "This Transaction ID/UTR has already been submitted!" }, { status: 400 });
      }
    }

    // Save registration to MongoDB
    const newUser = await User.create(body);

    return NextResponse.json({ 
      message: "Registration Successful!", 
      data: newUser 
    }, { status: 201 });

  } catch (error) {
    console.error("DB Error:", error);
    // Agar MongoDB unique index error de (jaise email unique: true), toh ye handle karega
    if (error.code === 11000) {
      return NextResponse.json({ message: "Duplicate entry found (Email or UTR already exists)" }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}