/**
 * Returns a time-adaptive greeting based on the current local hour:
 * - 04:00 - 11:59: Good Morning
 * - 12:00 - 16:59: Good Afternoon
 * - 17:00 - 03:59: Good Evening
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}

export default getGreeting;
