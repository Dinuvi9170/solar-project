import { SignIn } from "@clerk/clerk-react";

const Signin = ()=>{
    return(
        <main className="w-full h-screen flex justify-center items-center">
            <SignIn/>
        </main>
    )
}

export default Signin;