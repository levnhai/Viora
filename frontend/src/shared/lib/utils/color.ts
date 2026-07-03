export const getAvatarColor = (name: string) => {
  const colors = [
    { bg: "bg-pink-100/80 text-pink-700" },
    { bg: "bg-blue-100/80 text-blue-700" },
    { bg: "bg-green-100/80 text-green-700" },
    { bg: "bg-amber-100/80 text-amber-700" },
    { bg: "bg-purple-100/80 text-purple-700" },
    { bg: "bg-teal-100/80 text-teal-700" },
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
