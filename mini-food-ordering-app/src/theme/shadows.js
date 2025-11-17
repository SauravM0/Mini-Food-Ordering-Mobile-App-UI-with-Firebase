// src/theme/shadows.js
const shadows = {
  // Subtle shadow for cards to create depth and separation
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    // Web compatibility
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
};

export default shadows;