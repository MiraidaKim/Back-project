import { Card } from "antd"
import SignInForm from "./SignInForm"


const SignIn = () => {

    return (
        <div style={{minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 16}}>
            <Card style={{width: 420}} title="Sign In">
                <SignInForm />            
            </Card>
        </div>
    )
}

export default SignIn