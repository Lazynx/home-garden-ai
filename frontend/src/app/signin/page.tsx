// // sign in: 'use client'
// 'use client'
// import React, { useState, ChangeEvent, FormEvent } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '@/context/AuthContext'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false)
//   const { login, error } = useAuth()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const router = useRouter()

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword)
//   }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()
//     const success = await login(email, password)
//     if (success) {
//       router.back() // Вернуться на предыдущую страницу
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center text-[#4CAF50] px-4">
//       <div
//         className="w-full max-w-md mx-auto p-8 rounded-lg shadow-lg bg-[#F0F8F0]"
//         style={{ borderRadius: '20px' }}
//       >
//         <Link
//           href="/"
//           className="flex items-center justify-center mb-8"
//           prefetch={false}
//         >
//           <svg
//             className="h-6 w-6 text-[#4CAF50]"
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
//             <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
//           </svg>
//           <span className="text-[#4CAF50] font-medium ml-2">HomeGardenAI</span>
//         </Link>
//         <div className="text-center mb-8">
//           {/* <h1 className="text-3xl font-bold mt-4">Sign In</h1> */}
//           <h1 className="text-3xl font-bold mt-4">Войти</h1>
//         </div>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setEmail(e.target.value)
//               }
//               className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
//               //   placeholder="Enter your email"
//               placeholder="Введите ваш email"
//               style={{ borderRadius: '10px' }}
//             />
//           </div>
//           <div>
//             {/* <label className="block text-sm font-medium">Password</label> */}
//             <label className="block text-sm font-medium">Пароль</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                   setPassword(e.target.value)
//                 }
//                 className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
//                 // placeholder="Enter your password"
//                 placeholder="Введите пароль"
//                 style={{ borderRadius: '10px' }}
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600"
//               >
//                 {/* {showPassword ? 'Hide' : 'Show'} */}
//                 {showPassword ? 'Скрыть' : 'Показать'}
//               </button>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full p-3 mt-4 bg-[#4CAF50] text-white rounded-lg font-semibold hover:bg-green-700 transition"
//             style={{ borderRadius: '10px' }}
//           >
//             {/* Sign In */}
//             Войти
//           </button>
//         </form>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-400">
//             {/* Don't have an account?{' '} */}
//             Нет аккаунта?{' '}
//             <Link href="/signup" className="text-green-400 hover:underline">
//               {/* Register */}
//               Регистрация
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login
// sign in: 'use client'
'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) {
      router.back() // Вернуться на предыдущую страницу
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-[#4CAF50] px-4">
      <div
        className="w-full max-w-md mx-auto p-8 rounded-lg shadow-lg bg-[#F0F8F0]"
        style={{ borderRadius: '20px' }}
      >
        <Link
          href="/"
          className="flex items-center justify-center mb-8"
          prefetch={false}
        >
          <svg
            className="h-6 w-6 text-[#4CAF50]"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <span className="text-[#4CAF50] font-medium ml-2">HomeGardenAI</span>
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mt-4">Войти</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Введите ваш email"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Пароль</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Введите пароль"
                style={{ borderRadius: '10px' }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600"
              >
                {showPassword ? 'Скрыть' : 'Показать'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-[#4CAF50] text-white rounded-lg font-semibold hover:bg-green-700 transition"
            style={{ borderRadius: '10px' }}
          >
            Войти
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Нет аккаунта?{' '}
            <Link href="/signup" className="text-green-400 hover:underline">
              Регистрация
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
