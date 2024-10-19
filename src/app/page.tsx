import RegisterForm from "@/components/forms/register-form";
import NavBar from "@/components/nav-bar/nav-bar";

export default function Home() {
  return (
  <div className="overflow-hidden">
    <NavBar />
    <RegisterForm/>
  </div>
  );
}
