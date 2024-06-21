import { authFormSchema } from '@/lib/utils'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useState } from 'react';


const formSchema = authFormSchema();
interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeHolder: string,
    inputType?: string 
}

const CustomInput = ({control, name, label, placeHolder, inputType}: CustomInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField control={control} name={name}
        render={({field}) => (
            <div className='flex flex-col gap-1.5 w-full'>
                <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>{label}</FormLabel>

                <div className='flex w-full flex-col relative'>
                    <FormControl>
                        <Input
                            className='text-16 placeholder:text-16 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500 focus-visible:ring-offset-0'
                            placeholder={placeHolder}
                            type={inputType === "password" ?
                                    showPassword ? "text" : "password" : 
                                    "text"
                                }
                            {...field}
                        ></Input>
                    </FormControl>
                    <FormMessage className='text-12 text-red-500 mt-2'></FormMessage>
                    {
                        inputType === "password" && (
                            <div className="absolute right-2 top-3 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? (
                                        <AiOutlineEyeInvisible size={17} className="text-gray-400"></AiOutlineEyeInvisible>
                                    ) : (
                                        <AiOutlineEye size={17} className="text-gray-400"></AiOutlineEye>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        )}
    ></FormField>
  )
}

export default CustomInput