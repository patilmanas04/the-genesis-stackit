import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/Signup";
import { X } from "lucide-react";
import Logo from "../../public/White Logo.svg";
interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  return (
    <Dialog open={open}>
      <DialogTitle className="sr-only">User Authentication</DialogTitle>
      <DialogContent className="max-w-5xl bg-white border-none p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image or Info */}
          <div className="hidden md:flex relative items-center justify-center p-0 overflow-hidden">
            {/* Background Image */}
            <img
              src="https://cdn.pixabay.com/photo/2023/11/09/07/40/house-8376550_1280.jpg"
              alt="background"
              className="absolute inset-0 w-full h-full object-fill"
            />

            {/* Overlay Logo Image */}
            <div className="z-10 flex items-center justify-center w-auto h-auto p-4 bg-black rounded-full">
              <img
                src={Logo}
                alt="logo"
                className="pt-3 w-20 h-20 object-contain"
              />
            </div>
          </div>

          {/* Right: Form Tabs */}
          <div className="p-6 relative w-full">
            <button
              onClick={onClose}
              className="absolute right-0 top-0 h-10 w-10 bg-white flex items-center justify-center text-black hover:bg-stackit-primary hover:text-white rounded-bl-xl z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="w-full justify-center gap-2 bg-muted rounded-lg mb-6">
                <TabsTrigger value="login" className="w-full py-2 rounded-lg">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="w-full py-2 rounded-lg">
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Login onSuccess={onClose} />
              </TabsContent>
              <TabsContent value="signup">
                <Signup/>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
