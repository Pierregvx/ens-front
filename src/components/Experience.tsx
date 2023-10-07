import { useState } from "react";

enum ExperienceType {
    GITHUB,
    GRAPH,
}
interface ExperienceProps{
    type: ExperienceType;
    name: string;
    
}

// 0x801794D9D4F39FeB27572a16B27B308CF4254AFe