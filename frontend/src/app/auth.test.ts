import {describe,it,expect} from 'vitest';
import {canAccess,roleHome} from './auth';
describe('Control de navegación por rol',()=>{it('mantiene separados los espacios',()=>{expect(canAccess('CLIENT','TRAINER')).toBe(false);expect(canAccess('TRAINER','CLIENT')).toBe(false);expect(canAccess('TRAINER','TRAINER')).toBe(true);expect(canAccess('CLIENT')).toBe(true)});it('devuelve el inicio adecuado',()=>{expect(roleHome('TRAINER')).toBe('/trainer');expect(roleHome('CLIENT')).toBe('/client')})});
