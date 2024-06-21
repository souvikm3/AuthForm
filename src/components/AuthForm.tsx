import { authFormSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomInput from './CustomInput';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from "../assets/logo.svg";

const AuthForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const formSchema = authFormSchema();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        console.log(values);
        const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;
        console.log(LOGIN_URL);

        try {
            setIsLoading(true)
            const data = {
                user: values.email,
                password: values.password
            }
            const response = await axios.post(LOGIN_URL, data);
            console.log("LOGIN API RESPONSE: ", response);
            if(response.status === 200){
                toast.success("User Logged In");
                // TODO: Add after login process
            }
        } catch (error) {
            console.log(error);
            toast.error("Login Failed");
        } finally{
            setIsLoading(false)
            form.reset({
                email: "",
                password: ""
            })
        }
    }

  return (
    <div className='flex min-h-screen w-full max-w-[500px] flex-col justify-center gap-5 py-10 md:gap-8'>
        {/* TODO: LOGO */}
        <img src={logo}></img>
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <CustomInput
                    control={form.control}
                    name='email'
                    label='Email'
                    placeHolder='Enter your email'
                ></CustomInput>

                
                <CustomInput
                    control={form.control}
                    name='password'
                    label='Password'
                    placeHolder='Enter your password'
                    inputType='password'
                ></CustomInput>
                
                <div className='flex flex-col gap-4'>
                    <Button type="submit" disabled={isLoading}>
                        {
                            isLoading ? (
                                <div className='flex items-center gap-2'>
                                    <Loader2 size={20} className="animate-spin"></Loader2>
                                    <p>Loading...</p>
                                </div>
                            ) : (
                                <p>Sign In</p>
                            )
                        }   
                    </Button>
                </div>
            </form>
        </Form>

    </div>
    
  )
}

export default AuthForm