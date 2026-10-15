import {createContext,useContext,useEffect,useState} from 'react';
import type {ReactNode} from 'react';
import type {Role,User} from '../types';
import {api,post} from '../services/api';
export function roleHome(role:Role){return role==='TRAINER'?'/trainer':'/client'}
export function canAccess(role:Role,required?:Role){return !required||role===required}
const AuthContext=createContext<{user:User|null;loading:boolean;login:(email:string,password:string)=>Promise<User>;logout:()=>Promise<void>}>({user:null,loading:true,login:async()=>{throw Error('Sesión no disponible')},logout:async()=>{}});
export function AuthProvider({children}:{children:ReactNode}){const[user,setUser]=useState<User|null>(null);const[loading,setLoading]=useState(true);
useEffect(()=>{api<{user:User}>('/auth/me').then(r=>setUser(r.user)).catch(()=>setUser(null)).finally(()=>setLoading(false))},[]);
return <AuthContext.Provider value={{user,loading,login:async(email,password)=>{const r=await post<{user:User}>('/auth/login',{email,password});setUser(r.user);return r.user},logout:async()=>{await post('/auth/logout',{});setUser(null)}}}>{children}</AuthContext.Provider>}
export const useAuth=()=>useContext(AuthContext);
