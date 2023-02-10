import { createContext, ReactNode, useState } from 'react'
import { api } from '../services/api'

interface UserProps {
    name: string
    avatarUrl: string
}

interface ResponseProps {
    status: number
    accessToken?: string
}

interface AuthProviderProps {
    children: ReactNode
}

export interface AuthContextDataProps {
    user: UserProps
    isUserLoading: boolean
    signIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoading] = useState(false)

    async function signIn(email: string, password: string) {
        try {
            setIsUserLoading(true)

            const sign = await api.post('/users/signin', { 
                email: email.trim().toLowerCase(),
                password: password.trim(),
            })

            if (sign.status === 200 && sign.data?.accessToken) {
                api.defaults.headers.common['Authorization'] = `Bearer ${sign.data.accessToken}`
            }
        }
        catch (err) {
            console.log(err)
            throw err
        }
        finally {
            setIsUserLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}