import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Plus,
  User,
  LogOut,
  Settings,
  MessageSquare,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { userContext } from "../../context/userProvider";

import logo from "../../public/new-logo.svg"
interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
}

export function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();
  
const context = useContext(userContext);

const { fetchUserDetails } = context || {};

  useEffect(() => {
    // Check localStorage for token
    const token = localStorage.getItem("Auth-Token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserDetails().then((data) => {
        if (data) {
          setUser({
            name: data.name || "Guest",
            email: data.email || "guest123@gmail.com",
            avatar: data.avatar || "",
          });
          localStorage.setItem("User-Info", JSON.stringify(data));
        }
      });
      const storedUser = localStorage.getItem("User-Info");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } 
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="StackIt Logo" className="h-50 w-20" />
            
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search questions..."
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-stackit-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {isLoggedIn && user ? (
              <>
                {/* Ask Question Button */}
                <Button
                  asChild
                  className="hidden sm:flex bg-stackit-primary hover:bg-stackit-primary/90"
                >
                  <Link to="/ask">
                    <Plus className="h-4 w-4 mr-2" />
                    Ask Question
                  </Link>
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {notificationCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-stackit-orange text-white text-xs">
                          {notificationCount > 9 ? "9+" : notificationCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    {/* Notification items here */}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        {user.avatar ? (
                          <AvatarImage src={user.avatar} alt={user.name} />
                        ) : (
                          <AvatarFallback className="bg-stackit-primary text-white">
                            {user.name}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-destructive"
                      onClick={() => {
                        // On logout, clear token & user data
                        localStorage.removeItem("Auth-Token");
                        localStorage.removeItem("User-Info");
                        setIsLoggedIn(false);
                        setUser(null);
                        navigate("/");
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button
                  asChild
                  className="bg-stackit-primary hover:bg-stackit-primary/90"
                >
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}