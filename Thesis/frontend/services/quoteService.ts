export const getDailyQuote = async () => {
    try {
      const res = await fetch('https://zenquotes.io/api/today');
      const data = await res.json();
  
      return {
        text: data[0].q,
        author: data[0].a,
      };
    } catch (error) {
      return {
        text: 'Trust your dreams. They were given to you for a reason.',
        author: 'Unknown',
      };
    }
  };
  