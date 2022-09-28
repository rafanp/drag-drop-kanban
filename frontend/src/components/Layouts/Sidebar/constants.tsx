import { FaChartPie, FaLightbulb, FaTicketAlt, FaUsers } from 'react-icons/fa';

export const menuData = [
  {
    title: 'Notifications',
    icon: <FaChartPie />,
  },
  {
    title: 'Calendar',
    icon: <FaTicketAlt />,
    active: true,
  },
  {
    title: 'Kanban',
    icon: <FaLightbulb />,
  },
  {
    title: 'All Docs',
    icon: <FaUsers />,
  },
];
