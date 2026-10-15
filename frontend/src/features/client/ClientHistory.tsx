import {useAuth} from '../../app/auth';
import {ErrorNotice,Loading,PageHeading} from '../../components/ui';
import {useResource} from '../../services/useResource';
import type {Client} from '../../types';
import Progress from '../trainer/Progress';
export default function ClientHistory(){const{user}=useAuth();const{data,loading,error}=useResource<{client:Client}>(`/clients/${user?.clientId}`);if(loading)return <Loading/>;if(error)return <ErrorNotice message={error}/>;return <><PageHeading eyebrow="MIRAR ATRÁS PARA AVANZAR" title="Mi progreso." description="Lo que has registrado, con fechas, unidades y contexto."/>{data&&<Progress client={data.client} readOnly/>}</>}
