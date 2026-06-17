import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { LandingPage } from "@/pages/landing/ui/LandingPage";
import { WeddingInvitationDemoPage } from "@/pages/wedding-invitation-demo/ui/WeddingInvitationDemoPage";
import { WeddingInvitationPage } from "@/pages/wedding-invitation/ui/WeddingInvitationPage";

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <LandingPage 
            onPreviewDemo={() => {
              navigate("/wedding-demo");
            }}
          />
        } 
      />
      <Route 
        path="/wedding-demo" 
        element={
          <WeddingInvitationDemoPage 
            onBack={() => navigate("/")}
            onSelect={() => {
              navigate("/");
              setTimeout(() => {
                const el = document.getElementById("dang-ky-tu-van");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 150);
            }}
          />
        } 
      />
      <Route path="/w/:weddingSlug" element={<WeddingInvitationPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
