import { Mail, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/userProvider";

interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
  joinDate?: string;
}

export default function Profile() {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const context = useContext(userContext);
  const { fetchUserDetails } = context || {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("Auth-Token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserDetails?.().then((data) => {
        const formattedDate = new Date(
          data.userDetails.createdAt
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        if (data) {
          setUser({
            name: data.userDetails.username || "Guest",
            email: data.userDetails.email || "guest123@gmail.com",
            avatar: data.userDetails.profilePhoto || "",
            joinDate: formattedDate || `Joined in ${new Date().getFullYear()}`,
          });
          localStorage.setItem("User-Info", JSON.stringify(data));
        }
      });
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [fetchUserDetails]);

  console.log(new Date().getFullYear());
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-10 p-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-white text-xl font-semibold">Profile</h1>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10 pb-12">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center text-center sm:items-start sm:justify-start sm:text-left">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32 ring-4 ring-white shadow-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-3xl font-semibold">
                    {user?.name ? getInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Name and Join Date */}
              <div className="flex-1 min-w-0 mt-5">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user?.name || "Loading..."}
                </h1>
                <div className="flex justify-center sm:justify-start items-center text-md">
                  <Calendar className="w-4 h-4 mr-2" />
                  {user?.joinDate || `Joined in ${new Date().getFullYear()}`}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium text-gray-700">
                          User Name
                        </Label>
                        <p className="text-gray-900">{user?.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium text-gray-700">
                          Email
                        </Label>
                        <p className="text-gray-900">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
