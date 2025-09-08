import { CardContent } from "@/components/ui/Card/card";
import Logo from "url:../../../public/logo.jpg";
import { Text } from "@/components/ui/Typography/Text";
import { Button } from "@/components/ui/Button/button";
import { LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext/ThemeContext";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import authenticationService from "@/services/authenticationService";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await authenticationService.logout();
      logout();
    } catch (error) {
      logout();
    }
  };

  return (
    <div id="header" className="flex flex-row gap-md m-md h-14" style={{width: '-webkit-fill-available', backgroundColor: 'var(--background)'}}>
      <div className="flex items-center justify-center h-14 rounded-lg bg-card border border-border p-md w-40 shadow-sm">
        <img src={Logo} alt="Logo" className="h-6 md:h-8" />
      </div>
      <CardContent className="flex flex-row gap-md h-14 flex-1 px-0">
        <div className="flex items-center bg-card border border-border rounded-lg p-sm w-full shadow-sm">
          <div className="flex-1 flex items-center justify-center">
            <Text type="h4">
              {title}
            </Text>
          </div>
          <div className="flex items-center bg-muted p-sm gap-2">
            <Button variant="outline" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <Text type="h6">Logout</Text>
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default Header;