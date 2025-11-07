import { SignIn } from "@clerk/clerk-react";

const Signin = ()=>{
    return(
        <main className="w-full h-screen fixed flex justify-center items-center">
            <SignIn/>
        </main>
    )
}

export default Signin;