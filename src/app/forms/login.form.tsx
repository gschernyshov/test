"use client"

import { useState } from "react"
import Link from 'next/link'
import { Button, Input, Checkbox, Form, Alert } from "@heroui/react"
import { signInWithCredentials } from "@/actions/sign-in"
import { Icon } from "@iconify/react"

interface IProps {
  onClose: () => void
  setIsRegistrationOpen: () => void
}

const LoginForm = ({ onClose, setIsRegistrationOpen }: IProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [action, setAction] = useState({
    error: false,
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoadingLogin(true)
    try{
      const result = await signInWithCredentials({...formData})

      if(result.success) {
        setAction({ error: false, message: result.message })
        onClose()
        window.location.reload()
      } else {
        setAction({ error: true, message: result.error })
      }
    } catch (e) {
      setAction({ error: true, message: "При авторизации возникла ошибка" })
    } finally {
      setLoadingLogin(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-full w-full text-black">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <p className="pb-4 text-left text-3xl font-semibold">
          Вход
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={handleSubmit}>
          {action.message && (
            <Alert 
              key={action.message}
              color={action.error ? "danger" : "success"} 
              title={action.message} 
            />
          )}
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Введите Email"
            type="email"
            variant="bordered"
            onChange={handleChange}
            isDisabled={loadingLogin}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Пароль"
            labelPlacement="outside"
            name="password"
            placeholder="Введите пароль"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            onChange={handleChange}
            isDisabled={loadingLogin}
          />
          <div className="flex justify-between items-center w-full y-2 px-1">
            <Checkbox isRequired defaultSelected name="remember" size="sm" isDisabled={loadingLogin}>
              Запомнить меня
            </Checkbox>
            <Link className="text-default-500" href="/registration">
              <span className="text-sm text-gray-500">
                Забыли пароль?
              </span>
            </Link>
          </div>

          <Button
            isLoading={loadingLogin}
            className="w-full" 
            color="primary" 
            type="submit"
            isDisabled={loadingLogin}
          >
            {!loadingLogin ? "Войти" : "Вход..."}
          </Button>
        </Form>
        
        <p className="text-small text-center">
          <span 
            className="text-sm text-gray-500 cursor-pointer"
            onClick={() => {
              onClose()
              setIsRegistrationOpen()
            }}
          >
            Зарегистрироваться
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginForm