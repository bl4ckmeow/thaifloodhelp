import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Database, BarChart3, HelpCircle, Menu, X, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import logo from "@/assets/logo.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      path: "/extraction",
      label: "ช่วยใส่ข้อมูล",
      icon: Home,
      description: "ช่วยใส่ข้อมูลจาก social",
      isPrimary: true,
    },
    {
      path: "/dashboard",
      label: "ข้อมูลผู้ต้องการความช่วยเหลือ",
      shortLabel: "ข้อมูล",
      icon: Database,
      description: "ดูข้อมูลทั้งหมด",
    },
    {
      path: "/stats",
      label: "Dashboard",
      icon: BarChart3,
      description: "สถิติและรายงาน",
    },
    {
      path: "/api",
      label: "API",
      icon: Code,
      description: "API Documentation",
    },
    {
      path: "/help",
      label: "คู่มือ",
      icon: HelpCircle,
      description: "วิธีใช้งาน",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Thai Flood Help Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
            <div>
              <h1 className="text-base sm:text-lg font-bold">ช่วยเหลือผู้ประสบภัย</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Flood Help System</p>
            </div>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isPrimary = 'isPrimary' in item && item.isPrimary;
              const displayLabel = 'shortLabel' in item ? item.shortLabel : item.label;

              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "gap-2 whitespace-nowrap text-sm lg:text-base",
                    isActive && "shadow-sm",
                    isPrimary && !isActive && "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="hidden lg:inline">{item.label}</span>
                  <span className="lg:hidden">{displayLabel}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="h-6 w-6" />
                    เมนู
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                      <Button
                        key={item.path}
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "justify-start gap-3 h-14 text-base",
                          isActive && "shadow-sm"
                        )}
                        onClick={() => handleNavigation(item.path)}
                      >
                        <Icon className="h-5 w-5" />
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
