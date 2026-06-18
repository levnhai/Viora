import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { LandingPage } from "@/views/landing/ui/LandingPage";
import { WeddingInvitationDemoPage } from "@/views/wedding-invitation-demo/ui/WeddingInvitationDemoPage";
import { WeddingInvitationPage } from "@/views/wedding-invitation/ui/WeddingInvitationPage";
import { LoginPage } from "@/views/login/ui/LoginPage";
import { BuyerDashboardPage } from "@/views/buyer-dashboard/ui/BuyerDashboardPage";
import { AdminDashboardPage } from "@/views/admin/ui/AdminDashboardPage";
import { WeddingEditorPage } from "@/views/wedding-editor/ui/WeddingEditorPage";

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<BuyerDashboardPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/create" element={<WeddingEditorPage />} />
      <Route path="/edit/:weddingSlug" element={<WeddingEditorPage isEditMode={true} />} />
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
