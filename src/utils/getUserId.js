import jwt from 'jsonwebtoken';

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    return decodedToken.userId || null;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
};


export default getUserIdFromToken