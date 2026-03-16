// 生成一年中所有日期的列表
export interface CalendarDate {
  id: number;
  date: string;
}

/**
 * 生成从1月1日到12月31日的日期列表
 * @returns 包含所有日期对象的数组，每个对象有id和date属性
 */
export const generateCalendarDates = (): CalendarDate[] => {
  const dates: CalendarDate[] = [];
  const year = new Date().getFullYear();
  
  // 从1月1日到12月31日循环
  for (let month = 0; month < 12; month++) {
    // 获取每个月的天数
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      // 生成ID，格式为YYYYMMDD，例如20240101
      const id = year * 10000 + (month + 1) * 100 + day;
      // 格式化为"月日"格式，例如"1月1日"
      const dateStr = `${year}年 ${month + 1}月 ${day}日`;
      dates.push({ id, date: dateStr });
    }
  }
  
  return dates;
};

// 将日期列表保存到变量中
export const calendarDates = generateCalendarDates();

export function getDayOfYear(date = new Date()): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diffTime = date.getTime() - startOfYear.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}