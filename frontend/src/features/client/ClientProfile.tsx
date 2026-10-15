import {useState} from 'react';
import {useAuth} from '../../app/auth';
import {ErrorNotice,Loading,PageHeading} from '../../components/ui';
import {useResource} from '../../services/useResource';
import type {Client} from '../../types';
import ProfileForm from '../trainer/ProfileForm';
import Assessments from '../trainer/Assessments';
import Measurements from '../trainer/Measurements';
export default function ClientProfile(){const{user}=useAuth();const{data,loading,error}=useResource<{client:Client}>(`/clients/${user?.clientId}`);const[tab,setTab]=useState('profile');if(loading)return <Loading/>;if(error)return <ErrorNotice message={error}/>;return <><PageHeading eyebrow="MÁS QUE UN REGISTRO" title="Mi punto de partida." description="Tus objetivos, las evaluaciones y el contexto de tu entrenamiento."/><nav className="tabs" aria-label="Secciones de mi perfil">{[['profile','Mi perfil y objetivos'],['assessments','Mis evaluaciones'],['measurements','Mis mediciones']].map(([key,label])=><button className={tab===key?'active':''} aria-current={tab===key?'page':undefined} key={key} onClick={()=>setTab(key)}>{label}</button>)}</nav>{data&&tab==='profile'&&<ProfileForm client={data.client} readOnly/>}{data&&tab==='assessments'&&<Assessments clientId={data.client.id} readOnly/>}{data&&tab==='measurements'&&<Measurements client={data.client} readOnly/>}</>}
