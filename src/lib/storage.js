const KEY='ace-study-react-v1';
const OLD='gcp-ace-study-lab-v1';
const empty={completed:[],attempts:{},history:[],labs:[],cli:[]};
export function loadProgress(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY));
    if(saved) return {...empty,...saved};
    const legacy=JSON.parse(localStorage.getItem(OLD));
    if(legacy) return {...empty,completed:legacy.done||[],attempts:legacy.attempts||{}};
  }catch{} return empty;
}
export function persistProgress(data){try{localStorage.setItem(KEY,JSON.stringify(data));}catch{}}
export const correctCount=(progress)=>Object.values(progress.attempts).filter(x=>x?.correct===true).length;
