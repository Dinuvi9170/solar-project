import {Button} from "@/components/ui/button"

const Tab =(props)=>{
    return(
        <Button key={props.tab.value} 
            className={`${props.isClickedtab===props.tab.value?"bg-black text-white":"border bg-white border-gray-400 text-gray-700"} cursor-pointer`} 
            onClick={(e)=>props.handleClickTab(props.tab.value)}>
                {props.tab.label}
        </Button>
    )
}
export default Tab;