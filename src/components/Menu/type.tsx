export interface MenuItem {
  id: number;
  title: string;
  icon?: string;
  icontrue?: string;
  path?: string;
  roles: string[];
  subMenu?: MenuItem[];
}

export interface MenuProps {
  role: string;
}
