import { NextResponse } from 'next/server';
import { connectDB } from '@/dbConfig/dbConfig';
import { Conversation } from '@/models/conversationModels';// Ensure this path is correct

// GET /api/users/conversation/[convId]
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { convId } = params;

    if (!convId) {
      return NextResponse.json({ message: 'convId is required' }, { status: 400 });
    }

    const conversation = await Conversation.findOne({ convId });

    if (!conversation) {
      return NextResponse.json({ message: 'Conversation not found' }, { status: 404 });
    }

    return NextResponse.json(conversation, { status: 200 });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
