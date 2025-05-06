import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request) => {
  try {
    // Extract data from token
    const token = request.cookies.get("token")?.value || "";

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    return decodedToken.id;

  } catch (error) {
    throw new Error(error.message);
  }
};
