import { Card } from "antd";
import SignUpForm from "./SignUpForm";



const SignUp = () => {


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
    >


      <Card style={{ width: 420 }} title="Регистрация">
        <SignUpForm />
      </Card>


    </div>
  );
};






export default SignUp;
