import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Auth(){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [isSignUp, setIsSignUp]=useState(false);
    const [message, setMessage]=useState("");

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        setMessage("");

        const { error }=isSignUp
        ? await supabase.auth.signUp({email, password})
        : await supabase.auth.signInWithPassword({ email, password });

        if(error) setMessage(error.message);
        else setMessage(isSignUp? "Check your email to confirm." : "Logged in!");
    };

    return(
        <div styles></div>
    )
}