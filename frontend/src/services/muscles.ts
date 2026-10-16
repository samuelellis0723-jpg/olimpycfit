const muscleLabels:Record<string,string>={chest:'Pecho',back:'Espalda',shoulders:'Hombros',biceps:'Bíceps',triceps:'Tríceps',abs:'Abdomen',glutes:'Glúteos',quads:'Cuádriceps',hamstrings:'Isquiotibiales',calves:'Pantorrillas'};
export function muscleNames(ids:string[]){return ids.map(id=>muscleLabels[id]||id).join(', ')}
