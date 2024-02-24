import jwt from 'jsonwebtoken';

const getRoleFromToken = (token) => {
  try {
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    return decodedToken.role || null;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
};

export default getRoleFromToken;