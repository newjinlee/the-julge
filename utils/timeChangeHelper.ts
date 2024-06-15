export const convertToKoreanTime = (utcTime: string, workhour: number) => {
  if (isNaN(Date.parse(utcTime))) {
    return 'Invalid time value';
  }

  const utcDate = new Date(utcTime);
  const startHours = utcDate.getUTCHours();
  let endHours = startHours + Math.floor(workhour);
  const minutes = (workhour % 1) * 60;

  if (endHours >= 24) {
    endHours -= 24;
    utcDate.setUTCDate(utcDate.getUTCDate() + 1);
  }

  return `${utcDate.toISOString().slice(0, 16).replace('T', ' ')}~${String(endHours).padStart(2, '0')}:${String(Math.round(minutes)).padStart(2, '0')}`;
};
